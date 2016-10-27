var posiciones = require("./posiciones.json");

var patronAlfa = /[a-zA-Z]/;

try {
	var pos_Division = posiciones["pos_Division"]; if(pos_Division == undefined) throw "undefined";
	var pos_Doc_Material = posiciones["pos_Doc_Material"]; if(pos_Doc_Material == undefined) throw "undefined";
	var pos_Prov = posiciones["pos_Prov"]; if(pos_Prov == undefined) throw "undefined";
	var pos_Refer = posiciones["pos_Refer"]; if(pos_Refer == undefined) throw "undefined";
	var pos_Pedido = posiciones["pos_Pedido"]; if(pos_Pedido == undefined) throw "undefined";
	var pos_Pos = posiciones["pos_Pos"]; if(pos_Pos == undefined) throw "undefined";
	var pos_Con_mar = posiciones["pos_Con_mar"]; if(pos_Con_mar == undefined) throw "undefined";
	var pos_Imp_md_no_iva = posiciones["pos_Imp_md_no_iva"]; if(pos_Imp_md_no_iva == undefined) throw "undefined";
	var pos_Imp_ml_no_iva = posiciones["pos_Imp_ml_no_iva"]; if(pos_Imp_ml_no_iva == undefined) throw "undefined";
	var pos_Imp_ml_pm_iva = posiciones["pos_Imp_ml_pm_iva"]; if(pos_Imp_ml_pm_iva == undefined) throw "undefined";
	var pos_Imp_md_pm_iva = posiciones["pos_Imp_md_pm_iva"]; if(pos_Imp_md_pm_iva == undefined) throw "undefined";
	var pos_Tlle = posiciones["pos_Tlle"]; if(pos_Tlle == undefined) throw "undefined";
} catch (err){
	console.log("Posición no definida.");
}

var condiciones = function(col, valor){
	if(	col == pos_Division || col == pos_Doc_Material || col == pos_Prov ||
		col == pos_Refer || col == pos_Pedido || col == pos_Pos || col == pos_Con_mar){
		if(!patronAlfa.test(valor) && valor !== ''){
			valor = parseInt(valor);
		}
	}
	if(	col == pos_Imp_md_no_iva || col == pos_Imp_ml_no_iva || col == pos_Imp_ml_pm_iva ||
		col == pos_Imp_md_pm_iva || col == pos_Tlle){
		if(!patronAlfa.test(valor) && valor !== ''){
			valor = parseFloat(valor);
		}
	}
	return valor;
}

module.exports = {
	condiciones: condiciones
}