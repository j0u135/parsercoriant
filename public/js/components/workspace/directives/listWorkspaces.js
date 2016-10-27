angular.module('listWorkspacesModule', [])

.directive('listWorkspaces', [function(){
    return {
        scope:{
              workspaces: '='
        },

        templateUrl: '/assets/templates/listWorkspaces.html'
    }
}])