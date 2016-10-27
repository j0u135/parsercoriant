var fs = require("fs");
var AdmZip = require('adm-zip');


var catalogarFile = function(tipo){
    if(tipo.toLowerCase().includes("bbr")){
        return "BBR";
    }
    if(tipo.toLowerCase().includes("entradas") || tipo.toLowerCase().includes("eficentrum")){
        return "EFICENTRUM";
    }
    if(tipo.toLowerCase().includes("siatel")){
        return "SIATEL";
    }
    return "";
}


var Files = function(base){
    
    this.asignarFile = function(workspace, file, tipo, callback){
        fs.stat(base + '/' + workspace + '/' + file, function(err, stats){
            if(err) throw "No existe el archivo.";
            
            var catalogacion = catalogarFile(tipo, file);
            
            var oldPath = base + '/' + workspace + '/' + file;
            var newPath = base + '/' + workspace + '/' + catalogacion + "/" + file;
            fs.rename(oldPath, newPath, function(){
                callback(true);
            });    
        });
    };
    
    this.desasignarFile = function(workspace, file, tipo, callback){
        fs.stat(base + '/' + workspace + '/' + tipo + '/' + file, function(err, stats){
            if(err) throw "No existe el archivo.";
            
            var oldPath = base + '/' + workspace + '/' + tipo + "/" + file;
            var newPath = base + '/' + workspace + '/' + file;
            fs.rename(oldPath, newPath, function(){
                callback(true);
            });    
        });
    };
    
    this.eliminarFile = function(workspace, file){
        
    };
    
    this.colocarFiles = function(files, workspace, callback){
        var oldPath = './uploads/' + files[0].originalname;
        var newPath = './base/' + workspace + '/' + files[0].originalname;
        fs.rename(oldPath, newPath, function(){
            callback();
        });
    };
    
    this.colocarCalculos = function(files, workspace, callback){
        var oldPath = './uploads/' + files[0].originalname;
        var newPath = './base/' + workspace + '/calculos/' + files[0].originalname;
        fs.rename(oldPath, newPath, function(){
            callback();
        });
    }
    
    return this;   
}

module.exports = Files;