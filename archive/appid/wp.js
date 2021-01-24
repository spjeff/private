function wpCtl($scope, $http) {
    var vm = $scope;
    vm.hello = 'world';


    //init auth


    vm.click = function() {
        vm.hello='stuff';
    }
};

angular.module('wpApp', ['AdalAngular']).controller('wpCtl', wpCtl);