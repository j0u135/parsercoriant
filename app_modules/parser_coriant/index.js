var fs = require('fs');
var json2xls = require('json2xls');
var XLSX = require('xlsx');

var bbr = require("./bbr");
var eficentrum = require("./eficentrum");
var siatel = require("./siatel");

var constructor_bbr = require("./bbr/constructor");
var constructor_siatel = require("./siatel/constructor");
var constructor_eficentrum = require("./eficentrum/constructor");
var calculos = require("./calculos");

var parse = function(path, condiciones, constructor){
    var workbook = XLSX.readFile(path);

	var first_sheet_name = workbook.SheetNames[0];
	var sheet = workbook.Sheets[first_sheet_name];
		
	var range = XLSX.utils.decode_range(sheet['!ref']);
	var MAXLEN = range.e.r;
	var MAXCOL = range.e.c;

	var data = [];

	var fila = new constructor();
	for(var row = 1; row <=MAXLEN; ++row){
		var col = -1;
		for(atributo in fila){
			fila[atributo] = "";
			++col;
			var cell_address = XLSX.utils.encode_cell({c: col,r:row});
			var cell = sheet[cell_address];
			var valor = null;
			if(cell != undefined){
				valor = cell.v;
				try{
					valor = condiciones(col, valor);	
				}
				catch(err){
					console.log(row);
					console.log(fila);
				}
			}
			fila[atributo] = valor;
		}
		data.push(fila);
	}
	workbook = null;
	sheet = null;
	return data;
}

var parseAll = function(rutas){
	verificarRuta(rutas.salida, function(){
		var pathBBR = rutas.bbr === undefined? null : rutas.bbr;
		var pathSiatel = rutas.siatel === undefined? null : rutas.siatel;
		var pathEficentrum = rutas.eficentrum === undefined? null : rutas.eficentrum;
		var salida = rutas.salida;
		if(pathBBR !== null && pathBBR !== ""){
			parseBBR(pathBBR, salida);
		}
		if(pathSiatel !== null && pathSiatel !== ""){
			parseSiatel(pathSiatel, salida);
		}
		if(pathEficentrum !== null && pathEficentrum !== ""){
			parseEntradas50(pathEficentrum, salida);
		}	
	});
}

var parseBBR = function(path, salida, callback){
	console.log("***** PARSE BBR");
	console.log("---------------------------------------------------------------------");
	verificarRuta(path, function(path){
		console.log("	Comienza parse de BBR .....");
		var data_bbr = parse(path, bbr.condiciones, constructor_bbr);
		console.log("	Termina parse de BBR .....");
		console.log("	Comienza data_siatel: " + data_bbr.length);
		
		callback(data_bbr);
		data_bbr = null;
	});
}


var parseSiatel = function(path, salida, callback){
	console.log("***** PARSE SIATEL");
	console.log("---------------------------------------------------------------------");
	verificarRuta(path, function(path){
	   	console.log("	Comienza parse de SIATEL .....");
		var data_siatel = parse(path, siatel.condiciones, constructor_siatel);
		console.log("	Termina parse de SIATEL .....");
		console.log("	Comienza data_siatel: " + data_siatel.length);
		
		callback(data_siatel);
		data_siatel = null;
	});
}

var parseEntradas50 = function(path, salida, callback){
	console.log("***** PARSE EFICENTRUM");
	console.log("---------------------------------------------------------------------");
	verificarRuta(path, function(path){
		console.log("	Comienza parse de EFICENTRUM .....");
		var data_eficentrum = parse(path, eficentrum.condiciones, constructor_eficentrum);
		console.log("	Termina parse de EFICENTRUM .....");
		console.log("	Comienza data_eficentrum: " + data_eficentrum.length);
		
		callback(data_eficentrum);
		data_eficentrum = null;
	});
}

var escribirArchivo = function(data, nombre, callback){
	console.log("		Escribiendo ........ " + nombre + "-" + data.length)
	var xls = json2xls(data);
	fs.writeFile(nombre, xls, 'binary', function(err){
		console.log(err);	
		xls = null;
		callback();
	});
}

var verificarRuta = function(path, callback){
	fs.exists(path, function(exists){
		if(exists){
			callback(path);
		} else {
			console.log("No se encontró el archivo: " + path);
		}
	});
}

var calculaResultados = function(path, workspace, callback){
	calculos.calcularAll(path, workspace, function(){
		callback();
	});
}

module.exports = {
	parseAll : parseAll,
	parseBBR : parseBBR,
	parseEntradas50 : parseEntradas50,
	parseSiatel : parseSiatel,
	escribirArchivo: escribirArchivo,
	calculaResultados: calculaResultados
}