if(typeof require !== 'undefined') XLSX = require('xlsx');
if(typeof require !== 'undefined') fs = require('fs');

var json2xls = require('json2xls');

var Calculos = function(){
    
    this.calcularAll = function(path, workspace, callback){
        console.log("Parse Archivo para Cálculos.");
    	try{
    		var workbook = XLSX.readFile(path + '/' + workspace + '/calculos/CALC.xlsx', {cellNF: false, cellFormula: false});	
    	} catch (e){
    		console.log("Formato incorrecto");
    	}
    	
    	var first_sheet_name = workbook.SheetNames[0];
    	var firstSheet = workbook.Sheets[first_sheet_name];
    	
    	var second_sheet_name = workbook.SheetNames[1];
    	var secondSheet = workbook.Sheets[second_sheet_name];
    	
    		var third_sheet_name = workbook.SheetNames[2];
    	var thirdSheet = workbook.Sheets[third_sheet_name];
    	
    	var arrAgregar = [];
    	var arrEliminar = [];
    	
    	calcEliminadosAgregados(firstSheet, arrEliminar, arrAgregar);
    	calcLineasCanceladas(secondSheet, arrEliminar);
    	calcTopologias(thirdSheet);
        
    }
}

module.exports = Calculos


var calcTopologias = function(thirdSheet){
	console.log("TOPOLOGIAS");
	var arrAgregar = [];
	var arrEliminar = [];
	
	var range = XLSX.utils.decode_range(thirdSheet['!ref']);
	
	var MAXLEN = range.e.r;
	var MAXCOL = range.e.c;
	
	console.log(MAXCOL);
	console.log(MAXLEN);
	
	var dataMC = [];
	var dataSIATEL = [];
	
	var json = [];
	var patternAlfa = /[a-zA-Z,]/;
	
	for(var dd = 1; dd <=MAXLEN; ++dd){
		var cell_address = XLSX.utils.encode_cell({c: 0,r:dd});
		var cell = thirdSheet[cell_address];
		if(cell == undefined) continue;
		var valor = cell.v;
		
		if(!patternAlfa.test(valor)){
			valor = parseInt(valor);
		}
		dataMC.push(valor);
	}
	
	for(var dd = 1; dd <=MAXLEN; ++dd){
		var cell_address = XLSX.utils.encode_cell({c: 1,r:dd});
		var cell = thirdSheet[cell_address];
		if(cell == undefined) continue;
		var valor = cell.v;
		if(!patternAlfa.test(valor)){
			valor = parseInt(valor);
		} else {
			valor = valor.toString();
		}
		dataSIATEL.push(valor);
	}

	dataMC.sort(function(a, b){
		if(typeof a === typeof b){
			if(typeof a === 'number'){
				return a - b;
			} else {
				return (a < b) ? -1 : (a > b) ? 1 : 0;
			}
		} else {
			if(typeof a === 'number'){
				return 1;
			}
			else{
				return -1
			}
		}
	});
	dataSIATEL.sort(function(a, b){
		if(typeof a === typeof b){
			if(typeof a === 'number'){
				return a - b;
			} else {
				return (a < b) ? -1 : (a > b) ? 1 : 0;
			}
		} else {
			if(typeof a === 'number'){
				return 1;
			}
			else{
				return -1
			}
		}
	});

	var valorI = "";
	var valorJ = "";
	
	for(var i = 0; i < dataSIATEL.length ; ++i){
		console.log("dfsdfsd - " + i);
		if(dataMC.indexOf(dataSIATEL[i]) < 0){
			arrAgregar.push(dataSIATEL[i])
		}
	}
	
	
	
	json.push({titulo:"AGREGAR"});
	arrAgregar.forEach(function(v) { json.push({titulo:v}) });
	json.push({titulo: null});
	
	var xls = json2xls(json);
	console.log("----" + new Date());
	fs.writeFileSync('ResultadosTopologia.xlsx', xls, 'binary');	
}

