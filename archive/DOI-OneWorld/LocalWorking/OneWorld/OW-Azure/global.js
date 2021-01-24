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
classificationModule.controller("firstcontroll", function($scope) {
  // google.script.run
  //   .withSuccessHandler(onSuccessSetup)
  //   .withUserObject($scope)
  //   .getUsableCols();

  // // $scope.text=list;

  // google.script.run
  //   .withSuccessHandler(onSuccessAdmin)
  //   .withUserObject($scope)
  //   .getAdmin();
  $scope.today = new Date();

  $scope.rows = [];

  $scope.getArray;
  $scope.years = [2015, 2016, 2017, 2018];
  $scope.year = 2017;

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
  $scope.totalY1 = function() {
    total = 0;
    for (i = 0; i < $scope.rows.length; i++) {
      var val = parseInt($scope.rows[i].year1);
      console.log(val);
      if (Object.is(val, NaN)) {
        val = 0;
      }
      total = total + val;
    }
    return total;
  };
  $scope.totalY2 = function() {
    total = 0;
    for (i = 0; i < $scope.rows.length; i++) {
      var val = parseInt($scope.rows[i].year2);
      if (Object.is(val, NaN)) {
        val = 0;
      }
      total = total + val;
    }
    return total;
  };
  $scope.totalY3 = function() {
    total = 0;
    for (i = 0; i < $scope.rows.length; i++) {
      var val = parseInt($scope.rows[i].year3);
      if (Object.is(val, NaN)) {
        val = 0;
      }
      total = total + val;
    }
    return total;
  };
  $scope.totalY4 = function() {
    total = 0;
    for (i = 0; i < $scope.rows.length; i++) {
      var val = parseInt($scope.rows[i].year4);
      if (Object.is(val, NaN)) {
        val = 0;
      }
      total = total + val;
    }
    return total;
  };
  $scope.totalY5 = function() {
    total = 0;
    for (i = 0; i < $scope.rows.length; i++) {
      var val = parseInt($scope.rows[i].year5);
      if (Object.is(val, NaN)) {
        val = 0;
      }
      total = total + val;
    }
    return total;
  };
  $("#exampleModal").on("hidden.bs.modal", function() {
    Object.assign($scope.row, $scope.row_revert);
    $scope.$apply();
  });
  $scope.submit = function() {
    //console.log("hope this is first")
    $scope.row_revert = $scope.row;
    $scope.footnotes = getFootnotes($scope.rows, $scope);
    // google.script.run
    //   .withSuccessHandler(onSuccessRow)
    //   .withUserObject($scope.row)
    //   .saveRow($scope.table_name, $scope.row, "g");
  };

  $scope.init = function() {
    $scope.rows = [];
    $scope.year = $scope.tmpYear;
    $("#loadModal").modal();
    // google.script.run
    //   .withSuccessHandler(onSuccessData)
    //   .withUserObject($scope)
    //   .getData($scope.table_name, $scope.year, "g");
    // google.script.run
    //   .withSuccessHandler(onSuccessMetadata)
    //   .withUserObject($scope)
    //   .getMetadata($scope.table_name, "g");
  };
  $scope.setup = function() {};
  $scope.restore = function() {
    // google.script.run
    //   .withSuccessHandler(onSuccessData)
    //   .withUserObject($scope)
    //   .getDataRestore($scope.table_name);
    // google.script.run
    //   .withSuccessHandler(onSuccessMetadata)
    //   .withUserObject($scope)
    //   .getMetadata($scope.table_name, "g");
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
  $scope.submit_drr = function() {
    // google.script.run.withSuccessHandler(onSuccessDRR).sendDataDrr($scope.drr);
  };

  $scope.submitData = function(draft) {
    console.log($scope.rows[0].year1_v1_value_prelim);
    console.log($scope.rows[0].year1);

    // google.script.run
    //   .withSuccessHandler(onSuccessDraftB)
    //   .sendDataDraft($scope.table_name, $scope.rows, $scope.table, "g");
  };
  $scope.submitFinalizeIDA = function() {
    console.log("finalizing" + $scope.table_name);
    // google.script.run.sendFinalize($scope.table_name, "g");
  };
  $scope.submitDataDraft = function() {
    {
      $scope.submitData(true);
    }
  };
  $scope.submitStructureFinal = function() {
    if ($scope.loaded_table) {
      // google.script.run.sendLayout($scope.loaded_table, $scope.table);
    }
  };
  $scope.commas_remove = function(row, year) {
    if ((year = 1)) {
      row.year1_v3_value_prelim = row.year1_v3_value_prelim.replace(
        /[^\dNAW]/g,
        ""
      );
    }
    if ((year = 2)) {
      row.year2_v3_value_prelim = row.year2_v3_value_prelim.replace(
        /[^\dNAW]/g,
        ""
      );
    }
    if ((year = 3)) {
      row.year3_v3_value_prelim = row.year3_v3_value_prelim.replace(
        /[^\dNAW]/g,
        ""
      );
    }
    if ((year = 4)) {
      row.year4_v3_value_prelim = row.year4_v3_value_prelim.replace(
        /[^\dNAW]/g,
        ""
      );
    }
    if ((year = 5)) {
      row.year5_v3_value_prelim = row.year5_v3_value_prelim.replace(
        /[^\dNAW]/g,
        ""
      );
    }
  };
  $scope.badchar_remove_obj = function(o) {
    o.str = o.str.replace(/[^\dNAW]/g, "");
  };
  $scope.submitDataFinal = function() {
    var result = $scope.verify();
    if (result == 0) {
      // google.script.run
      //   .withSuccessHandler(onSuccessDraft)
      //   .withFailureHandler(onFailSubmit)
      //   .sendDataReconcile($scope.table_name, $scope.rows, "g");
      //           $scope.submitData(false)
    } else {
      $scope.result = result;
      $("#validationModal").modal();
    }
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
  };
  $scope.verify = function() {
    var i;
    var issue_list = [];
    for (i = 0; i < $scope.rows.length; i++) {
      if (
        $scope.rows[i].year1_status === "MINERAL1" ||
        $scope.rows[i].year1_status === "MINERAL2" ||
        $scope.rows[i].year1_status === "GLOBAL1" ||
        $scope.rows[i].year1_status === "GLOBAL2" ||
        $scope.rows[i].year1_status === "SUPERVISOR"
      ) {
        issue_list.push("y1 in reconcile for " + $scope.rows[i].commodity);
      }
      if (
        $scope.rows[i].year2_status === "MINERAL1" ||
        $scope.rows[i].year2_status === "MINERAL2" ||
        $scope.rows[i].year2_status === "GLOBAL1" ||
        $scope.rows[i].year2_status === "GLOBAL2" ||
        $scope.rows[i].year2_status === "SUPERVISOR"
      ) {
        issue_list.push("y2 in reconcile for " + $scope.rows[i].commodity);
      }
      if (
        $scope.rows[i].year3_status === "MINERAL1" ||
        $scope.rows[i].year3_status === "MINERAL2" ||
        $scope.rows[i].year3_status === "GLOBAL1" ||
        $scope.rows[i].year3_status === "GLOBAL2" ||
        $scope.rows[i].year3_status === "SUPERVISOR"
      ) {
        issue_list.push("y3 in reconcile for " + $scope.rows[i].commodity);
      }
      if (
        $scope.rows[i].year4_status === "MINERAL1" ||
        $scope.rows[i].year4_status === "MINERAL2" ||
        $scope.rows[i].year4_status === "GLOBAL1" ||
        $scope.rows[i].year4_status === "GLOBAL2" ||
        $scope.rows[i].year4_status === "SUPERVISOR"
      ) {
        issue_list.push("y4 in reconcile for " + $scope.rows[i].commodity);
      }
      if (
        $scope.rows[i].year5_status === "MINERAL1" ||
        $scope.rows[i].year5_status === "MINERAL2" ||
        $scope.rows[i].year5_status === "GLOBAL1" ||
        $scope.rows[i].year5_status === "GLOBAL2" ||
        $scope.rows[i].year5_status === "SUPERVISOR"
      ) {
        issue_list.push("y5 in reconcile for " + $scope.rows[i].commodity);
      }
    }
    for (i = 0; i < $scope.rows.length; i++) {
      if (
        !$scope.rows[i].year1_current_value &&
        !$scope.rows[i].year1_v3_value_prelim
      ) {
        issue_list.push(
          "no current or prelim val y1 for " + $scope.rows[i].commodity
        );
      }

      if (
        !$scope.rows[i].year2_current_value &&
        !$scope.rows[i].year2_v3_value_prelim
      ) {
        issue_list.push(
          "no current or prelim val y2 for " + $scope.rows[i].commodity
        );
      }
      if (
        !$scope.rows[i].year3_current_value &&
        !$scope.rows[i].year3_v3_value_prelim
      ) {
        issue_list.push(
          "no current or prelim val y3 for " + $scope.rows[i].commodity
        );
      }
      if (
        !$scope.rows[i].year4_current_value &&
        !$scope.rows[i].year4_v3_value_prelim
      ) {
        issue_list.push(
          "no current or prelim val y4 for " + $scope.rows[i].commodity
        );
      }
      if (
        !$scope.rows[i].year5_current_value &&
        !$scope.rows[i].year5_v3_value_prelim
      ) {
        issue_list.push(
          "no current or prelim val y5 for " + $scope.rows[i].commodity
        );
      }
      if ($scope.rows[i].year1_v3_value_prelim != "") {
        if (!$scope.rows[i].year1_v3_source_prelim) {
          issue_list.push("missing src on y1 for " + $scope.rows[i].commodity);
        }
        if (
          !(
            $scope.rows[i].year1_v3_value_prelim === "NA" ||
            $scope.rows[i].year1_v3_value_prelim === "W" ||
            parseInt($scope.rows[i].year1_v3_value_prelim) >= 0
          )
        ) {
          issue_list.push(
            "invalid prelim val on y1 for " + $scope.rows[i].commodity
          );
        }
      } else if ($scope.rows[i].year1_v3_source_prelim) {
        issue_list.push("missing val on y1 for " + $scope.rows[i].commodity);
      }

      if ($scope.rows[i].year2_v3_value_prelim != "") {
        if (!$scope.rows[i].year2_v3_source_prelim) {
          issue_list.push("missing src on y2 for " + $scope.rows[i].commodity);
        }
        if (
          !(
            $scope.rows[i].year2_v3_value_prelim === "NA" ||
            $scope.rows[i].year2_v3_value_prelim === "W" ||
            parseInt($scope.rows[i].year2_v3_value_prelim) >= 0
          )
        ) {
          issue_list.push(
            "invalid prelim val on y2 for " + $scope.rows[i].commodity
          );
        }
      } else if ($scope.rows[i].year2_v3_source_prelim) {
        issue_list.push("missing val on y2 for " + $scope.rows[i].commodity);
      }

      if ($scope.rows[i].year3_v3_value_prelim != "") {
        if (!$scope.rows[i].year3_v3_source_prelim) {
          issue_list.push("missing src on y3 for " + $scope.rows[i].commodity);
        }
        if (
          !(
            $scope.rows[i].year3_v3_value_prelim === "NA" ||
            $scope.rows[i].year3_v3_value_prelim === "W" ||
            parseInt($scope.rows[i].year3_v3_value_prelim) >= 0
          )
        ) {
          issue_list.push("invalid prelim val on y3 for " + i);
        }
      } else if ($scope.rows[i].year3_v3_source_prelim) {
        issue_list.push("missing val on y3 for " + $scope.rows[i].commodity);
      }

      if ($scope.rows[i].year4_v3_value_prelim != "") {
        if (!$scope.rows[i].year4_v3_source_prelim) {
          issue_list.push("missing src on y4 for " + $scope.rows[i].commodity);
        }
        if (
          !(
            $scope.rows[i].year4_v3_value_prelim === "NA" ||
            $scope.rows[i].year4_v3_value_prelim === "W" ||
            parseInt($scope.rows[i].year4_v3_value_prelim) >= 0
          )
        ) {
          issue_list.push(
            "invalid prelim val on y4 for " + $scope.rows[i].commodity
          );
        }
      } else if ($scope.rows[i].year4_v3_source_prelim) {
        issue_list.push("missing val on y4 for " + $scope.rows[i].commodity);
      }

      if ($scope.rows[i].year5_v3_value_prelim != "") {
        if (!$scope.rows[i].year5_v3_source_prelim) {
          issue_list.push("missing src on y5 for " + $scope.rows[i].commodity);
        }
        if (
          !(
            $scope.rows[i].year5_v3_value_prelim === "NA" ||
            $scope.rows[i].year5_v3_value_prelim === "W" ||
            parseInt($scope.rows[i].year5_v3_value_prelim) >= 0
          )
        ) {
          issue_list.push(
            "invalid prelim val on y5 for " + $scope.rows[i].commodity
          );
        }
      } else if ($scope.rows[i].year5_v3_source_prelim) {
        issue_list.push("missing val on y5 for " + $scope.rows[i].commodity);
      }
    }
    if (issue_list.length > 0) {
      console.log(issue_list);
      return issue_list;
    }
    return 0;
  };
});

function onSuccessDRR($scope) {
  console.log("it worked???");
}

function onSuccessSetup(value, $scope) {
  $scope.commodities = value[0];
  $scope.countries = value[1];
  $scope.$apply();
}
function onSuccessRow(row) {}

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
  $scope.loaded_table = $scope.table_name;
  list = newlist;
  $scope.rows = list;
  console.log($scope.rows);
  $scope.originalRows = JSON.parse(JSON.stringify(list));

  $scope.footnotes = getFootnotes(list, $scope);
  $scope.getArray = $scope.rows.concat([$scope.footnotes]);
  $scope.loading = false;

  $scope.$apply();
}
function onSuccessMetadata(table, $scope) {
  $scope.table = table;
  console.log($scope.table);
  $scope.$apply();

  $scope.stub_fn_1 = table.stub_fn_1;
  $scope.stub_fn_2 = table.stub_fn_2;
  $scope.title_fn = table.title_fn;
  $scope.total_fn = table.total_fn;
}
function onSuccessDraft($scope) {}
function onFailSubmit($scope) {
  $("#reconcilefaillModal").modal();
}

