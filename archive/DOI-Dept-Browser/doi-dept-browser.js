function doiDeptBrowserCtl($scope, $http) {
    // Declare view model
    var vm = $scope;

    // UI Grid
    vm.gridOptions = {
        multiSelect : true,
        enableRowSelection: true,
        enableSelectAll: false,
        enableFiltering: true,
        data: null,
        filter: vm.search,
        columnDefs: [
                {name: 'Name', field: 'name'},
                {name: 'Dept', field: 'dept'},
                {name: 'Org', field: 'org'},
                {name: 'EMail', field: 'email', cellTemplate:'<div><a href="mailto:{{row.entity.email}}">{{row.entity.email}}</a></div>'},
                {name: 'Phone', field: 'phone', cellTemplate:'<div><a href="tel:{{row.entity.phone}}">{{row.entity.phone}}</a></div>'}
                ]
    };

    // UI Grid Row Selection https://stackoverflow.com/questions/43079235/get-selected-row-of-angularjs-ui-grid
    vm.gridOptions.onRegisterApi = function(gridApi) {
        vm.gridApi = gridApi;
    };

    // Load data
    $http.get('/mongo-export-sample.json').then(function (resp) {
        // Core results
        vm.gridOptions.data = resp.data;

        // Left Department Navigation
        vm.depts = _.orderBy(_.uniq(_.map(resp.data, 'dept')));
    });

    // Send Email.  Collect with semi colon and redirect mailto:
    vm.sendMail = function() {
        var selected = vm.gridApi.selection.getSelectedRows();
        var mailto = 'mailto:'
        angular.forEach(selected, function (row) {
            mailto += row.email + ';';
        });
        document.location.href = mailto;
    };

    // Clear Selection.  https://github.com/angular-ui/ui-grid/issues/2243
    vm.clearSelection = function() {
        vm.gridApi.selection.clearSelectedRows()
    };
}

// AngularJS 1x Module
angular.module('doiDeptBrowserApp',['ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.cellNav',])
.controller('doiDeptBrowserCtl',doiDeptBrowserCtl);
