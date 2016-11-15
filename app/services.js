/*jshint esversion: 6*/
(function() {
  angular.module('aurora.services', [
  ])
  .factory('httpMethods', function($http){
    return {
      getPerformance: function(roofs){
        let totalWattage = roofs.reduce((a,b)=>a.totalWattage+b.totalWattage);
        console.log('totalWattage', totalWattage);
        roofs.forEach(roof=>{
          console.log('roof', roof);
          $http({
            method: 'GET',
            url: 'https://developer.nrel.gov/api/pvwatts/v5',
            params: {
              format: 'json',
              api_key: 'cLRJmAW9G9j0BC6UCdwKD2mBlClrV8eiZcBRrnNt',
              system_capacity: roof.totalWattage,
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
          }, function errorCB(resp){
            console.log('err', resp);
          });
        });
      }
    };
  });
})();
