var multer = require('multer');
var fs = require('fs');
var zlib = require('zlib');


var storage = multer.diskStorage({
    destination: function (request, file, callback){
        callback(null, './uploads');
    },
    filename: function (request, file, callback){
        callback(null, file.originalname);
    }
});


var upload = multer({ storage : storage }).array('file',3);

module.exports = function(app, Files){

    app.post('/api/files/upload', function(request, response){
        upload(request, response, function(err) {
            if(err){
                return response.send(JSON.stringify({'error': 'Upload Falló.'}));
            }
            console.log(request.headers);
            var files = request.files;
            var workspace = request.body.workspace;
            Files.colocarFiles(files, workspace, function(){
                response.send(JSON.stringify({'ok': 'Upload Ok.'}));
            });
        });
    });
    
    app.post('/api/calculos/upload', function(request, response){
        upload(request, response, function(err) {
            if(err){
                return response.send(JSON.stringify({'error': 'Upload Falló.'}));
            }
            console.log(request.headers);
            var files = request.files;
            var workspace = request.body.workspace;
            Files.colocarCalculos(files, workspace, function(){
                response.send(JSON.stringify({'ok': 'Upload Ok.'}));
            });
        });
    });
    
    app.post('/api/files/asignar', function(request, response){
        var workspace = request.body.workspace;
        var file = request.body.file;
        var tipo = request.body.tipo;
        
        console.log(workspace + "-" + file + "-" + tipo);

        Files.asignarFile(workspace, file, tipo, function(resultado){
            if(resultado){
                response.send(JSON.stringify({'ok': 'Catalogado exitosamente.'}));
            }
        });
    });
    
    app.get('/api/files/download/:workspace/procesados/:file', function(request, response) {
        var gzip = zlib.createGzip();
        var workspace = request.params.workspace;
        var file = request.params.file;
        try {
            var inp = fs.createReadStream('./base/' + workspace + '/procesados/' + file);    
            inp.pipe(gzip).pipe(response);
        } catch(err){
            console.log(err);
        }
    });
}
