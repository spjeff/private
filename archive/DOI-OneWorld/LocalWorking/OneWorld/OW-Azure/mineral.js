$("#versionModal").modal();

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

var link = document.getElementById("email121");
link.onclick = function() {
  this.href =
    "mailto:NMICSystems@usgs.gov?subject=OneWorld: Troubleshooting Report&body=";
  this.href += getBody();
};

function getBody() {
  return "Please enter your issue here:";
}

var commodities = [];
var classificationModule = angular.module("mainapp", ["ngSanitize", "ngCsv"]);
var list = [];
var originalRows = [];
var scope;
var admin;
classificationModule.controller("firstcontroll", function($scope, $timeout) {
  // google.script.run
  //   .withSuccessHandler(onSuccessSetup)
  //   .withUserObject($scope)
  //   .getUsableCols();

  // google.script.run
  //   .withSuccessHandler(onSuccessAdmin)
  //   .withUserObject($scope)
  //   .getAdmin();

  $scope.rows = [];

  $scope.drr = {
    request: "",
    country: "",
    commodity: "",
    type: "",
    phase: "",
    measure: "",
    form: "",
    subform: "",
    unit: "",
    explanation: "",
    D_2011: "",
    E_2011: "",
    S_2011: "",
    D_2012: "",
    E_2012: "",
    S_2012: "",
    D_2013: "",
    E_2013: "",
    S_2013: "",
    D_2014: "",
    E_2014: "",
    S_2014: "",
    D_2015: "",
    E_2015: "",
    S_2015: "",
    D_2016: "",
    E_2016: "",
    S_2016: "",
    D_2017: "",
    E_2017: "",
    S_2017: "",
    D_2018: "",
    E_2018: "",
    S_2018: ""
  };
  $scope.getArray;
  $scope.years = [2015, 2016, 2017, 2018];
  $scope.year = 2018;
  var drr = {};
  drr.request = "";
  drr.country = "";
  drr.commodity = "";
  drr.type = "";
  drr.phase = "";
  drr.measure = "";
  drr.form = "";
  drr.subform = "";
  drr.unit = "";
  drr.explanation = "";
  drr.D_2011 = "";
  drr.E_2011 = "";
  drr.S_2011 = "";
  drr.D_2012 = "";
  drr.E_2012 = "";
  drr.S_2012 = "";
  drr.D_2013 = "";
  drr.E_2013 = "";
  drr.S_2013 = "";
  drr.D_2014 = "";
  drr.E_2014 = "";
  drr.S_2014 = "";
  drr.D_2015 = "";
  drr.E_2015 = "";
  drr.S_2015 = "";
  drr.D_2016 = "";
  drr.E_2016 = "";
  drr.S_2016 = "";
  drr.D_2017 = "";
  drr.E_2017 = "";
  drr.S_2017 = "";
  drr.D_2018 = "";
  drr.E_2018 = "";
  drr.S_2018 = "";
  $scope.drr = drr;
  $scope.today = new Date();
  $scope.totalY1 = function() {
    total = 0;
    for (i = 0; i < $scope.rows.length; i++) {
      var val = parseInt($scope.rows[i].year1_v1_value_prelim);
      if (isNaN(val) || $scope.rows[i].year1_v1_value_prelim === "") {
        val = parseInt($scope.rows[i].year1);
      }
      if (isNaN(val)) {
        val = 0;
      }
      total = total + val;
    }
    return total;
  };
  $scope.totalY2 = function() {
    total = 0;
    for (i = 0; i < $scope.rows.length; i++) {
      var val = parseInt($scope.rows[i].year2_v1_value_prelim);
      if (isNaN(val)) {
        val = parseInt($scope.rows[i].year2);
      }
      if (isNaN(val)) {
        val = 0;
      }
      total = total + val;
    }
    return total;
  };
  $scope.totalY3 = function() {
    total = 0;
    for (i = 0; i < $scope.rows.length; i++) {
      var val = parseInt($scope.rows[i].year3_v1_value_prelim);
      if (isNaN(val)) {
        val = parseInt($scope.rows[i].year3);
      }
      if (isNaN(val)) {
        val = 0;
      }
      total = total + val;
    }
    return total;
  };
  $scope.totalY4 = function() {
    total = 0;
    for (i = 0; i < $scope.rows.length; i++) {
      var val = parseInt($scope.rows[i].year4_v1_value_prelim);
      if (isNaN(val)) {
        val = parseInt($scope.rows[i].year4);
      }
      if (isNaN(val)) {
        val = 0;
      }
      total = total + val;
    }
    return total;
  };
  $scope.totalY5 = function() {
    total = 0;
    for (i = 0; i < $scope.rows.length; i++) {
      var val = parseInt($scope.rows[i].year5_v1_value_prelim);
      if (isNaN(val)) {
        val = parseInt($scope.rows[i].year5);
      }
      if (isNaN(val)) {
        val = 0;
      }
      total = total + val;
    }
    return total;
  };
  $scope.commas_remove = function(row, year) {
    if ((year = 1)) {
      row.year1_v1_value_prelim = row.year1_v1_value_prelim.replace(
        /[^\dNAW]/g,
        ""
      );
    }
    if ((year = 2)) {
      row.year2_v1_value_prelim = row.year2_v1_value_prelim.replace(
        /[^\dNAW]/g,
        ""
      );
    }
    if ((year = 3)) {
      row.year3_v1_value_prelim = row.year3_v1_value_prelim.replace(
        /[^\dNAW]/g,
        ""
      );
    }
    if ((year = 4)) {
      row.year4_v1_value_prelim = row.year4_v1_value_prelim.replace(
        /[^\dNAW]/g,
        ""
      );
    }
    if ((year = 5)) {
      row.year5_v1_value_prelim = row.year5_v1_value_prelim.replace(
        /[^\dNAW]/g,
        ""
      );
    }
  };
  $scope.badchar_remove_obj = function(o) {
    o.str = o.str.replace(/[^\dNAW]/g, "");
  };
  $("#dataModal").on("hidden.bs.modal", function() {
    Object.assign($scope.row, $scope.row_revert);
    $scope.$apply();
  });
  $scope.submit = function() {
    //console.log("hope this is first")
    $scope.row_revert = $scope.row;
    $scope.footnotes = getFootnotes($scope.rows, $scope);
    // google.script.run
    //   .withSuccessHandler($scope.saveNotice)
    //   .withUserObject($scope)
    //   .saveRow($scope.table_name, $scope.row, "m");
  };

  $scope.init = function() {
    $scope.rows = [];
    $scope.year = $scope.tmpYear;
    $("#loadModal").modal();
    // google.script.run
    //   .withSuccessHandler(onSuccessData)
    //   .withUserObject($scope)
    //   .getData($scope.table_name, $scope.year, "m");
    // google.script.run
    //   .withSuccessHandler(onSuccessMetadata)
    //   .withUserObject($scope)
    //   .getMetadata($scope.table_name, "m");
  };

  $scope.setup = function() {};
  $scope.restore = function() {
    //console.log($scope.table_name)
    // google.script.run
    //   .withSuccessHandler(onSuccessData)
    //   .withUserObject($scope)
    //   .getDataRestore($scope.table_name);
    // google.script.run
    //   .withSuccessHandler(onSuccessMetadata)
    //   .withUserObject($scope)
    //   .getMetadata($scope.table_name, "m");
  };
  $scope.openModalWith = function(row) {
    $scope.row = row;
    $scope.row_revert = Object.assign({}, row);
  };
  $scope.allZeroes = function(row) {
    if ($scope.showZeroes) {
      return false;
    }
    if (
      row.year5_current_value == 0 &&
      row.year4_current_value == 0 &&
      row.year3_current_value == 0 &&
      row.year2_current_value == 0 &&
      row.year1_current_value == 0 &&
      row.year1_v1_value_prelim == 0 &&
      row.year2_v1_value_prelim == 0 &&
      row.year3_v1_value_prelim == 0 &&
      row.year4_v1_value_prelim == 0 &&
      row.year5_v1_value_prelim == 0
    ) {
      return true;
    } else return false;
  };

  $scope.alertModalWith = function(message) {
    $scope.message = message;
    $scope.alert = "";
    $("#alertModal").modal();
  };
  $scope.submit_drr = function() {
    // google.script.run.withSuccessHandler(onSuccessDRR).sendDataDrr($scope.drr);
  };
  $scope.submitData = function(draft) {
    console.log($scope.rows[0].year1_v1_value_prelim);
    console.log($scope.rows[0].year1);

    // google.script.run
    //   .withSuccessHandler(onSuccessDraftB)
    //   .sendDataDraft($scope.table_name, $scope.rows, $scope.table);
  };
  $scope.submitFinalizeIDA = function() {
    console.log("finalizing" + $scope.table_name);
    // google.script.run.sendFinalize($scope.table_name, "m");
  };
  $scope.submitDataDraft = function() {
    {
      $scope.submitData(true);
    }
  };
  $scope.submitStructureFinal = function() {
    if ($scope.loaded_table) {
      google.script.run.sendLayout($scope.loaded_table, $scope.table);
    }
  };
  $scope.submitDataFinal = function() {
    var result = $scope.verify();
    if (result == 0) {
      // google.script.run
      //   .withFailureHandler(onFailureDraft)
      //   .withSuccessHandler(onSuccessDraft)
      //   .sendDataReconcile($scope.table_name, $scope.rows);

      //           $scope.submitData(false)
    } else {
      $scope.result = result;
      $("#validationModal").modal();
    }
  };
  $scope.noticeDisplay = true;
  $scope.saveNotice = function() {
    $scope.noticeDisplay = false;
    $timeout(function() {
      $scope.noticeDisplay = true;
    }, 3000);
  };
  $scope.doit = function(type, commodity, e, fn, dl) {
    $("#exportModal").modal();
    var elt = document.getElementById("data-table");
    var fns = document.getElementById("fn-table");
    var wb = XLSX.utils.book_new();
    var ws1 = XLSX.utils.table_to_sheet(elt);
    var ws2 = XLSX.utils.table_to_sheet(fns);

    var metadata = [
      [document.getElementById("num").innerHTML],
      [
        document.getElementById("title").innerHTML +
          document.getElementById("title_notes").innerHTML
      ],
      [document.getElementById("metadata").innerHTML]
    ];
    var ws3 = XLSX.utils.aoa_to_sheet(metadata);

    XLSX.utils.book_append_sheet(wb, ws1, "Data");

    XLSX.utils.book_append_sheet(wb, ws2, "Footnotes");
    XLSX.utils.book_append_sheet(wb, ws3, "Metadata");

    XLSX.writeFile(wb, fn || commodity + "." + (type || "xlsx"));

    //        var wopts = { bookType:'xlsx', bookSST:false, type:'buffer' };
    //
    //        var wbout = XLSX.write(wb,wopts);
    //google.script.run.fileSave(wbout)
  };
  $scope.verify = function() {
    var i;
    var y1a = "2013";
    var y2a = "2014";
    var y3a = "2015";
    var y4a = "2016";
    var y5a = "2017";

    var issue_list = [];
    for (i = 0; i < $scope.rows.length; i++) {
      if (
        $scope.rows[i].year1_status === "MINERAL1" ||
        $scope.rows[i].year1_status === "MINERAL2" ||
        $scope.rows[i].year1_status === "GLOBAL1" ||
        $scope.rows[i].year1_status === "GLOBAL2" ||
        $scope.rows[i].year1_status === "SUPERVISOR"
      ) {
        issue_list.push("y1 in reconcile for " + $scope.rows[i].country);
      }
      if (
        $scope.rows[i].year2_status === "MINERAL1" ||
        $scope.rows[i].year2_status === "MINERAL2" ||
        $scope.rows[i].year2_status === "GLOBAL1" ||
        $scope.rows[i].year2_status === "GLOBAL2" ||
        $scope.rows[i].year2_status === "SUPERVISOR"
      ) {
        issue_list.push("y2 in reconcile for " + $scope.rows[i].country);
      }
      if (
        $scope.rows[i].year3_status === "MINERAL1" ||
        $scope.rows[i].year3_status === "MINERAL2" ||
        $scope.rows[i].year3_status === "GLOBAL1" ||
        $scope.rows[i].year3_status === "GLOBAL2" ||
        $scope.rows[i].year3_status === "SUPERVISOR"
      ) {
        issue_list.push("y3 in reconcile for " + $scope.rows[i].country);
      }
      if (
        $scope.rows[i].year4_status === "MINERAL1" ||
        $scope.rows[i].year4_status === "MINERAL2" ||
        $scope.rows[i].year4_status === "GLOBAL1" ||
        $scope.rows[i].year4_status === "GLOBAL2" ||
        $scope.rows[i].year4_status === "SUPERVISOR"
      ) {
        issue_list.push("y4 in reconcile for " + $scope.rows[i].country);
      }
      if (
        $scope.rows[i].year5_status === "MINERAL1" ||
        $scope.rows[i].year5_status === "MINERAL2" ||
        $scope.rows[i].year5_status === "GLOBAL1" ||
        $scope.rows[i].year5_status === "GLOBAL2" ||
        $scope.rows[i].year5_status === "SUPERVISOR"
      ) {
        issue_list.push("y5 in reconcile for " + $scope.rows[i].country);
      }
    }
    for (i = 0; i < $scope.rows.length; i++) {
      if (
        !$scope.rows[i].year1_current_value &&
        !$scope.rows[i].year1_v1_value_prelim
      ) {
        issue_list.push(
          "Missing draft value for " +
            $scope.rows[i].country +
            " in " +
            y1a +
            "."
        );
      }

      if (
        !$scope.rows[i].year2_current_value &&
        !$scope.rows[i].year2_v1_value_prelim
      ) {
        issue_list.push(
          "Missing draft value for " +
            $scope.rows[i].country +
            " in " +
            y2a +
            "."
        );
      }
      if (
        !$scope.rows[i].year3_current_value &&
        !$scope.rows[i].year3_v1_value_prelim
      ) {
        issue_list.push(
          "Missing draft value for " +
            $scope.rows[i].country +
            " in " +
            y3a +
            "."
        );
      }
      if (
        !$scope.rows[i].year4_current_value &&
        !$scope.rows[i].year4_v1_value_prelim
      ) {
        issue_list.push(
          "Missing draft value for " +
            $scope.rows[i].country +
            " in " +
            y4a +
            "."
        );
      }
      if (
        !$scope.rows[i].year5_current_value &&
        !$scope.rows[i].year5_v1_value_prelim
      ) {
        issue_list.push(
          "Missing draft value for " +
            $scope.rows[i].country +
            " in " +
            y5a +
            "."
        );
      }
      if ($scope.rows[i].year1_v1_value_prelim != "") {
        if (!$scope.rows[i].year1_v1_source_prelim) {
          issue_list.push(
            "Missing source for " + $scope.rows[i].country + " in " + y1a + "."
          );
        }
        if (
          !(
            $scope.rows[i].year1_v1_value_prelim === "NA" ||
            $scope.rows[i].year1_v1_value_prelim === "W" ||
            parseInt($scope.rows[i].year1_v1_value_prelim) >= 0
          )
        ) {
          issue_list.push(
            "Invalid draft value for " +
              $scope.rows[i].country +
              " in " +
              y1a +
              ". Must either be a number, W, or NA."
          );
        }
      } else if ($scope.rows[i].year1_v1_source_prelim) {
        issue_list.push(
          "Missing svalue for " + $scope.rows[i].country + " in " + y1a + "."
        );
      }

      if ($scope.rows[i].year2_v1_value_prelim != "") {
        if (!$scope.rows[i].year2_v1_source_prelim) {
          issue_list.push(
            "Missing source for " + $scope.rows[i].country + " in" + y2a + "."
          );
        }
        if (
          !(
            $scope.rows[i].year2_v1_value_prelim === "NA" ||
            $scope.rows[i].year2_v1_value_prelim === "W" ||
            parseInt($scope.rows[i].year2_v1_value_prelim) >= 0
          )
        ) {
          issue_list.push(
            "Invalid draft value for " +
              $scope.rows[i].country +
              " in " +
              y2a +
              ". Must either be a number, W, or NA."
          );
        }
      } else if ($scope.rows[i].year2_v1_source_prelim) {
        issue_list.push(
          "Missing svalue for " + $scope.rows[i].country + " in " + y2a + "."
        );
      }

      if ($scope.rows[i].year3_v1_value_prelim != "") {
        if (!$scope.rows[i].year3_v1_source_prelim) {
          issue_list.push(
            "Missing source for " + $scope.rows[i].country + " in " + y3a + "."
          );
        }
        if (
          !(
            $scope.rows[i].year3_v1_value_prelim === "NA" ||
            $scope.rows[i].year3_v1_value_prelim === "W" ||
            parseInt($scope.rows[i].year3_v1_value_prelim) >= 0
          )
        ) {
          issue_list.push(
            "Invalid draft value for " +
              $scope.rows[i].country +
              " in " +
              y3a +
              ". Must either be a number, W, or NA."
          );
        }
      } else if ($scope.rows[i].year3_v1_source_prelim) {
        issue_list.push(
          "Missing svalue for " + $scope.rows[i].country + " in " + y3a + "."
        );
      }

      if ($scope.rows[i].year4_v1_value_prelim != "") {
        if (!$scope.rows[i].year4_v1_source_prelim) {
          issue_list.push(
            "Missing source for " + $scope.rows[i].country + " in " + y4a + "."
          );
        }
        if (
          !(
            $scope.rows[i].year4_v1_value_prelim === "NA" ||
            $scope.rows[i].year4_v1_value_prelim === "W" ||
            parseInt($scope.rows[i].year4_v1_value_prelim) >= 0
          )
        ) {
          issue_list.push(
            "Invalid draft value for " +
              $scope.rows[i].country +
              " in " +
              y4a +
              ". Must either be a number, W, or NA."
          );
        }
      } else if ($scope.rows[i].year4_v1_source_prelim) {
        issue_list.push(
          "Missing svalue for " + $scope.rows[i].country + " in " + y4a + "."
        );
      }

      if ($scope.rows[i].year5_v1_value_prelim != "") {
        if (!$scope.rows[i].year5_v1_source_prelim) {
          issue_list.push(
            "Missing source for " + $scope.rows[i].country + " in " + y5a + "."
          );
        }
        if (
          !(
            $scope.rows[i].year5_v1_value_prelim === "NA" ||
            $scope.rows[i].year5_v1_value_prelim === "W" ||
            parseInt($scope.rows[i].year5_v1_value_prelim) >= 0
          )
        ) {
          issue_list.push(
            "Invalid draft value for " +
              $scope.rows[i].country +
              " in " +
              y5a +
              ". Must either be a number, W, or NA."
          );
        }
      } else if ($scope.rows[i].year5_v1_source_prelim) {
        issue_list.push(
          "Missing svalue for " + $scope.rows[i].country + " in " + y5a + "."
        );
      }
    }
    if (issue_list.length > 0) {
      console.log(issue_list);
      return issue_list;
    }
    return 0;
  };
});

