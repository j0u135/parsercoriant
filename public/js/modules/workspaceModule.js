angular.module('workspaceModule', [ 'listFilesModule', 
                                    'uploadFilesModule', 
                                    'angular-loading-bar', 
                                    'processFilesModule', 
                                    'uploadCalculosModule',
                                    'ProcessResultadosModule'])

.controller('workspaceController', ['$scope', function($scope){
    $scope.workspace;
    $scope.files;
    $scope.filesasignados;
    $scope.completos;

}]);