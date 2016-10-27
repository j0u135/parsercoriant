angular.module('processFilesModule', ['workspaceService', 'fileServiceModule'])


.directive('processFiles', ['Workspaces', 'File', function(Workspaces, File){
    
    return {
        scope:{
            filesasignados: '=',
            completos: '=',
            workspace: '='
        },
        link: function(scope, element, attrs){
            
            scope.processFiles = function(){
                var files = scope.filesasignados;
                var workspace = scope.workspace;
                console.log(scope.filesasignados);
                //Workspaces.processFiles(files, workspace).then(function(){
                //    scope.listProcessedFiles(workspace);
                //});
                
                Workspaces.processSiatel(files, workspace).then(function(){
                    scope.listProcessedFiles(workspace);
                    Workspaces.processEntradas50(files, workspace).then(function(){
                        scope.listProcessedFiles(workspace);
                        Workspaces.processBBR(files, workspace).then(function(){
                            scope.listProcessedFiles(workspace);
                        });
                    });
                });
            };
            
            scope.listProcessedFiles = function(workspace){
                Workspaces.listProcessedFiles(workspace).then(function(files){
                    scope.processedFiles = files;
                });
            };
            
            scope.descargarArchivoProcesado = function(file){
                var workspace = scope.workspace;
                File.descargarArchivoProcesado(workspace, file);
            };
            
            scope.descargarTodosProcesados = function(){
                var workspace = scope.workspace;
                console.log("ENTRE.... 1");
                Workspaces.descargarTodosProcesados(workspace);
            }
            
            scope.listProcessedFiles(scope.workspace);
        },
        templateUrl: '/assets/templates/processFiles.html'
    }
    
}]);