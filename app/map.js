(function() {
  angular.module('aurora.map', [
    'uiGmapgoogle-maps'
  ])

  /*=================================================
  =            Google Maps Configuration            =
  =================================================*/
  .config((uiGmapGoogleMapApiProvider)=>{
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDZvMUReoG9Gh5z3shjVLO-MKE6P3nbOoc',
      libraries: 'places,geometry,visualization,drawing'
    });
  })

  /*=============================================
  =               Map Controller               =
  =============================================*/
  .controller('MapCtrl', MapCtrl);

  function MapCtrl ($scope, $rootScope, uiGmapGoogleMapApi) {

    /*----------  Map Set Up  ----------*/

    $scope.map = {
      center: { latitude: 45, longitude: -73 },
      zoom: 12
    };

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

    $scope.searchbox = {
      template: 'searchbox.tpl.html',
      events: searchEvents
    };

    /*----------  Drawing Manager Set Up  ----------*/

    uiGmapGoogleMapApi.then((maps) => {
      // Drawing Manager
      let roofs = [];
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
          polygoncomplete: (dm, name, scope, objs) => {
            let polygon = objs[0];
            roofs.push({
              area: maps.geometry.spherical.computeArea(polygon.getPath())
            });
            $rootScope.roofs = roofs;
            $rootScope.map = $scope.map;
            $rootScope.listen(roofs, $scope.map);
          }
        }
      };
    });
  }

})();
