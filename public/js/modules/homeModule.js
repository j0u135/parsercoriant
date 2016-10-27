angular.module('homeModule', ['listWorkspacesModule', 'newWorkspaceModule', 'workspaceService'])

.controller('homeController', ['$scope', 'Workspaces', function($scope, Workspaces){
    
    $scope.showNew = false;
    $scope.messages = "";
    
    $scope.getWorkspaces = function(){
        Workspaces.getWorkspaces().then(function(workspaces){
            $scope.workspaces = workspaces;
        });
    }
    
    $scope.switchNewWorkspace = function(){
        if($scope.showNew == false){
            $scope.showNew = true;
        } else {
            $scope.showNew = false;
        }
    }
            
    $scope.getWorkspaces();
}]);