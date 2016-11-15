/*jshint esversion: 6*/
(function() {
  angular.module('aurora.services', [
  ])
  .factory('httpMethods', function($http, $rootScope){
    return {
      getPerformance: function(roofs, cb){
        let results = [];
        roofs.forEach(roof=>{
          console.log('roof', roof);
          $http({
            method: 'GET',
            url: 'https://developer.nrel.gov/api/pvwatts/v5',
            params: {
              format: 'json',
              api_key: 'cLRJmAW9G9j0BC6UCdwKD2mBlClrV8eiZcBRrnNt',
              // kiloWattage
              system_capacity: (roof.totalWattage / 1000),
              module_type: 0,
              losses: "0",
              array_type: "1",
              azimuth: roof.azimuth,
              tilt: roof.roofPitch,
              lat: roof.latitude,
              lon: roof.longitude
            }
          }).then(function successCB(resp) {
            console.log('succ',resp);
            results.push(resp.data.outputs);
            if (results.length === roofs.length) {
              return cb(results);
            }
          }, function errorCB(resp){
            console.log('err', resp);
            return resp;
          });
        });
      }
    };
  });
})();
