function chaSliderCtl($scope, $http) {
    var vm = $scope;

    vm.view = function(slide) {
        console.log(slide);
        window.open(slide.Url, '_blank');
    };

    vm.init = function() {
        var url = '/posts.txt';
        $http.get(url).then(function (resp){
            // JSON
            vm.slides = resp.data.d.results;

            window.setTimeout(function() {
                // BX Slider from https://bxslider.com/options/
                $(function(){
                    $('.bxslider').bxSlider({
                        //adaptiveHeight: true,
                        mode: 'fade',
                        captions: true,
                        slideWidth: 600,
                        infiniteLoop: true,
                        preloadImages: 'all'
                    });
                });
            }, 100);
        });
    };
    vm.init();
};
angular.module('chaSliderApp',[]).controller('chaSliderCtl',chaSliderCtl);
