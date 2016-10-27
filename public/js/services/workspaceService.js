angular.module('workspaceService', [])

.factory('Workspaces', function($http){
   var funciones = {
       getWorkspaces: function(){
           var promise = $http({
              method: 'GET',
              url: '/api/workspaces',
           }).then(function(response){
               return response.data;
           });
           return promise;
       },
       create: function(name){
            var promise = $http({
                method: 'POST',
                url: '/api/workspace',
                data: {
                    name: name
                }
            }).then(function(response) {
                return response.data;
            });
            return promise;
       },
       listFiles: function(workspace){
           var promise = $http({
               method: 'GET',
               url: '/api/workspace/files/' + workspace
           }).then(function(response) {
               return response.data;
           });
           return promise;
       },
       processFiles: function(files, workspace){
           var promise = $http({
               method: 'POST',
               url: '/api/workspace/process/' + workspace,
               data: {
                   files: files
               }
           }).then(function(response){
               return response.data;
           })
           return promise;
       },
       processBBR: function(files, workspace){
           var promise = $http({
               method: 'POST',
               url: '/api/workspace/process/bbr/' + workspace,
               data: {
                   files: files
               }
           }).then(function(response){
               return response.data;
           })
           return promise;
       },
       processSiatel: function(files, workspace){
           var promise = $http({
               method: 'POST',
               url: '/api/workspace/process/siatel/' + workspace,
               data: {
                   files: files
               }
           }).then(function(response){
               return response.data;
           })
           return promise;
       },
       processEntradas50: function(files, workspace){
           var promise = $http({
               method: 'POST',
               url: '/api/workspace/process/eficentrum/' + workspace,
               data: {
                   files: files
               }
           }).then(function(response){
               return response.data;
           })
           return promise;
       },
       listProcessedFiles: function(workspace){
         var promise = $http({
            method: 'GET',
            url: '/api/workspace/processed/' + workspace,
         }).then(function(response) {
            return response.data;
         });
         return promise;
       },
       listCalculos: function(workspace){
         var promise = $http({
            method: 'GET',
            url: '/api/workspace/calculos/' + workspace,
         }).then(function(response) {
            return response.data;
         });
         return promise;
       },
       listResultados: function(workspace){
         var promise = $http({
            method: 'GET',
            url: '/api/workspace/resultados/' + workspace,
         }).then(function(response) {
            return response.data;
         });
         return promise;
       },
       descargarTodosProcesados: function(workspace){
          var promise = $http({
             method: 'GET',
             url: '/api/workspace/download/' + workspace + '/procesados/',
             headers: {
                'Content-type' : 'application/json'
             },
             responseType: 'arraybuffer',
          }).then(function(response) {
              var blob = new Blob([response.data], {type: "application/x-gzip"});
              saveAs(blob, workspace + ".tar.gz");
              return;
          });
          return promise;
       },
   }
   return funciones;
});