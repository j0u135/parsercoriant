var posiciones = require("./posiciones.json");

var patternNumeral = /#/;

try{
    var pos_POnumber = posiciones["pos_POnumber"];
    if(pos_POnumber == undefined) throw "undefined";
        
    var pos_Calendarday = posiciones["pos_Calendarday"];
    if(pos_Calendarday == undefined) throw "undefined";
        
    var pos_Salesdoc = posiciones["pos_Salesdoc"];
    if(pos_Salesdoc == undefined) throw "undefined";
    
    var pos_Year = posiciones["pos_Year"];
    if(pos_Year == undefined) throw "undefined";
    
} catch (err){
    console.log("Posición no definida.");
}


var condiciones = function(col, valor){
	if(col == pos_POnumber){
		valor = valor.replace(/[^a-zA-Z0-9#]/g, "");
		if(!patternNumeral.test(valor)){
			valor = parseInt(valor);
		}
	} else if (col == pos_Calendarday){
		var arr_calendar = valor.split("/");
		valor = arr_calendar[1] + "/" + arr_calendar[0] + "/" + arr_calendar[2];
	} else if(col == pos_Salesdoc || col == pos_Year){
		valor = parseInt(valor);
	}
	return valor;
}

module.exports = {
    condiciones: condiciones	
}