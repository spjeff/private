window._spPageContextInfo = {
    webAbsoluteUrl : 'https://spjeff.sharepoint.com'
};

function fileCtl($scope, $http) {
    var vm = $scope;
    vm.hello = 'world';


    vm.save = function() {
        var control = document.getElementById('fileupload');
        var file = control.files[0];
        $pnp.sp.web.getFolderByServerRelativeUrl("/Shared%20Documents/").files.add(file.name, file, true).then(function (resp) {
            console.log(resp);
        });
    
    };
}
angular.module('fileApp', []).controller('fileCtl', fileCtl);