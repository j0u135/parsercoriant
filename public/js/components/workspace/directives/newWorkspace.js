angular.module('newWorkspaceModule', ['workspaceService'])

.directive('newWorkspace', ['Workspaces', function(Workspaces){
    return {
        scope: {
            workspaces : '=',
            messages : '='
        },
        link: function(scope, element, attrs){
            
            scope.name = "";
            scope.messages = "";
            
            scope.getWorkspaces = function(){
                Workspaces.getWorkspaces().then(function(workspaces){
                    scope.workspaces = workspaces;
                });
            }
            
            scope.create = function(name){
                Workspaces.create(name).then(function(response){
                    scope.getWorkspaces();
                    scope.messages = response.ok.description;
                    scope.name = "";
                });
            }
        },
        templateUrl: '/assets/templates/newWorkspace.html'
    }
}]);