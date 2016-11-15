/* jshint esversion: 6 */
(function() {
  angular.module('aurora.calculation', [
    'chart.js'
  ])

  .controller('CalculationCtrl', CalculationCtrl);

  function CalculationCtrl ($scope, $rootScope, http) {

    $rootScope.listen = (roofs, map) => {
      $scope.roofs = roofs;
      $scope.map = map;
    };

    $scope.financials = {
      display: false,
      chart: {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
        cashflowData: []
      }
    };

    /*----------  Update and Render Financials  ----------*/

    const displayResults = (results, roofs) => {
      $scope.financials.totalWattage = roofs.reduce((a, b)=>{return a + b.totalWattage}, 0);
      $scope.financials.annualAC = results.reduce((a, b)=>{return a + b.ac_annual}, 0);
      $scope.financials.display = true;
      $scope.financials.chart.cashflowData.push(0 - ($scope.financials.totalWattage * 3.5));
      for (let i = 1; i < 10; i++) {
        let prevCF = $scope.financials.chart.cashflowData[i-1];
        let currCF = prevCF + (0.14 * $scope.financials.annualAC);
        $scope.financials.chart.cashflowData.push(currCF);

      }
    };

    /*----------  Calculate Click Handler  ----------*/

    $scope.calculate = () => {
      let hasAzimuth = $scope.roofs.every((e)=>e.azimuth !== undefined);
      let hasRoofPitch = $scope.roofs.every((e)=>e.roofPitch !== undefined);
      if (!hasAzimuth || !hasRoofPitch) {
        console.log('azimuth and roofpatch are required.');
        return;
      }
      let roofs = $scope.roofs.map((roof)=>{
        roof.totalWattage = roof.area * (roof.unitWattage || 222);
        roof.longitude = $rootScope.map.center.longitude;
        roof.latitude = $rootScope.map.center.latitude;
        return roof;
      });
      http.getPerformance(roofs, displayResults);
    };

  }



})();
