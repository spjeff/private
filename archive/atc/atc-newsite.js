// Dev context HTTP
if (!window._spPageContextInfo) {
    if (document.location.origin.indexOf('sharepoint.com') > 0) {
        window._spPageContextInfo = {
            //webAbsoluteUrl: document.location.origin
            webAbsoluteUrl: "https://firstmidwest.sharepoint.com/sites/cob"
        };
    } else {
        window._spPageContextInfo = {
            //webAbsoluteUrl: "https://spjeff.sharepoint.com"
            webAbsoluteUrl: "https://firstmidwest.sharepoint.com/sites/cob"
        };
    }
}

function atcCtl($scope) {
    var vm = $scope;
    vm.hello = 'world';
    vm.listName = "COB";

    // Choices
    vm.choiceSiteType = "Team Site,Project Site".split(",");
    vm.choiceImage = "Classic,Blue,Red".split(",");
    vm.choiceBusinessFunc = "Finance Accounting,Finance,Accounting,Marketing,Manufacturing".split(",");

    // Data
    vm.d = {};

    // Methods
    vm.init = function() {
        $(document).ready(function () {
            $('#atcBusinessFunction').chosen();
        });
    }
    vm.init();
    vm.typeName = function() {
        var shortURL = vm.d.siteName.toLowerCase().replace(' ','').replace();
        // Replace out any special symbols

        vm.d.siteURL = shortURL;
    }
    vm.verifyURL = function() {
        // Test if URL available
        if (vm.d.siteURL == 'test') {
            return false;
        } else {
            return true;
        }
    };
    vm.save = function () {
        // Setup
        console.log("save");
    
        if (vm.id && vm.id != "undefined") {
          // UPDATE if have ID
          $pnp.sp.web.lists
            .getByTitle(vm.listName)
            .items.getById(vm.id)
            .update({
              Title: ".",
              JSON: angular.toJson(vm.d),
              FormStatus: vm.d.formStatus
            })
            .then(function (r) {
              // response
              console.log(r);
              // Popup
              if (r.item) {
                toastr.success("Form updated OK #" + vm.id);
              }
            });
        } else {
          // INSERT if missing
          vm.d.formStatus = 'Open';
    
          $pnp.sp.web.lists
            .getByTitle(vm.listName)
            .items.add({
              Title: ".",
              JSON: angular.toJson(vm.d),
              FormStatus: vm.d.formStatus
            })
            .then(function (r) {
              // response
              console.log(r);
              document.location.href += "?id=" + r.data.Id;
              // Popup
              toastr.success("Form created OK #" + r.data.Id);
              vm.id = r.data.Id;
            });
        }
      };
    vm.cancel = function() {

    }
}

window.atcApp = angular.module("atcApp", []);
window.atcApp.controller('atcCtl', atcCtl);