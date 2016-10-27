var bodyParser = require('body-parser')
var fs = require('fs');
var zlib = require('zlib');
var tar = require('tar-fs')

module.exports = function(app, Workspaces){
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    
    app.get('/api/workspaces', function(request, response){
        var path = Workspaces.path;
        Workspaces.findAll(path, function(list){
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(list));
        });
    });

    
    app.post('/api/workspace', function(request, response){
        Workspaces.exists(request.body.name, function(existe){
            if(existe){
                console.log("Ya existe el Workspace.");
                response.send(JSON.stringify({'error': {
                    'code' : '01',
                    'description' : 'Ya existe el workspace.'
                }}));
            }
            else{
                Workspaces.create(request.body.name, function(){
                    response.send(JSON.stringify({
                        'ok': {
                            'code' : '00',
                            'description' : 'Workspace creado satisfactoriamente.'
                        }
                    }));
                });
            }
        });
    });
    
    
    app.get('/api/workspace/files/:workspace', function(request, response) {
        request.setTimeout(0);
        var workspace = request.params.workspace;
        if(workspace !== undefined && workspace !== ""){
            Workspaces.exists(request.params.workspace, function(existe){
                if(existe){
                    Workspaces.listFilesAll(workspace, function(files){
                        response.send(JSON.stringify(files));
                    })
                }
            });
        }
    });
    
    app.post('/api/workspace/process/bbr/:workspace', function(request, response){
        request.setTimeout(0);
        console.log("* Controller BBR");
        var workspace = request.params.workspace;
        var files = request.body.files;
        Workspaces.exists(workspace, function(existe) {
            if(existe){
                Workspaces.processBBR(files, workspace, function(resultados){
                    console.log("********* Controller BBR Termina ");
                    response.send(JSON.stringify(resultados));
                });
            } else {
                response.send(JSON.stringify('{"error": true, "desc": "No existe"}'));
            }
        });
    });
    
    app.post('/api/workspace/process/siatel/:workspace', function(request, response){
        console.log("* Controller SIATEL");
        var workspace = request.params.workspace;
        var files = request.body.files;
        Workspaces.exists(workspace, function(existe) {
            if(existe){
                Workspaces.processSiatel(files, workspace, function(resultados){
                    console.log("********* Controller SIATEL Termina ");
                    response.send(JSON.stringify(resultados));
                    //response.send(JSON.stringify('OK:OK'));
                });
            } else {
                response.send(JSON.stringify('{"error": true, "desc": "No existe"}'));
            }
        });
    });
    
    app.post('/api/workspace/process/eficentrum/:workspace', function(request, response){
        request.setTimeout(0);
        console.log("* Controller EFICENTRUM");
        var workspace = request.params.workspace;
        var files = request.body.files;
        Workspaces.exists(workspace, function(existe) {
            if(existe){
                Workspaces.processEntradas50(files, workspace, function(resultados){
                    console.log("********* Controller EFICENTRUM Termina ");
                    response.send(JSON.stringify(resultados));
                });
            } else {
                response.send(JSON.stringify('{"error": true, "desc": "No existe"}'));
            }
        });
    });
    
    app.post('/api/workspace/process/resutados/:workspace', function(request, response){
        console.log("* Controller Resultados");
        var workspace = request.params.workspace;
        Workspaces.exists(workspace, function(existe) {
            if(existe){
                Workspaces.calculaResultados(workspace, function(resultados){
                    console.log("********* Controller Resultados Termina ");
                    response.send(JSON.stringify("OK"));
                });
            } else {
                response.send(JSON.stringify('{"error": true, "desc": "No existe"}'));
            }
        });
    });
    
    app.get('/api/workspace/processed/:workspace', function(request, response) {
        var workspace = request.params.workspace;
        Workspaces.listProcessedFiles(workspace, function(files){
            response.send(JSON.stringify(files));
        });
    });
    
    app.get('/api/workspace/calculos/:workspace', function(request, response) {
        var workspace = request.params.workspace;
        Workspaces.listCalculos(workspace, function(files){
            response.send(JSON.stringify(files));
        });
    });
    
    app.get('/api/workspace/resultados/:workspace', function(request, response) {
        var workspace = request.params.workspace;
        Workspaces.listResultados(workspace, function(files){
            response.send(JSON.stringify(files));
        });
    });
    
    app.get('/api/workspace/download/:workspace/procesados/', function(request, response) {
        var workspace = request.params.workspace;
        var path_dir = './base/' + workspace + '/procesados/';
        var gzip = zlib.createGzip();
        
        tar.pack(path_dir).pipe(gzip).pipe(response);
    });
}