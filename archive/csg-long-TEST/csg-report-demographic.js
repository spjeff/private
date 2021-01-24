// Dev Context
if (!window._spPageContextInfo) {
    window._spPageContextInfo = {
        webAbsoluteUrl: "https://studytst.lgvreg.com/sites/aging"
    };
}
var frmt = 'MM/DD/YYYY';

function demoCtl($scope, $http) {
    // Default data
    var vm = $scope;
    vm.listName = 'Patient';

    // Load HTTP data
    vm.load = function () {

        $http.defaults.headers.common['Accept'] = 'application/json;odata=verbose';
        $http.get("https://studytst.lgvreg.com/sites/aging/_api/web/lists/getByTitle('Patient')/items").then(function (resp) {
            // Storage
            var temp = resp.data.d.results;
            vm.data = temp;

        });

    };
    vm.load();
}

angular.module('demoApp', []).controller('demoCtl', demoCtl);