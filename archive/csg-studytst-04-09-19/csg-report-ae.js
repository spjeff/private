// Dev Context
if (!window._spPageContextInfo) {
    window._spPageContextInfo = {
        webAbsoluteUrl: "https://studytst.lgvreg.com/sites/aging"
    };
}
var frmt = 'MM/DD/YYYY';

function reportCtl($scope, $http) {
    // Default data
    var vm = $scope;
    vm.hello = 'world';
    vm.listName = 'Patient';

    // Load HTTP data
    vm.load = function () {


        // Read JSON current -- Patient
        $http.defaults.headers.common['Accept'] = 'application/json;odata=verbose';
        $http.get("https://studytst.lgvreg.com/sites/aging/_api/web/lists/getByTitle('Patient')/items").then(function (resp) {
            // Storage
            var temp = resp.data.d.results;
                // Storage
                var final = [];

                // Add "eventdate" property to all rows
                for (var i = 0; i < temp.length; i++) {
                    temp[i].eventdate = null;
                }

                // AE Event Rows
                var spRows = temp.length;
                for (var i = 0; i < spRows; i++) {
                    var text = temp[i].JSON;
                    if (text) {
                        var json = JSON.parse(text);
                        for (var j = 0; j < json.injectRow.length; j++) {
                            for (var k = 0; k < json.injectRow[j].visitRow.length; k++) {
                                for (var l = 0; l < json.injectRow[j].visitRow[k].ae.events.length; l++) {
                                    var newRow = {
                                        ID: temp[i].ID,
                                        Title: temp[i].Title,
                                        infusionID: j,
                                        visitID: k,
                                        eventdate: moment(json.injectRow[j].visitRow[k].ae.events[l].eventdate).format(frmt),
                                        eventid: json.injectRow[j].visitRow[k].ae.events[l].eventid,
                                        class: json.injectRow[j].visitRow[k].ae.events[l].class,
                                        concern: json.injectRow[j].visitRow[k].ae.events[l].concern
                                    };
                                    final.push(newRow);
                                }

                            }
                        }
                    }

                    // Filter
                    final = _.reject(final, function (r) {
                        return (!r['eventdate'] || r['eventdate'] === 'Invalid date');
                    });
                    vm.data = final;
                }

            });
    };
    vm.load();
}

angular.module('reportApp', []).controller('reportCtl', reportCtl);