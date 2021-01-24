function ersCtl($scope, $http) {
    var vm = $scope;
    vm.hello='world';

    vm.init = function() {
        window['_spPageContextInfo'] = {
            webAbsoluteUrl: "https://doimspp.sharepoint.com/sites/ec_test01"
        };

        $pnp.sp.web.lists.getByTitle("Americas").items.get().then(function (resp) {
        //$http.get('/americas.json').then(function (resp) {
            vm.data = resp;
            vm.$apply();

            // DataTable
            $(document).ready(function () {
                $('#example').DataTable();
            });
        });
    };
    vm.init();
}

angular.module('ersApp',[]).controller('ersCtl',ersCtl);