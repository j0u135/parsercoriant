var fs = require("fs");
var parser_coriant = require("../parser_coriant");

var Workspace = function(path){
    this.path = path;
    
    this.exists = function(name, callback){
        fs.stat(path + '/' + name, function(err, stats){
            var existe;
            if(err){
                existe = false;
            } else {
                existe = true;
            }
            callback(existe);
        })
    };
    
    this.findAll = function(path, callback){
        fs.readdir(path, function(err, list){
            if(err) throw err;
            callback(list);
        });
    };
    
    this.create = function(name, callback){
        var newWorkspace = path + '/' + name
        fs.mkdir(newWorkspace, 0777, function(){
            fs.mkdir(newWorkspace + '/BBR', 0777, function(){
                fs.mkdir(newWorkspace + '/SIATEL', 0777, function(){
                    fs.mkdir(newWorkspace + '/EFICENTRUM', 0777, function(){
                        fs.mkdir(newWorkspace + '/procesados', 0777, function(){
                            fs.mkdir(newWorkspace + '/calculos', 0777, function(){
                                fs.mkdir(newWorkspace + '/resultados', 0777, function(){
                                    callback();
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    
    this.listFilesAll = function(workspace, callback){
        listFiles(path, workspace, function(files){
            listFilesAsignados(path, workspace, function(files_asignados){
                var resultado = {
                    'no_asignados' : files,
                    'asignados' : files_asignados
                }
                callback(resultado);
            });
        });
    };
    
    this.processFiles = function(files, workspace, callback){
        var rutas = {
            bbr: '',
            siatel: '',
            eficentrum: ''
        };
                
        var i;
        for(i in files){
            if(files[i].catalogacion === 'BBR'){
                rutas.bbr = './base/' + workspace + '/BBR/' + files[i].nombre;
            }
            if(files[i].catalogacion === 'EFICENTRUM'){
                rutas.eficentrum = './base/' + workspace + '/EFICENTRUM/' + files[i].nombre;
            }
            if(files[i].catalogacion === 'SIATEL'){
                rutas.siatel = './base/' + workspace + '/SIATEL/' + files[i].nombre;
            }
        }
        rutas.salida = './base/' + workspace + '/procesados/';
        var resultados = parser_coriant.parseAll(rutas);
        callback(resultados);
    };
    
    this.processBBR = function(files, workspace, callback){
        console.log("*** Workspace BBR");
        var rutas = {
            bbr: '',
            siatel: '',
            eficentrum: ''
        };
        var i;
        for(i in files){
            if(files[i].catalogacion === 'BBR'){
                rutas.bbr = './base/' + workspace + '/BBR/' + files[i].nombre;
            }
        }
        rutas.salida = './base/' + workspace + '/procesados/';
        var resultados = parser_coriant.parseBBR(rutas.bbr, rutas.salida, function(data){
            parser_coriant.escribirArchivo(data, rutas.salida + "BBR.xlsx", function(){
                callback();  
            })
        });
    };
    
    this.processSiatel = function(files, workspace, callback){
        console.log("*** Workspace SIATEL");
        var rutas = {
            bbr: '',
            siatel: '',
            eficentrum: ''
        };
        var i;
        for(i in files){
            if(files[i].catalogacion === 'SIATEL'){
                rutas.siatel = './base/' + workspace + '/SIATEL/' + files[i].nombre;
            }
        }
        rutas.salida = './base/' + workspace + '/procesados/';

        var resultados = parser_coriant.parseSiatel(rutas.siatel, rutas.salida, function(data){
            parser_coriant.escribirArchivo(data, rutas.salida + "SIATEL.xlsx", function(){
                callback();  
            });
        });
    };
    
    this.processEntradas50 = function(files, workspace, callback){
        console.log("*** Workspace EFICENTRUM");
        var rutas = {
            bbr: '',
            siatel: '',
            eficentrum: ''
        };
        var i;
        for(i in files){
            if(files[i].catalogacion === 'EFICENTRUM'){
                rutas.eficentrum = './base/' + workspace + '/EFICENTRUM/' + files[i].nombre;
            }
        }
        rutas.salida = './base/' + workspace + '/procesados/';
        var resultados = parser_coriant.parseEntradas50(rutas.eficentrum, rutas.salida, function(data){
            parser_coriant.escribirArchivo(data, rutas.salida + "EFICENTRUM.xlsx", function(){
                callback(); 
            });
        });
    };
    
    
    this.calculaResultados = function(workspace, callback){
        parser_coriant.calculaResultados(path, workspace, function(){
            callback();
        })
    }
    
    
    this.listProcessedFiles = function(workspace, callback){
        var target = path + '/' + workspace + '/procesados/';
        listFilesPorTipo(target, 'xlsx', function(files){
            callback(files);
        });
    }
    
    this.listCalculos = function(workspace, callback){
        var target = path + '/' + workspace + '/calculos/';
        listarFiles(target, function(files){
            callback(files);
        });
    }
    
    this.listResultados = function(workspace, callback){
        var target = path + '/' + workspace + '/resultados/';
        listarFiles(target, function(files){
            callback(files);
        });
    }
    
    return this;
};

module.exports = Workspace;


var listFilesPorTipo = function(path, tipo, callback){
    listarFiles(path, function(files){
        callback(filtrarPorTipo(files, tipo));
    });
}

var listarFiles = function(path, callback){
    fs.readdir(path, function(err, files){
        if(err) throw "Error al leer el drectorio."
        callback(files);
    });
}

var filtrarPorTipo = function(files, tipo){
    var files_filtrados = [];
    var i;
    for(i in files){
        if(files[i].toLowerCase().includes(tipo)){
            files_filtrados.push(files[i]);
        }
    }
    return files_filtrados;
}

var listFiles = function(path, workspace, callback){
    var target = path + '/' + workspace;
    listFilesPorTipo(target, 'xlsx', function(files){
        callback(files);
    });
}
    
var listFilesAsignados = function(path, workspace, callback){
    var raiz = path + '/' + workspace + '/';
    var path_bbr = raiz + 'BBR';
    var path_eficentrum = raiz + 'EFICENTRUM';
    var path_siatel = raiz + 'SIATEL';
    
    var files_asignados = [];
    
    var tipo = 'xlsx';
    listFilesPorTipo(path_bbr, tipo, function(files_bbr){
        if(files_bbr.length > 0){
            files_asignados.push({'nombre': files_bbr[0], 'catalogacion': 'BBR'});
        }
        listFilesPorTipo(path_eficentrum, tipo, function(files_eficentrum){
            if(files_eficentrum.length > 0){
                files_asignados.push({'nombre': files_eficentrum[0], 'catalogacion': 'EFICENTRUM'});
            }
            listFilesPorTipo(path_siatel, tipo, function(files_siatel){
                if(files_siatel.length > 0){
                    files_asignados.push({'nombre': files_siatel[0], 'catalogacion': 'SIATEL'});
                }
                callback(files_asignados);
            });
        });
    });
}