// Dev context HTTP
if (!window._spPageContextInfo) {
    if (document.location.origin.indexOf("sharepoint.com") > 0) {
        window._spPageContextInfo = {
            //webAbsoluteUrl: document.location.origin
            webAbsoluteUrl: "https://firstmidwest.sharepoint.com/sites/cobtest"
        };
    } else {
        window._spPageContextInfo = {
            //webAbsoluteUrl: "https://spjeff.sharepoint.com"
            webAbsoluteUrl: "https://firstmidwest.sharepoint.com/sites/cobtest"
        };
    }
}

function cobDashboardCtl($scope, $http) {
    var vm = $scope;
    window.cobDashboardCtl = vm;

    // Defaults
    vm.listName = 'COB';

    // Click card to navigate
    vm.navigate = function (c) {
        document.location.href = 'index.aspx?id=' + c.Id;
    };

    vm.load = function () {
        //REM $http.get('/cob-items.json').then(function (resp) {
            $pnp.sp.web.lists
              .getByTitle(vm.listName)
            .items.get().then(function (resp) {
            // Download
            m.data = resp;

            //REM vm.data = resp.data.value;

            // parse JSON body
            angular.forEach(vm.data, function (row) {
                row.JSONparse = JSON.parse(row.JSON);
            });

            // Filter by status
            vm.data1 = _.filter(vm.data, {
                FormStatus: 'Returned'
            });
            vm.data2 = _.filter(vm.data, {
                FormStatus: 'Open'
            });
            vm.data3 = _.filter(vm.data, {
                FormStatus: 'In Queue'
            });
            vm.data4 = _.filter(vm.data, {
                FormStatus: 'In Progress'
            });
            vm.data5 = _.filter(vm.data, {
                FormStatus: 'Out To Client'
            });

            vm.data6 = _.filter(vm.data, {
                FormStatus: 'Under Review'
            });
            vm.data7 = _.filter(vm.data, {
                FormStatus: 'Account(s) Complete'
            });
            vm.data8 = _.filter(vm.data, {
                FormStatus: 'Docs Approved'
            });
            vm.data9 = _.filter(vm.data, {
                FormStatus: 'Set up Complete'
            });
            vm.data10 = _.filter(vm.data, {
                FormStatus: 'Product(s) Established'
            });

            vm.data11 = _.filter(vm.data, {
                FormStatus: 'Training Complete'
            });
            vm.data12 = _.filter(vm.data, {
                FormStatus: 'Closed'
            });
            vm.data13 = _.filter(vm.data, {
                FormStatus: 'On Hold'
            });
            vm.data14 = _.filter(vm.data, {
                FormStatus: 'Purge'
            });

            // Refresh GUI
            vm.$apply();
        });


    }
    vm.load();
}

angular.module('cobDashboardApp', []).controller('cobDashboardCtl', cobDashboardCtl);