var calcEliminadosAgregados = function(firstSheet, arrEliminar, arrAgregar){
	console.log("ELIMINADOS");
	var range = XLSX.utils.decode_range(firstSheet['!ref']);
	
	var MAXLEN = range.e.r;
	var MAXCOL = range.e.c;
	
	console.log(MAXCOL);
	console.log(MAXLEN);
	
	var dataMC = [];
	var dataSIATEL = [];
	
	var json = [];
	var patternAlfa = /[a-zA-Z,]/;
	
	for(var dd = 1; dd <=MAXLEN; ++dd){
		var cell_address = XLSX.utils.encode_cell({c: 0,r:dd});
		var cell = firstSheet[cell_address];
		if(cell == undefined) continue;
		var valor = cell.v;
		
		if(!patternAlfa.test(valor)){
			valor = parseInt(valor);
		}
		dataMC.push(valor);
	}
	console.log(1);
	for(var dd = 1; dd <=MAXLEN; ++dd){
		var cell_address = XLSX.utils.encode_cell({c: 1,r:dd});
		var cell = firstSheet[cell_address];
		if(cell == undefined) continue;
		var valor = cell.v;
		if(!patternAlfa.test(valor)){
			valor = parseInt(valor);
		} else {
			valor = valor.toString();
		}
		dataSIATEL.push(valor);
	}
	console.log(2);
	dataMC.sort(function(a, b){
		if(typeof a === typeof b){
			if(typeof a === 'number'){
				return a - b;
			} else {
				return (a < b) ? -1 : (a > b) ? 1 : 0;
			}
		} else {
			if(typeof a === 'number'){
				return 1;
			}
			else{
				return -1
			}
		}
	});
	console.log(3);
	dataSIATEL.sort(function(a, b){
		if(typeof a === typeof b){
			if(typeof a === 'number'){
				return a - b;
			} else {
				return (a < b) ? -1 : (a > b) ? 1 : 0;
			}
		} else {
			if(typeof a === 'number'){
				return 1;
			}
			else{
				return -1
			}
		}
	});
	console.log(4);
	var j = 0;
	
	console.log(5);
	for(var i = 0; i <= dataMC.length; ++i){
		var valorI = dataMC[i];
		var valorJ = dataSIATEL[j];
	    if(valorI == undefined) continue;
	    //if(!patternAlfa.test(valorI)){
		//	valor = parseInt(valor);
		//}
	    if(valorI == valorJ){
			++j;
	    } else {
	    	//console.log(j + "-----------------" + i);
	    	if(compareTextNum(valorI,  valorJ) > 0){
	    		while(compareTextNum(valorI,  valorJ) > 0 && valorJ != undefined){
	    			arrAgregar.push(valorJ);
	    			++j;
	    			valorJ = dataSIATEL[j];
	    		}
	    		if(compareTextNum(valorI,  valorJ) <= 0){
	    			--i;
	    		}
	    		if(valorJ == undefined){
	    			arrEliminar.push(valorI);
	    		}
	    	} else{
	    		arrEliminar.push(valorI);
	    	}
	    }
	}
	if(j < dataSIATEL.length){
		for (j; j < dataSIATEL.length; j++) {
			var valorJ = dataSIATEL[j];
			arrAgregar.push(valorJ);
		}
	} else if(i < dataMC.length){
		var valorI = dataMC[i];
		for (i ; i < dataMC.length; i++) {
			arrEliminar.push()
		}
	}
	console.log(6);
	json.push({titulo:"ELIMINAR"});
	if(arrEliminar.length > 0) arrEliminar.forEach(function(v) { json.push({titulo:v}) });
	json.push({titulo: null});
	
	json.push({titulo:"AGREGAR"});
	if(arrAgregar.length > 0) arrAgregar.forEach(function(v) { json.push({titulo:v}) });
	json.push({titulo: null});
	
	var xls = json2xls(json);
	console.log("----" + new Date());
	fs.writeFileSync('ResultadosAgrElim.xlsx', xls, 'binary');
	
	//console.log(arrEliminar);
}



