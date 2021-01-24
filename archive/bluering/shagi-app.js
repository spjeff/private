function shagiCtl($scope, $http) {
    var vm = $scope;
    vm.hello = 'world';

    // Populate GUI
    vm.os = "Windows 2016,Red Hat Linux,Ubuntu,CentOS".split(",");
    vm.org = "11th Special Operations Intelligence Squadron;Strategic Capabilities Office;DARPA".split(";");
    vm.sponsor = "Air Combat Command;Special Operations Command;Joint Artificial Intelligence Command".split(";");
    vm.phase = "Research and Development,Operational,Other".split(",");
    vm.need = [{
        qty: 1,
        cores: 4,
        ram: 16,
        drive1: 100,
        drive2: 100,
        os: 'Windows 2016'
    }];

    // Methods
    vm.addRow = function () {
        vm.need.push({});
    };
    vm.save = function () {
        // $http post (write TXT file NodeJS Express)
    };
}

angular.module('shagiApp', []).controller('shagiCtl', shagiCtl);