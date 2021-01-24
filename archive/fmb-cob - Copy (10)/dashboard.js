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
	vm.hoverdata = {start: {purpose: 'hello'}};

    // Click card to navigate
    vm.navigate = function (c) {
        document.location.href = 'index.aspx?id=' + c.Id;
    };
	
	// Hover event
	vm.hover = function (c, event) {
		// Data
		vm.hoverdata = c;
		
		// Position
		var hovercard = document.getElementById('hovercard');
		hovercard.style.top = event.pageY + 'px';
		hovercard.style.left = event.pageX + 'px';
		
	};

    vm.load = function () {
        //REM $http.get('/cob-items.json').then(function (resp) {
            $pnp.sp.web.lists
              .getByTitle(vm.listName)
            .items.top(5000).get().then(function (resp) {
				
            // Download
            vm.data = resp;
            //REM vm.data = resp.data.value;

            // parse JSON body
            angular.forEach(vm.data, function (row) {
				// Parse all JSON
                row.JSONparse = JSON.parse(row.JSON);
				row.ModifiedShort = row.Modified.split('T')[0];
				row.CreatedShort = row.Created.split('T')[0];
				
				// Elapsed days
				if (row.FormStatusDate) {
					var one_day = 1000*60*60*24;
					var now = new Date();
					var today = (now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear();
					var elapsed = (new Date(today)) - (new Date(row.FormStatusDate));
					row.elapsed = parseInt(elapsed / one_day);
					if (row.elapsed.toString() == 'NaN') {row.elapsed='';}
				}
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
            vm.data15 = _.filter(vm.data, {
                FormStatus: 'CIS Record InProgress'
            });
            vm.data16 = _.filter(vm.data, {
                FormStatus: 'CIS Record Complete'
            });
            vm.data17 = _.filter(vm.data, {
                FormStatus: 'OnBoarding Complete'
            });

            // Refresh GUI
            vm.$apply();
        });


    }
    vm.load();
}

angular.module('cobDashboardApp', []).controller('cobDashboardCtl', cobDashboardCtl);