var calcLineasCanceladas = function(secondSheet, arrEliminar){
	console.log("CANCELADAS ---- " + arrEliminar.length);
	var range = XLSX.utils.decode_range(secondSheet['!ref']);
	if(arrEliminar.length <= 0) return 0;
	
	var MAXLEN = range.e.r;
	var MAXCOL = range.e.c;
	
	console.log(MAXCOL);
	console.log(MAXLEN);
	
	var dataMC = [];
	var json = [];
	
	var patternAlfa = /[a-zA-Z,]/;
	
	for(var dd = 1; dd <=MAXLEN; ++dd){
		var cell_address = XLSX.utils.encode_cell({c: 1,r:dd});
		var cell = secondSheet[cell_address];
		if(cell == undefined) continue;
			var valor = cell.v;
		//if(!patternAlfa.test(valor)){
		//	valor = parseInt(valor);
		//}
		dataMC.push(valor);
	}
	
	
	for(var i = 0; i < arrEliminar.length; ++i){
		var index = dataMC.indexOf(arrEliminar[i])
		if(index >= 0){
			var fila = new Fila();
			var col = 0;
			for(atributo in fila){
				++col;
				var cell_address = XLSX.utils.encode_cell({c: col,r:(index+1)});
				var cell = secondSheet[cell_address];
				var valor = null;
				if(cell != undefined){
					valor = cell.v;
				}
				fila[atributo] = valor;
			}
			json.push(fila);
		}
	}
	console.log(json.length);
	var xls = json2xls(json);
	console.log("----" + new Date());
	fs.writeFileSync('ResultadosCanceladas.xlsx', xls, 'binary');
}

var compareTextNum = function(a, b){
	if(typeof a === typeof b){
		if(typeof a === 'number'){
			return a - b;
		} else {
			return (a < b) ? -1 : (a > b) ? 1 : 0;
		}
	} else {
		if(typeof a === 'number'){
			return 1;
		}
		else{
			return -1
		}
	}
}


var Fila = function(){
	this.GRAFO_1_F = '';
	this.TOPOLOGIA_F = '';
	this.EMPRESA = '';
	this.NOMPROY_PL = '';
	this.PEP_PL = '';
	this.AREA_SIATEL = '';
	this.CENTRAL_ = '';
	this.REGION = '';
	this.AREA_CORIANT = '';
	this.PM = '';
	this.EQ_USD = '';
	this.PAQ_USD = '';
	this.PZA_USD = '';
	this.HW_USD = '';
	this.SRV_USD = '';
	this.PO_HW = '';
	this.PO_SRV = '';
	this.PO_HW_DATE = '';
	this.PO_SRV_DATE = '';
	this.E50_HW = '';
	this.E50_SRV = '';
	this.FACT_HW_USD = '';
	this.FACT_SRV_USD = '';
	this.MES_PO = '';
	this.E_50_HW_DATE = '';
	this.E50_SRV_DATE = '';
	this.E50_HW = '';
	this.E50_SRV = '';
	this.E50_HW_USD = '';
	this.E50_SRV_USD = '';
	this.E50_TOT_USD = '';
	this.MES_E50 = '';
	this.hw_sales_doc = '';
	this.srv_sales_doc = '';
	this.tellabs_6300 = '';
	this.tellabs_7300 = '';
	this.tellabs_7100 = '';
	this.tellabs_8100 = '';
	this.tellabs_8600 = '';
	this.TOTAL_HW = '';
	this.misc_services = '';
	this.services = '';
	this.TOTAL_HW_MISC_SRV = '';
	this.Revenue = '';
	this.Backlog = '';
	this.SNYB = '';
	this.REV_BACK_SNYB = '';
	this.hw_rev_date = '';
	this.srv_rev_date = '';
	this.CMP = '';
	this.MES_REV = '';
	this.estatus_proy = '';
	this.pendency = '';
	this.owner = '';
	this.pendency_owner = '';
	this.estatus_global = '';
	this.action_plan = '';
	this.forecast = '';
	this.forecast_risk_upside = '';
	this.comments = '';
}