function onSuccessDraftB($scope) {
  $("#savefinalModal").modal();

  //MODAL HERE
}
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
    if (isNaN(num)) {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return num;
      //  console.log(input)
    } else if (num == 0) {
      return "--";
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
classificationModule.filter("kg_ton", function() {
  return function(input, info) {
    if (isNaN(input) || input < 1) {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return input;
    } else if (
      info.row.unit == "Kilograms" &&
      info.table.unit == "Metric tons"
    ) {
      return Math.round((input * 1.0) / 1000);
    } else if (
      info.table.unit == "Kilograms" &&
      info.row.unit == "Metric tons"
    ) {
      return input * 1000;
    } else return input;
  };
});
// Setup the filter
classificationModule.filter("table_unit", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, thousands) {
    if (isNaN(input) || input < 1 || thousands !== "Thousand") {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return input;
      console.log(input);
    } else {
      return Math.round((input * 1.0) / 1000);
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
    if (!input || !table_unit) {
      return input;
    }
    if (input.toUpperCase() === table_unit.toUpperCase()) {
      // If the data is not a number or is less than one (thus not having a cardinal value) return it unmodified.
      return "";
    } else {
      return input;
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
classificationModule.filter("footnoted", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input, other_notes) {
    output = "";
    if (input) {
      output += input;
    }

    if (other_notes) {
      if (other_notes.revised) {
        if (output) {
          output += ", ";
        }
        output += "r";
      }
      if (
        other_notes.estimated &&
        !(
          other_notes.row.year1_current_e &&
          other_notes.row.year2_current_e &&
          other_notes.row.year3_current_e &&
          other_notes.row.year4_current_e &&
          other_notes.row.year5_current_e
        )
      ) {
        if (output) {
          output += ", ";
        }
        output += "e";
      }
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
      returnval = returnval + input.commodity;
      if (input.type != "Production") {
        returnval = returnval + ", " + input.type;
      }
      if (input.phase != "") {
        returnval = returnval + ", " + input.phase;
      }
      if (input.form != "") {
        returnval = returnval + ", " + input.form;
      }
      if (input.subform != "") {
        returnval = returnval + ", " + input.subform;
      }
      if (input.measure_content != "gross weight") {
        returnval = returnval + ", " + input.measure_content;
      }
      if (input.Country_Description != "") {
        returnval = returnval + ", " + input.Country_Description;
      }
      if (table.country_group !== "") {
        returnval = input.country + ", " + returnval;
      }

      return returnval;
    }
  };
});

classificationModule.filter("unitfilter", function() {
  // Create the return function and set the required parameter name to **input**
  return function(input) {
    var returnval = "";

    if (!input) {
      return ""; //fail case for if filer was used incorrectly
    } else {
      if (input.unit_short == "t" && input.multiplier == "thousand") {
        returnval = returnval + "(Kt)";
      }
      if (input.unit_short == "t" && input.multiplier == "million") {
        returnval = returnval + "(Mt)";
      }
      if (
        input.unit_short == "m3" &&
        input.multiplier != "thousand" &&
        input.multiplier != "million"
      ) {
        returnval = returnval + "(m³)";
      }
      if (input.unit_short == "m3" && input.multiplier == "thousand") {
        returnval = returnval + "(K-m³)";
      }
      if (input.unit_short == "m3" && input.multiplier == "million") {
        returnval = returnval + "(M-m³)";
      }
      if (
        input.unit_short == "ct" &&
        input.multiplier != "thousand" &&
        input.multiplier != "million"
      ) {
        returnval = returnval + "(ct)";
      }
      if (input.unit_short == "ct" && input.multiplier == "thousand") {
        returnval = returnval + "(K-ct)";
      }
      if (input.unit_short == "ct" && input.multiplier == "million") {
        returnval = returnval + "(M-ct)";
      }
      if (input.unit_short == "bbl" && input.multiplier == "thousand") {
        returnval = returnval + "(K-bbl)";
      }
      if (input.unit_short == "bbl" && input.multiplier == "million") {
        returnval = returnval + "(M-bbl)";
      }
      if (
        input.unit_short == "bbl" &&
        input.multiplier != "thousand" &&
        input.multiplier != "million"
      ) {
        returnval = returnval + "(bbl)";
      }
      if (input.unit_short == "kg") {
        returnval = returnval + "(kg)";
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
        returnval = returnval + "Welcome to OneWorld";
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
  return function(input, footnotes) {
    var returnval = "";

    if (!input) {
      return ""; //fail case for if filer was used incorrectly
    } else {
      var fn_1 = footnotes.indexOf(input.FOOTNOTE_VOLUME_3A) + 1 + " ";
      var fn_2 = footnotes.indexOf(input.FOOTNOTE_VOLUME_3B) + 1;

      if (fn_1 > 0) {
        returnval = returnval + fn_1;
      }
      if (fn_2 > 0) {
        returnval = returnval + fn_2;
      }

      return returnval;
    }
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
      var fn_1 = footnotes.indexOf(input.FOOTNOTE_VOLUME_3A) + 1;
      var fn_2 = footnotes.indexOf(input.FOOTNOTE_VOLUME_3B) + 1;
      if (
        input.year1_current_e &&
        input.year2_current_e &&
        input.year3_current_e &&
        input.year4_current_e &&
        input.year5_current_e
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

  if ($scope.stub_fn_1 && !footnotes.includes($scope.stub_fn_1)) {
    footnotes.push($scope.stub_fn_1);
  }
  if ($scope.stub_fn_2 && !footnotes.includes($scope.stub_fn_2)) {
    footnotes.push($scope.stub_fn_2);
  }
  if ($scope.title_fn && !footnotes.includes($scope.title_fn)) {
    footnotes.push($scope.title_fn);
  }

  for (i = 0; i < list.length; i++) {
    if (
      list[i].industry &&
      list[i].industry.toUpperCase() === "Metals".toUpperCase()
    ) {
      if (list[i].country_fn && !footnotes.includes(list[i].country_fn)) {
        footnotes.push(list[i].country_fn);
      }
      if (
        list[i].FOOTNOTE_VOLUME_3A &&
        !footnotes.includes(list[i].FOOTNOTE_VOLUME_3A)
      ) {
        footnotes.push(list[i].FOOTNOTE_VOLUME_3A);
      }
      if (
        list[i].FOOTNOTE_VOLUME_3B &&
        !footnotes.includes(list[i].FOOTNOTE_VOLUME_3B)
      ) {
        footnotes.push(list[i].FOOTNOTE_VOLUME_3B);
      }
      if (
        list[i].year1_v3_footnote_1 &&
        !footnotes.includes(list[i].year1_v3_footnote_1)
      ) {
        footnotes.push(list[i].year1_v3_footnote_1);
      }
      if (
        list[i].year1_v3_footnote_2 &&
        !footnotes.includes(list[i].year1_v3_footnote_2)
      ) {
        footnotes.push(list[i].year1_v3_footnote_2);
      }

      if (
        list[i].year2_v3_footnote_1 &&
        !footnotes.includes(list[i].year2_v3_footnote_1)
      ) {
        footnotes.push(list[i].year2_v3_footnote_1);
      }
      if (
        list[i].year2_v3_footnote_2 &&
        !footnotes.includes(list[i].year2_v3_footnote_2)
      ) {
        footnotes.push(list[i].year2_v3_footnote_2);
      }

      if (
        list[i].year3_v3_footnote_1 &&
        !footnotes.includes(list[i].year3_v3_footnote_1)
      ) {
        footnotes.push(list[i].year3_v3_footnote_1);
      }
      if (
        list[i].year3_v3_footnote_2 &&
        !footnotes.includes(list[i].year3_v3_footnote_2)
      ) {
        footnotes.push(list[i].year3_v3_footnote_2);
      }

      if (
        list[i].year4_v3_footnote_1 &&
        !footnotes.includes(list[i].year4_v3_footnote_1)
      ) {
        footnotes.push(list[i].year4_v3_footnote_1);
      }
      if (
        list[i].year4_v3_footnote_2 &&
        !footnotes.includes(list[i].year4_v3_footnote_2)
      ) {
        footnotes.push(list[i].year4_v3_footnote_2);
      }

      if (
        list[i].year5_v3_footnote_1 &&
        !footnotes.includes(list[i].year5_v3_footnote_1)
      ) {
        footnotes.push(list[i].year5_v3_footnote_1);
      }
      if (
        list[i].year5_v3_footnote_2 &&
        !footnotes.includes(list[i].year5_v3_footnote_2)
      ) {
        footnotes.push(list[i].year5_v3_footnote_2);
      }
    }
  }
  for (i = 0; i < list.length; i++) {
    if (
      list[i].industry &&
      list[i].industry.toUpperCase() === "Industrial Minerals".toUpperCase()
    ) {
      if (list[i].country_fn && !footnotes.includes(list[i].country_fn)) {
        footnotes.push(list[i].country_fn);
      }
      if (
        list[i].FOOTNOTE_VOLUME_3A &&
        !footnotes.includes(list[i].FOOTNOTE_VOLUME_3A)
      ) {
        footnotes.push(list[i].FOOTNOTE_VOLUME_3A);
      }
      if (
        list[i].FOOTNOTE_VOLUME_3B &&
        !footnotes.includes(list[i].FOOTNOTE_VOLUME_3B)
      ) {
        footnotes.push(list[i].FOOTNOTE_VOLUME_3B);
      }
      if (
        list[i].year1_v3_footnote_1 &&
        !footnotes.includes(list[i].year1_v3_footnote_1)
      ) {
        footnotes.push(list[i].year1_v3_footnote_1);
      }
      if (
        list[i].year1_v3_footnote_2 &&
        !footnotes.includes(list[i].year1_v3_footnote_2)
      ) {
        footnotes.push(list[i].year1_v3_footnote_2);
      }

      if (
        list[i].year2_v3_footnote_1 &&
        !footnotes.includes(list[i].year2_v3_footnote_1)
      ) {
        footnotes.push(list[i].year2_v3_footnote_1);
      }
      if (
        list[i].year2_v3_footnote_2 &&
        !footnotes.includes(list[i].year2_v3_footnote_2)
      ) {
        footnotes.push(list[i].year2_v3_footnote_2);
      }

      if (
        list[i].year3_v3_footnote_1 &&
        !footnotes.includes(list[i].year3_v3_footnote_1)
      ) {
        footnotes.push(list[i].year3_v3_footnote_1);
      }
      if (
        list[i].year3_v3_footnote_2 &&
        !footnotes.includes(list[i].year3_v3_footnote_2)
      ) {
        footnotes.push(list[i].year3_v3_footnote_2);
      }

      if (
        list[i].year4_v3_footnote_1 &&
        !footnotes.includes(list[i].year4_v3_footnote_1)
      ) {
        footnotes.push(list[i].year4_v3_footnote_1);
      }
      if (
        list[i].year4_v3_footnote_2 &&
        !footnotes.includes(list[i].year4_v3_footnote_2)
      ) {
        footnotes.push(list[i].year4_v3_footnote_2);
      }

      if (
        list[i].year5_v3_footnote_1 &&
        !footnotes.includes(list[i].year5_v3_footnote_1)
      ) {
        footnotes.push(list[i].year5_v3_footnote_1);
      }
      if (
        list[i].year5_v3_footnote_2 &&
        !footnotes.includes(list[i].year5_v3_footnote_2)
      ) {
        footnotes.push(list[i].year5_v3_footnote_2);
      }
    }
  }
  for (i = 0; i < list.length; i++) {
    if (
      list[i].industry &&
      list[i].industry.toUpperCase() ===
        "Mineral fuels and related materials".toUpperCase()
    ) {
      if (list[i].country_fn && !footnotes.includes(list[i].country_fn)) {
        footnotes.push(list[i].country_fn);
      }
      if (
        list[i].FOOTNOTE_VOLUME_3A &&
        !footnotes.includes(list[i].FOOTNOTE_VOLUME_3A)
      ) {
        footnotes.push(list[i].FOOTNOTE_VOLUME_3A);
      }
      if (
        list[i].FOOTNOTE_VOLUME_3B &&
        !footnotes.includes(list[i].FOOTNOTE_VOLUME_3B)
      ) {
        footnotes.push(list[i].FOOTNOTE_VOLUME_3B);
      }
      if (
        list[i].year1_v3_footnote_1 &&
        !footnotes.includes(list[i].year1_v3_footnote_1)
      ) {
        footnotes.push(list[i].year1_v3_footnote_1);
      }
      if (
        list[i].year1_v3_footnote_2 &&
        !footnotes.includes(list[i].year1_v3_footnote_2)
      ) {
        footnotes.push(list[i].year1_v3_footnote_2);
      }

      if (
        list[i].year2_v3_footnote_1 &&
        !footnotes.includes(list[i].year2_v3_footnote_1)
      ) {
        footnotes.push(list[i].year2_v3_footnote_1);
      }
      if (
        list[i].year2_v3_footnote_2 &&
        !footnotes.includes(list[i].year2_v3_footnote_2)
      ) {
        footnotes.push(list[i].year2_v3_footnote_2);
      }

      if (
        list[i].year3_v3_footnote_1 &&
        !footnotes.includes(list[i].year3_v3_footnote_1)
      ) {
        footnotes.push(list[i].year3_v3_footnote_1);
      }
      if (
        list[i].year3_v3_footnote_2 &&
        !footnotes.includes(list[i].year3_v3_footnote_2)
      ) {
        footnotes.push(list[i].year3_v3_footnote_2);
      }

      if (
        list[i].year4_v3_footnote_1 &&
        !footnotes.includes(list[i].year4_v3_footnote_1)
      ) {
        footnotes.push(list[i].year4_v3_footnote_1);
      }
      if (
        list[i].year4_v3_footnote_2 &&
        !footnotes.includes(list[i].year4_v3_footnote_2)
      ) {
        footnotes.push(list[i].year4_v3_footnote_2);
      }

      if (
        list[i].year5_v3_footnote_1 &&
        !footnotes.includes(list[i].year5_v3_footnote_1)
      ) {
        footnotes.push(list[i].year5_v3_footnote_1);
      }
      if (
        list[i].year5_v3_footnote_2 &&
        !footnotes.includes(list[i].year5_v3_footnote_2)
      ) {
        footnotes.push(list[i].year5_v3_footnote_2);
      }
    }
  }
  if ($scope.total_fn && !footnotes.includes($scope.total_fn)) {
    footnotes.push($scope.total_fn);
  }
  return footnotes;
}
function Row(
  country,
  country_fn,
  type,
  phase,
  measure_production,
  measure_content,
  form,
  unit,
  year1,
  year1_fn,
  year1_remarks,
  year1_e,
  year2,
  year2_fn,
  year2_remarks,
  year2_e,
  year3,
  year3_fn,
  year3_remarks,
  year3_e,
  year4,
  year4_fn,
  year4_remarks,
  year4_e,
  year5,
  year5_fn,
  year5_remarks,
  year5_e,
  id
) {
  this.country = country;
  this.country_fn = country_fn;
  this.type = type;
  this.phase = phase;
  this.measure_production = measure_production;
  this.measure_content = measure_content;
  this.form = form;
  this.unit = unit;
  this.year1 = year1;
  this.year1_fn = year1_fn;
  this.year1_remarks = year1_remarks;
  this.year1_e = year1_e ? true : false;
  this.year2 = year2;
  this.year2_fn = year2_fn;
  this.year2_remarks = year2_remarks;
  this.year2_e = year2_e ? true : false;

  this.year3 = year3;
  this.year3_fn = year3_fn;
  this.year3_remarks = year3_remarks;
  this.year3_e = year3_e ? true : false;

  this.year4 = year4;
  this.year4_fn = year4_fn;
  this.year4_remarks = year4_remarks;
  this.year4_e = year4_e ? true : false;

  this.year5 = year5;
  this.year5_fn = year5_fn;
  this.year5_remarks = year5_remarks;
  this.year5_e = year5_e ? true : false;

  this.id = id;
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
