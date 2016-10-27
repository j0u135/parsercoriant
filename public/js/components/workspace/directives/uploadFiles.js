angular.module('uploadFilesModule', ['fileServiceModule','workspaceService'])

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                var arr_files = [];
                element.bind('change', function(){
                    angular.forEach(element[0].files, function (item) {
                        arr_files.push(item);
                    });
                    scope.$apply(function(){
                        modelSetter(scope, arr_files);
                    });
                });
        }
    };
}])


.directive('uploadFiles', ['File', 'Workspaces', function(File, Workspaces){
    return{
        scope: {
            files: '=',
            workspace: '=',
        },
        link: function(scope, element, attrs){
            scope.newfiles;
            
            scope.listFiles = function(workspace){
                Workspaces.listFiles(workspace)
                    .then(function(resultado){
                        scope.files = resultado.no_asignados; 
                        scope.asignados = resultado.asignados;
                    });
            }
            
            scope.uploadFiles = function(){
                var i = 0;
                for(i in scope.newfiles){
                    var file = scope.newfiles[i];
                    if(file.name !== undefined){
                        console.log(scope.newfiles[i]);
                        File.uploadFiles(scope.newfiles[i], scope.workspace).then(function(response){
                            scope.listFiles(scope.workspace);
                        });   
                    }
                }
            }
        },
        templateUrl: '/assets/templates/uploadFiles.html'
    }
}]);