function shagiCtl($scope, $http) {
    var vm = $scope;

    // Populate GUI
    vm.proposalTemplate = {
        os: "Windows 2016,Red Hat Linux,Ubuntu,CentOS".split(","),
        org: "11th Special Operations Intelligence Squadron;Strategic Capabilities Office;DARPA".split(";"),
        sponsor: "Air Combat Command;Special Operations Command;Joint Artificial Intelligence Command".split(";"),
        phase: "Research and Development,Operational,Other".split(","),
        need: [{
            qty: 1,
            cores: 4,
            ram: 16,
            drive1: 100,
            drive2: 100,
            os: 'Windows 2016'
        }]
    };
    vm.proposal = JSON.parse(JSON.stringify(vm.proposalTemplate));
    vm.authTemplate = {
        userDate : new Date()
    };
    vm.auth = JSON.parse(JSON.stringify(vm.authTemplate));

    // Methods
    vm.addRow = function () {
        vm.need.push({});
    };
    vm.saveProposal = function () {
        // Write TXT file NodeJS Express
        var proposal = JSON.stringify(vm.proposal);
        $http({
            url: '/proposal',
            method: 'POST',
            headers : {
                'Content-Type' : 'text/plain'
            },
            data: proposal
        });
        toastr["success"]("Proposal Saved");
    };

    vm.saveAuth = function () {
        // Write TXT file NodeJS Express
        var auth = JSON.stringify(vm.auth);
        $http({
            url: '/auth',
            method: 'POST',
            headers : {
                'Content-Type' : 'text/plain'
            },
            data: auth
        });
        toastr["success"]("Authentication Form Saved");
    };

    vm.resetProposal = function () {
        vm.proposal = JSON.parse(JSON.stringify(vm.proposalTemplate));
        vm.$apply();
        toastr["info"]("Reset OK");
    };

    vm.resetAuth = function () {
        vm.auth = JSON.parse(JSON.stringify(vm.authTemplate));
        vm.$apply();
        toastr["info"]("Reset OK");
    };
}

angular.module('shagiApp', []).controller('shagiCtl', shagiCtl);