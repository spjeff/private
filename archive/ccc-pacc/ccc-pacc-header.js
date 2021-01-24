// Dev context HTTP
if (!window._spPageContextInfo) {
    if (document.location.origin.indexOf("sharepoint.com") > 0) {
        window._spPageContextInfo = {
            webAbsoluteUrl: "https://cccedu.sharepoint.com/sites/PAC/automated/dev"
        };
    } else {
        window._spPageContextInfo = {
            webAbsoluteUrl: "https://cccedu.sharepoint.com/sites/PAC/automated/dev"
        };
    }
}

// Global functions
function gup(name, url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var results = new RegExp("[?&]" + name + "=?([^&#]*)").exec(
        url || window.location.href
    );
    return results == null ? null : results[1] || true;
}

function has(obj, key) {
    return key.split(".").every(function (x) {
        if (typeof obj != "object" || obj === null || !x in obj) return false;
        obj = obj[x];
        return true;
    });
}

function paccHeaderCtl($scope, $http) {
    var vm = $scope;
    window.paccCtl = vm;

    vm.load = function () {
        var RootFolder = gup('RootFolder');
        var id = unescape(RootFolder).split('/')
        id = id[id.length - 1];
        $http.get(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('PACC')/items('" + id + "')?$select=PACCTitle,Created,Author/ID,Author/Name,Author/Title&$expand=Author/ID").then(function (resp) {
            vm.i = resp.data;
        });
    };
    vm.load();

}

// Register module
window.paccApp = angular.module("paccHeaderApp", []);
window.paccApp.controller("paccHeaderCtl", paccHeaderCtl);