function onSuccessSetup(value, $scope) {
  $scope.commodities = value[0];
  $scope.countries = value[1];

  //console.log($scope.commodities);
  $scope.$apply();

  //                    var list = document.getElementById('filterOn');
  //while(list.firstChild){
  //    list.removeChild(list.firstChild);
  //}
  //commodities.forEach(function(item){
  //   var option = document.createElement('option');
  //   var text = document.createTextNode(item);
  //   option.appendChild(text);
  //   list.appendChild(option);
  //});
  //    }
}
function onSuccessHeaders(newlist, $scope) {
  list = newlist;
  $scope.header = list;
  $scope.$apply();
}
function onSuccessAdmin(newadmin, $scope) {
  admin = newadmin;
  $scope.admin = admin;
  $scope.$apply();
}
function onSuccessData(newlist, $scope) {
  list = newlist;
  $scope.rows = list;
  $scope.originalRows = JSON.parse(JSON.stringify(list));
  //console.log(originalRows);

  $scope.footnotes = getFootnotes(list, $scope);
  $scope.getArray = $scope.rows.concat([$scope.footnotes]);

  $scope.$apply();
}
function onSuccessDRR($scope) {
  console.log("it worked???");
}
function onSuccessRow($scope) {
  $scope.saveNotice();
}
function onSuccessMetadata(table, $scope) {
  $scope.table = table;
  //console.log($scope.table)
  $scope.$apply();

  $scope.stub_fn_1 = table.stub_fn_1;
  $scope.stub_fn_2 = table.stub_fn_2;
  $scope.title_fn = table.title_fn;
  $scope.total_fn = table.total_fn;
}
function onSuccessDraft($scope) {
  $("#reconcilefinalModal").modal();

  //MODAL HERE
}
function onSuccessDraftB($scope) {
  $("#savefinalModal").modal();

  //MODAL HERE
}
function onFailureDraft($scope) {
  $("#reconcilefaillModal").modal();

  //MODAL HERE
}
function onFailSubmit($scope) {
  $("#reconcilefaillModal").modal();
}
classificationModule.filter("kg_ton", function() {
  return function(input, info) {
    if (isNaN(input) || input < 1) {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return input;
    } else if (
      info.row.unit.toUpperCase() === "KILOGRAMS" &&
      info.table.unit.toUpperCase() === "METRIC TONS"
    ) {
      return Math.round((input * 1.0) / 1000);
    } else if (
      info.table.unit.toUpperCase() === "KILOGRAMS" &&
      info.row.unit.toUpperCase() === "METRIC TONS"
    ) {
      return input * 1000;
    } else return input;
  };
});
classificationModule.filter("number_num", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, num) {
    if (isNaN(num) || num < 1) {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return num;
      //  console.log(input)
    } else {
      return input;
    }
  };
});
classificationModule.filter("number_num2", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, num) {
    if (isNaN(num) || num === "") {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return num;
      //  console.log(input)
    } else if (input == 0) {
      return "--";
    } else {
      return input;
    }
  };
});
// Setup the filter
classificationModule.filter("table_unit", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, thousands) {
    if (isNaN(input) || input < 1 || thousands !== "Thousand") {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return input;
      //console.log(input)
    } else {
      return Math.round((input * 1.0) / 1000);
    }
  };
});

