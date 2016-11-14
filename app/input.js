/* jshint esversion: 6 */
(function() {
  angular.module('aurora.input', ['uiGmapgoogle-maps'])

  .config(function(uiGmapGoogleMapApiProvider){
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDZvMUReoG9Gh5z3shjVLO-MKE6P3nbOoc',
      libraries: 'places,geometry,visualization,drawing'
    });
  })

  .controller('InputCtrl', InputCtrl);

  function InputCtrl ($scope, $log, uiGmapGoogleMapApi) {
    // Google Map Functions

    const searchEvents = {
      places_changed: function(searchBox) {
        let place = searchBox.getPlaces();
        if (!place || place === 'undefined' || place.length === 0) {
          console.log('empty.')
          return;
        }
        $scope.map = {
          center: {
            latitude: place[0].geometry.location.lat(),
            longitude: place[0].geometry.location.lng()
          },
          zoom: 16
        };
      }
    };

    $scope.map = {
      center: { latitude: 45, longitude: -73 },
      zoom: 8
    };

    $scope.searchbox = {
      template: 'searchbox.tpl.html',
      events: searchEvents
    };

    $scope.options = {
      scrollwheel: false
    };

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps) {
      $scope.drawingManagerOptions = {

        drawingControl: true,
        drawingControlOptions: {
          position: maps.ControlPosition.TOP_RIGHT,
          drawingModes: [
            maps.drawing.OverlayType.POLYGON
          ]
        }
      };

      $scope.drawingManagerControl = {};
    });
  }

})();