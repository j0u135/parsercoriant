var fs = require('fs');
var workspace = require('../app_modules/workspaces');
var files = require('../app_modules/files');

function checkDirectory(path, callback){
    fs.stat(path, function(err, stats){
        var respuesta = false;
        if(err){
            respuesta = false;
        } else {
            if(stats.isDirectory()){
                respuesta = true;
            } else {
                respuesta = false;
            }
        }
        callback(stats);
    });
}


function createFolder(path, callback){
    fs.mkdir(path, 0777, function(err){
        if(err){
            throw err;
        } else {
            callback(true);    
        }
    });
}

var setupBase = function (path, callback){
    checkDirectory(path, function(respuesta){
       if(respuesta){
           var Workspaces = workspace(path);
           var Files = files(path);
           callback(Workspaces, Files);
       } else {
           createFolder(path, function(respuestaCreacion){
               if(respuestaCreacion){
                   var Workspaces = workspace(path);
                   var Files = files(path);
                   callback(Workspaces, Files);
               } else {
                   throw "No se pudo crear la base.";
               }
           });
       }
    });
}

module.exports = setupBase;