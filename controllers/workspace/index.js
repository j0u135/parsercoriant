
module.exports = function(app){
    
    app.get('/', function(request, response) {
       response.render('index'); 
    });
    
    
    app.get('/workspace/:name', function(request, response){
        response.render('workspace', { name : request.params.name});
    });

}