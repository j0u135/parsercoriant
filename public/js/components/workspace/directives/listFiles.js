angular.module('listFilesModule', ['workspaceService', 'fileServiceModule'])

.directive('listFiles', ['Workspaces', 'File', function(Workspaces, File){
    return {
        scope: {
            workspace: '=',
            files: '=',
            filesasignados: '=',
            completos: '='
        },
        link: function(scope, element, attrs){
            scope.files = [];
            scope.filesasignados = [];
            
            var validarAsignados = function(files){
                var i = 0;
                if(files.length == 3){
                    return true;
                }
                return false;
            }
            
            scope.listFiles = function(workspace){
                Workspaces.listFiles(workspace)
                    .then(function(resultado){
                        scope.files = resultado.no_asignados; 
                        scope.filesasignados = resultado.asignados;
                        scope.completos = validarAsignados(scope.filesasignados);
                        console.log(scope.filesasignados);
                    });
            }
            
            scope.getTipo = function(file){
                if(file.toLowerCase().includes("bbr")){
                    return "BBR";    
                } else if(file.toLowerCase().includes("siatel")){
                    return "SIATEL";    
                } else if(file.toLowerCase().includes("eficentrum") || file.toLowerCase().includes("entradas")){
                    return "EFICENTRUM";    
                }
                return "";
            }
            
            scope.asignarFile = function(file, tipo){
                File.asignarFile(scope.workspace, file, tipo)
                .then(function(response){
                    scope.listFiles(scope.workspace);
                });
            }
            
            scope.listFiles(scope.workspace);

        },
        templateUrl: '/assets/templates/listFiles.html'
    }
}]);