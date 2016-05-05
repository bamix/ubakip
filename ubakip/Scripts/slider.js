angular.module('MyApp', ['rzModule']).controller('sliderController', function () {
    var sliders = this;
    sliders.slider1 = {
        value: 0.0,
        options: {
            floor: 0,
            ceil: 360,
            step: 1,
            precision: 1
        }
    };

    sliders.slider2 = {
        value: 1.0,
        options: {
            floor: 1,
            ceil: 10,
            step: 0.1,
            precision: 1
        }
    };
});