// Setup the filter
classificationModule.filter("interlace", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, draft) {
    if (draft === "") {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return input;
    } else {
      return draft;
    }
  };
});
classificationModule.filter("prod", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, thousands) {
    if (input == "Production") {
      return "";
    } else {
      return input;
    }
  };
});
classificationModule.filter("comma", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, next) {
    if (!input) {
      input = "";
    }
    if (!next) {
      next = "";
    }

    if (notWhiteSpace(input) && notWhiteSpace(next)) {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return input + ", " + next;
    } else {
      return input + next;
    }
  };
});
classificationModule.filter("startcomma", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, next) {
    if (!input) {
      input = "";
    }
    if (!next) {
      next = "";
    }

    if (notWhiteSpace(input) && notWhiteSpace(next)) {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return ", " + next;
    } else {
      return next;
    }
  };
});

classificationModule.filter("space", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input) {
    if (input) {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return input + " ";
    } else {
      return "";
    }
  };
});

classificationModule.filter("hide_if_same", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, table_unit) {
    if (input.toUpperCase() === table_unit.toUpperCase()) {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return "";
    } else {
      return input;
    }
  };
});
classificationModule.filter("footnoted", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, other_notes) {
    output = "";

    if (other_notes.revised) {
      output += "r";
    }
    if (
      other_notes.estimated &&
      !(
        ((other_notes.row.year1_current_e &&
          !other_notes.row.year1_v1_value_prelim) ||
          (other_notes.row.year1_v1_e_prelim &&
            other_notes.row.year1_v1_value_prelim)) &&
        ((other_notes.row.year2_current_e &&
          !other_notes.row.year2_v1_value_prelim) ||
          (other_notes.row.year2_v1_e_prelim &&
            other_notes.row.year2_v1_value_prelim)) &&
        ((other_notes.row.year3_current_e &&
          !other_notes.row.year3_v1_value_prelim) ||
          (other_notes.row.year3_v1_e_prelim &&
            other_notes.row.year3_v1_value_prelim)) &&
        ((other_notes.row.year4_current_e &&
          !other_notes.row.year4_v1_value_prelim) ||
          (other_notes.row.year4_v1_e_prelim &&
            other_notes.row.year4_v1_value_prelim)) &&
        ((other_notes.row.year5_current_e &&
          !other_notes.row.year5_v1_value_prelim) ||
          (other_notes.row.year5_v1_e_prelim &&
            other_notes.row.year5_v1_value_prelim))
      )
    ) {
      if (output) {
        output += ", ";
      }
      output += "e";
    }
    if (input) {
      if (output) {
        output += ", ";
      }
      output += input;
    }

    if (other_notes) {
      if (other_notes.number) {
        output += ", ";
      }
      output += other_notes.number;
    }

    return output;
  };
});

