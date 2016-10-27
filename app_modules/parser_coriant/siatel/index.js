var posiciones = require("./posiciones");

var patronAlfa = /[a-zA-Z]/;
var pattComma = /,/;

try{
    var pos_MATERIA_PL = posiciones["pos_MATERIA_PL"]; if(pos_MATERIA_PL == undefined) throw "undefined";
    var pos_PED46_LIGA = posiciones["pos_PED46_LIGA"]; if(pos_PED46_LIGA == undefined) throw "undefined";
    var pos_PED45_FT = posiciones["pos_PED45_FT"]; if(pos_PED45_FT == undefined) throw "undefined";
    var pos_DOC50 = posiciones["pos_DOC50"]; if(pos_DOC50 == undefined) throw "undefined";
    var pos_GRAFO_1 = posiciones["pos_GRAFO_1"]; if(pos_GRAFO_1 == undefined) throw "undefined";
} catch(err){
    console.log("Posición No Definida.")
}

var condiciones = function(col, valor){
	if(col == pos_MATERIA_PL || col == pos_PED46_LIGA || col == pos_PED45_FT || col == pos_DOC50 || col == pos_GRAFO_1){
		if(!patronAlfa.test(valor) && !pattComma.test(valor)){
			valor = parseInt(valor);
		}
	}
	return valor;
}

module.exports = {
    condiciones : condiciones
}