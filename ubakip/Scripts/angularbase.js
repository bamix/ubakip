angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
.controller('AppCtrl', function ($scope) {
    $scope.demo = {
        showTooltip: false,
        tipDirection: ''
    };

    $scope.$watch('demo.tipDirection', function (val) {
        if (val && val.length) {
            $scope.demo.showTooltip = true;
        }
    })
});