classificationModule.filter("hide_if_excluded", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, exclude) {
    if (!input) {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return "";
    } else if (exclude) {
      return "";
    } else return input;
  };
});
classificationModule.filter("stringToDate", function($filter) {
  return function(ele, dateFormat) {
    if (ele) {
      return $filter("date")(new Date(ele), dateFormat);
    }
    return ele;
  };
});

classificationModule.filter("prodfilter", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, table) {
    var returnval = "";

    if (!input) {
      return ""; //fail case for if filer was used incorrectly
    } else {
      returnval = returnval + input.country;
      if (table.display_type == "X" && input.type) {
        returnval = returnval + ", " + input.type;
      }
      if (table.display_phase == "X" && input.phase) {
        returnval = returnval + ", " + input.phase;
      }
      if (table.display_measure == "X" && input.measure_content) {
        returnval = returnval + ", " + input.measure_content;
      }
      if (table.display_form == "X" && input.form) {
        returnval = returnval + ", " + input.form;
      }
      if (table.display_subform == "X" && input.subform) {
        returnval = returnval + ", " + input.subform;
      }
      if (table.display_description == "X" && input.commodity_description) {
        returnval = returnval + ", " + input.commodity_description;
      }
      return returnval;
    }
  };
});

classificationModule.filter("titlefilter", function() {
  // Create the return function and set the required parameter name to *input*
  return function(input) {
    var returnval = "";

    if (!input) {
      return "WELCOME TO ONEWORLD"; //fail case for if filter was used incorrectly
    } else {
      if (input.title == "") {
        returnval = returnval + "WELCOME TO ONEWORLD";
      }
      if (input.title != "") {
        returnval = input.title;
      }
      return returnval;
    }
  };
});
classificationModule.filter("fnilter", function() {
  // Create the return function and set the required parameter name to *input*
  return function(input, value) {
    var returnval = "";

    if (!input) {
      return ""; //fail case for if filter was used incorrectly
    } else {
      if (input.title == "") {
        returnval = returnval;
      }
      if (input.title != "") {
        returnval = value;
      }
      return returnval;
    }
  };
});

