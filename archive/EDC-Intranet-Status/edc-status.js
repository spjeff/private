function statusCtl ($scope, $http) {
    // Defaults
    var vm = $scope;
    vm.hello = 'world';
    vm.toggle = false;

    // Test data
    // vm.row = {
    //     Title : 'New Announcement',
    //     Description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //     Color : 'Blue'
    //     // Color : 'Red'
    // };

    // Expand view
    vm.toggleView = function() {
        vm.toggle = !vm.toggle;
    };

    // Load
    vm.init = function() {
        var url = "https://educationdevelopmentcenter.sharepoint.com/sites/intranet/_api/web/lists/getByTitle('EDCStatus')/items";
        $http.get(url).then(function (resp) {
            // Parse JSON response
            var row = resp.data.value[0];
            vm.row = row;
        });
    };
    vm.init();
}

angular.module('statusApp',[]).controller('statusCtl', statusCtl);