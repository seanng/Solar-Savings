/* jshint esversion: 6 */
(function() {
  angular.module('aurora.input', ['uiGmapgoogle-maps', 'chart.js'])

  .config(function(uiGmapGoogleMapApiProvider){
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDZvMUReoG9Gh5z3shjVLO-MKE6P3nbOoc',
      libraries: 'places,geometry,visualization,drawing'
    });
  })

  .controller('InputCtrl', InputCtrl);

  function InputCtrl ($scope, $log, uiGmapGoogleMapApi, httpMethods) {
    const searchEvents = {
      places_changed: function(searchBox) {
        let place = searchBox.getPlaces();
        if (!place || place === 'undefined' || place.length === 0) {
          return;
        }
        $scope.map = {
          center: {
            latitude: place[0].geometry.location.lat(),
            longitude: place[0].geometry.location.lng()
          },
          zoom: 17
        };
      }
    };

    $scope.map = {
      center: { latitude: 45, longitude: -73 },
      zoom: 12,
      events: function(e) {
        console.log(e);
      }
    };

    $scope.searchbox = {
      template: 'searchbox.tpl.html',
      events: searchEvents
    };

    $scope.roofs = [];

    $scope.financials = {
      display: false,
      chart: {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
        cashflowData: []
      }

    };

    $scope.calculate = function() {
      let hasAzimuth = $scope.roofs.every((e)=>e.azimuth !== undefined);
      let hasRoofPitch = $scope.roofs.every((e)=>e.roofPitch !== undefined);
      if (!hasAzimuth || !hasRoofPitch) {
        console.log('azimuth and roofpatch are required.');
        return;
      }
      let roofs = $scope.roofs.map((roof)=>{
        roof.totalWattage = roof.area * (roof.unitWattage || 222);
        roof.longitude = $scope.map.center.longitude;
        roof.latitude = $scope.map.center.latitude;
        return roof;
      });
      console.log('roofs', roofs);

      httpMethods.getPerformance(roofs, function(results){
        console.log('woooohoooo', results, roofs);
        $scope.calculation = results;
        $scope.financials.totalWattage = roofs.reduce((a, b)=>{return a + b.totalWattage}, 0);
        $scope.financials.annualAC = results.reduce((a, b)=>{return a + b.ac_annual}, 0);
        $scope.financials.display = true;
        $scope.financials.chart.cashflowData.push(0 - ($scope.financials.totalWattage * 3.5));
        for (let i = 1; i < 10; i++) {
          let prevCF = $scope.financials.chart.cashflowData[i-1];
          let currCF = prevCF + (0.14 * $scope.financials.annualAC);
          $scope.financials.chart.cashflowData.push(currCF);

        }
        console.log($scope.financials.chart.cashflowData);
      });
    };

    uiGmapGoogleMapApi.then(function(maps) {
      // Drawing Manager
      $scope.drawingManager = {
        options: {
          drawingControl: true,
          drawingControlOptions: {
            position: maps.ControlPosition.TOP_RIGHT,
            drawingModes: [maps.drawing.OverlayType.POLYGON]
          }
        },
        control: {},
        events: {
          polygoncomplete: function(dm, name, scope, objs) {
            var polygon = objs[0];
            $scope.roofs.push({
              area: maps.geometry.spherical.computeArea(polygon.getPath())
            });
          }
        }
      };
    });
  }

})();