$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

classificationModule.filter("cell_fn", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input) {
    var returnval;
    if (
      input.year3_current_e &&
      input.year3_current_e &&
      input.year3_current_e &&
      input.year3_current_e &&
      input.year3_current_e
    ) {
      returnval = "";
    } else returnval = "e";
  };
});

classificationModule.filter("stub_fn", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, footnotes) {
    var returnval = "";

    if (!input) {
      return ""; //fail case for if filer was used incorrectly
    } else {
      var fn_1 = footnotes.indexOf(input.FOOTNOTE_VOLUME_3A) + 1;
      var fn_2 = footnotes.indexOf(input.FOOTNOTE_VOLUME_3B) + 1;

      if (fn_1 > 0) {
        returnval = returnval + fn_1;
      }
      if (fn_2 > 0) {
        returnval = returnval + ", " + fn_2;
      }

      if (returnval != "") {
        return "[" + returnval + "]";
      } else return "";
    }
  };
});

classificationModule.filter("row_fn", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, footnotes) {
    var returnval = "";

    if (!input) {
      return ""; //fail case for if filer was used incorrectly
    } else {
      var fn_1 = footnotes.indexOf(input.FOOTNOTE_VOLUME_1A) + 1;
      var fn_2 = footnotes.indexOf(input.FOOTNOTE_VOLUME_1B) + 1;

      if (
        ((input.year1_current_e && !input.year1_v1_value_prelim) ||
          (input.year1_v1_e_prelim && input.year1_v1_value_prelim)) &&
        ((input.year2_current_e && !input.year2_v1_value_prelim) ||
          (input.year2_v1_e_prelim && input.year2_v1_value_prelim)) &&
        ((input.year3_current_e && !input.year3_v1_value_prelim) ||
          (input.year3_v1_e_prelim && input.year3_v1_value_prelim)) &&
        ((input.year4_current_e && !input.year4_v1_value_prelim) ||
          (input.year4_v1_e_prelim && input.year4_v1_value_prelim)) &&
        ((input.year5_current_e && !input.year5_v1_value_prelim) ||
          (input.year5_v1_e_prelim && input.year5_v1_value_prelim))
      ) {
        returnval = "e";
      }

      if (fn_1 > 0) {
        if (returnval) {
          returnval = returnval + ", ";
        }
        returnval = returnval + fn_1;
      }
      if (fn_2 > 0) {
        returnval = returnval + ", " + fn_2;
      }

      if (returnval != "") {
        return "[" + returnval + "]";
      } else return "";
    }
  };
});

