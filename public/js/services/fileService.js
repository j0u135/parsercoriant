angular.module('fileServiceModule', [])


.factory('File', function($http){
   var funciones = {
      uploadFiles: function(newfiles, workspace){
         var fd = new FormData();
         
         fd.append('file', newfiles);
         fd.append('workspace', workspace);
         
         var promise = 
         $http.post('/api/files/upload', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
         }).then(function(response){
            return response.data;
         }, function(err){
            //TODO
            console.log(err);
         });
         return promise;
      },
      uploadCalculos: function(newfiles, workspace){
         var fd = new FormData();
         
         fd.append('file', newfiles);
         fd.append('workspace', workspace);
         
         var promise = 
         $http.post('/api/calculos/upload', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
         }).then(function(response){
            return response.data;
         }, function(err){
            //TODO
            console.log(err);
         });
         return promise;
      },
      asignarFile: function(workspace, file, tipo){
         var fd = new FormData();
         
         fd.append('workspace', workspace);
         fd.append('file', file);
         fd.append('tipo', tipo);
         
         console.log(workspace + "-" + file + "-" + tipo);
         
         var promise = $http({
            method: 'POST',
            url: '/api/files/asignar',
            data: {
               workspace: workspace,
               file: file,
               tipo, tipo
            }
         }).then(function(response){
            return response.data;
         });
         return promise;
      },
      descargarArchivoProcesado: function(workspace, file){
         var promise = $http({
            method: 'GET',
            url: '/api/files/download/' + workspace + '/procesados/' + file,
            headers: {
                'Content-type': 'application/json'
             },
             responseType: 'arraybuffer'
         }).then(function(response) {
            var blob = new Blob([response.data], {type: "application/x-gzip"});
            saveAs(blob, file + ".gz");
            return;
         });
         return promise;
      },
   }
   return funciones;
})