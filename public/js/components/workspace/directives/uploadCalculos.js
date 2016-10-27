angular.module('uploadCalculosModule', ['fileServiceModule', 'workspaceService'])

.directive('uploadCalculos', ['Workspaces', 'File', function(Workspaces, File){
   return{
        scope: {
            workspace: '=',
        },
        link: function(scope, element, attrs){
            scope.calculosFile;
            
            scope.listCalculos = function(){
                Workspaces.listCalculos(scope.workspace)
                    .then(function(resultado){
                        scope.listaFilesCalculo = resultado;
                    });
            }
            
            scope.listResultados = function(){
                Workspaces.listResultados(scope.workspace)
                    .then(function(resultado){
                        console.log(resultado);
                    });
            }
            
            scope.uploadFiles = function(){
                var i = 0;
                for(i in scope.calculosFile){
                    var file = scope.calculosFile[i];
                    if(file.name !== undefined){
                        console.log(scope.calculosFile[i]);
                        File.uploadCalculos(scope.calculosFile[i], scope.workspace).then(function(response){
                            scope.listCalculos(scope.workspace);
                        });   
                    }
                }
            }
            
            scope.listCalculos(scope.workspace);
        
        },
        templateUrl: '/assets/templates/uploadCalculos.html'
   }
}])