function getFootnotes(list, $scope) {
  var i;
  var date = new Date();
  var options = { year: "numeric", month: "long", day: "2-digit" };
  dateStamp = date.toLocaleString("en-US", options);
  var footnotes = [
    "Table includes data available through " +
      dateStamp +
      ". All data are reported unless otherwise noted. Totals and estimated data are rounded to three significant digits; may not add to totals shown."
  ];
  for (i = 0; i < list.length; i++) {
    if ($scope.title_fn && !footnotes.includes($scope.title_fn)) {
      footnotes.push($scope.title_fn);
    }
    if ($scope.stub_fn_1 && !footnotes.includes($scope.stub_fn_1)) {
      footnotes.push($scope.stub_fn_1);
    }
    if ($scope.stub_fn_2 && !footnotes.includes($scope.stub_fn_2)) {
      footnotes.push($scope.stub_fn_2);
    }

    if (list[i].country_fn && !footnotes.includes(list[i].country_fn)) {
      footnotes.push(list[i].country_fn);
    }
    if (
      list[i].FOOTNOTE_VOLUME_1A &&
      !footnotes.includes(list[i].FOOTNOTE_VOLUME_1A)
    ) {
      footnotes.push(list[i].FOOTNOTE_VOLUME_1A);
    }
    if (
      list[i].FOOTNOTE_VOLUME_1B &&
      !footnotes.includes(list[i].FOOTNOTE_VOLUME_1B)
    ) {
      footnotes.push(list[i].FOOTNOTE_VOLUME_1B);
    }
    if (
      list[i].year1_v1_footnote_1 &&
      !footnotes.includes(list[i].year1_v1_footnote_1)
    ) {
      footnotes.push(list[i].year1_v1_footnote_1);
    }
    if (
      list[i].year1_v1_footnote_2 &&
      !footnotes.includes(list[i].year1_v1_footnote_2)
    ) {
      footnotes.push(list[i].year1_v1_footnote_2);
    }

    if (
      list[i].year2_v1_footnote_1 &&
      !footnotes.includes(list[i].year2_v1_footnote_1)
    ) {
      footnotes.push(list[i].year2_v1_footnote_1);
    }
    if (
      list[i].year2_v1_footnote_2 &&
      !footnotes.includes(list[i].year2_v1_footnote_2)
    ) {
      footnotes.push(list[i].year2_v1_footnote_2);
    }

    if (
      list[i].year3_v1_footnote_1 &&
      !footnotes.includes(list[i].year3_v1_footnote_1)
    ) {
      footnotes.push(list[i].year3_v1_footnote_1);
    }
    if (
      list[i].year3_v1_footnote_2 &&
      !footnotes.includes(list[i].year3_v1_footnote_2)
    ) {
      footnotes.push(list[i].year3_v1_footnote_2);
    }

    if (
      list[i].year4_v1_footnote_1 &&
      !footnotes.includes(list[i].year4_v1_footnote_1)
    ) {
      footnotes.push(list[i].year4_v1_footnote_1);
    }
    if (
      list[i].year4_v1_footnote_2 &&
      !footnotes.includes(list[i].year4_v1_footnote_2)
    ) {
      footnotes.push(list[i].year4_v1_footnote_2);
    }

    if (
      list[i].year5_v1_footnote_1 &&
      !footnotes.includes(list[i].year5_v1_footnote_1)
    ) {
      footnotes.push(list[i].year5_v1_footnote_1);
    }
    if (
      list[i].year5_v1_footnote_2 &&
      !footnotes.includes(list[i].year5_v1_footnote_2)
    ) {
      footnotes.push(list[i].year5_v1_footnote_2);
    }

    if ($scope.total_fn && !footnotes.includes($scope.total_fn)) {
      footnotes.push($scope.total_fn);
    }
  }
  return footnotes;
}
function Row(
  country,
  commodity,
  type,
  phase,
  measure_production,
  measure_content,
  form,
  subform,
  unit,
  Commodity_Description,
  Country_Description,
  year1_v1_value_prelim,
  year1_v1_e_prelim,
  year1_v1_source_prelim,
  year1_v3_value_prelim,
  year1_v3_e_prelim,
  year1_v3_source_prelim,
  year1_current_value,
  year1_current_e,
  year1_current_source,
  year1_v1_prior_value,
  year1_v3_prior_value,
  year1_v1_footnote_1,
  year1_v1_footnote_2,
  year1,
  year2_v1_value_prelim,
  year2_v1_e_prelim,
  year2_v1_source_prelim,
  year2_v3_value_prelim,
  year2_v3_e_prelim,
  year2_v3_source_prelim,
  year2_current_value,
  year2_current_e,
  year2_current_source,
  year2_v1_prior_value,
  year2_v3_prior_value,
  year2_v1_footnote_1,
  year2_v1_footnote_2,
  year2,
  year3_v1_value_prelim,
  year3_v1_e_prelim,
  year3_v1_source_prelim,
  year3_v3_value_prelim,
  year3_v3_e_prelim,
  year3_v3_source_prelim,
  year3_current_value,
  year3_current_e,
  year3_current_source,
  year3_v1_prior_value,
  year3_v3_prior_value,
  year3_v1_footnote_1,
  year3_v1_footnote_2,
  year3,
  year4_v1_value_prelim,
  year4_v1_e_prelim,
  year4_v1_source_prelim,
  year4_v3_value_prelim,
  year4_v3_e_prelim,
  year4_v3_source_prelim,
  year4_current_value,
  year4_current_e,
  year4_current_source,
  year4_v1_prior_value,
  year4_v3_prior_value,
  year4_v1_footnote_1,
  year4_v1_footnote_2,
  year4,
  year5_v1_value_prelim,
  year5_v1_e_prelim,
  year5_v1_source_prelim,
  year5_v3_value_prelim,
  year5_v3_e_prelim,
  year5_v3_source_prelim,
  year5_current_value,
  year5_current_e,
  year5_current_source,
  year5_v1_prior_value,
  year5_v3_prior_value,
  year5_v1_footnote_1,
  year5_v1_footnote_2,
  year5
) {
  this.country = country;
  this.commodity = commodity;
  this.type = type;
  this.phase = phase;
  this.measure_production = measure_production;
  this.measure_content = measure_content;
  this.form = form;
  this.subform = subform;
  this.unit = unit;
  this.Commodity_Description = Commodity_Description;
  this.Country_Description = Country_Description;
  this.year1_v1_value_prelim = year1_v1_value_prelim;
  this.year1_v1_e_prelim = year1_v1_e_prelim;
  this.year1_v1_source_prelim = year1_v1_source_prelim;
  this.year1_v3_value_prelim = year1_v3_value_prelim;
  this.year1_v3_e_prelim = year1_v3_e_prelim;
  this.year1_v3_source_prelim = year1_v3_source_prelim;
  this.year1_current_value = year1_current_value;
  this.year1_current_e = year1_current_e;
  this.year1_current_source = year1_current_source;
  this.year1_v1_prior_value = year1_v1_prior_value;
  this.year1_v3_prior_value = year1_v3_prior_value;
  this.year1_v1_footnote_1 = year1_v1_footnote_1;
  this.year1_v1_footnote_2 = year1_v1_footnote_2;

  this.year1 = year1;

  this.year2_v1_value_prelim = year2_v1_value_prelim;
  this.year2_v1_e_prelim = year2_v1_e_prelim;
  this.year2_v1_source_prelim = year2_v1_source_prelim;
  this.year2_v3_value_prelim = year2_v3_value_prelim;
  this.year2_v3_e_prelim = year2_v3_e_prelim;
  this.year2_v3_source_prelim = year2_v3_source_prelim;
  this.year2_current_value = year2_current_value;
  this.year2_current_e = year2_current_e;
  this.year2_current_source = year2_current_source;
  this.year2_v1_prior_value = year2_v1_prior_value;
  this.year2_v3_prior_value = year2_v3_prior_value;
  this.year2_v1_footnote_1 = year2_v1_footnote_1;
  this.year2_v1_footnote_2 = year2_v1_footnote_2;

  this.year2 = year2;

  this.year3_v1_value_prelim = year3_v1_value_prelim;
  this.year3_v1_e_prelim = year3_v1_e_prelim;
  this.year3_v1_source_prelim = year3_v1_source_prelim;
  this.year3_v3_value_prelim = year3_v3_value_prelim;
  this.year3_v3_e_prelim = year3_v3_e_prelim;
  this.year3_v3_source_prelim = year3_v3_source_prelim;
  this.year3_current_value = year3_current_value;
  this.year3_current_e = year3_current_e;
  this.year3_current_source = year3_current_source;
  this.year3_v1_prior_value = year3_v1_prior_value;
  this.year3_v3_prior_value = year3_v3_prior_value;
  this.year3_v1_footnote_1 = year3_v1_footnote_1;
  this.year3_v1_footnote_2 = year3_v1_footnote_2;

  this.year3 = year3;

  this.year4_v1_value_prelim = year4_v1_value_prelim;
  this.year4_v1_e_prelim = year4_v1_e_prelim;
  this.year4_v1_source_prelim = year4_v1_source_prelim;
  this.year4_v3_value_prelim = year4_v3_value_prelim;
  this.year4_v3_e_prelim = year4_v3_e_prelim;
  this.year4_v3_source_prelim = year4_v3_source_prelim;
  this.year4_current_value = year4_current_value;
  this.year4_current_e = year4_current_e;
  this.year4_current_source = year4_current_source;
  this.year4_v1_prior_value = year4_v1_prior_value;
  this.year4_v3_prior_value = year4_v3_prior_value;
  this.year4_v1_footnote_1 = year4_v1_footnote_1;
  this.year4_v1_footnote_2 = year4_v1_footnote_2;

  this.year4 = year4;

  this.year5_v1_value_prelim = year5_v1_value_prelim;
  this.year5_v1_e_prelim = year5_v1_e_prelim;
  this.year5_v1_source_prelim = year5_v1_source_prelim;
  this.year5_v3_value_prelim = year5_v3_value_prelim;
  this.year5_v3_e_prelim = year5_v3_e_prelim;
  this.year5_v3_source_prelim = year5_v3_source_prelim;
  this.year5_current_value = year5_current_value;
  this.year5_current_e = year5_current_e;
  this.year5_current_source = year5_current_source;
  this.year5_v1_prior_value = year5_v1_prior_value;
  this.year5_v3_prior_value = year5_v3_prior_value;
  this.year5_v1_footnote_1 = year5_v1_footnote_1;
  this.year5_v1_footnote_2 = year5_v1_footnote_2;

  this.year5 = year5;
}
function notWhiteSpace(str) {
  return !(!str || str.length === 0 || /^\s*$/.test(str));
}
function rowEquals(row1, row2) {
  if (
    row1.country === row2.country &&
    row1.country_fn === row2.country_fn &&
    row1.year1 === row2.year1 &&
    row1.year1_fn === row2.year1_fn &&
    row1.year2 === row2.year2 &&
    row1.year2_fn === row2.year2_fn &&
    row1.year3 === row2.year3 &&
    row1.year3_fn === row2.year3_fn &&
    row1.year4 === row2.year4 &&
    row1.year4_fn === row2.year4_fn &&
    row1.year5 === row2.year5 &&
    row1.year5_fn === row2.year5_fn
  ) {
    return true;
  } else return false;
}
$(window).on("load", function() {
  $("#beginningModal").modal("show");
});
