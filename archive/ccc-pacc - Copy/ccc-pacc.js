/*
window.paccCtl.d.curriculumFacilitatorEMail = "jjones806@ccc.edu";
window.paccCtl.$apply()
*/


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

function paccCtl($scope) {
  var vm = $scope;
  window.paccCtl = vm;

  // Defaut data
  vm.listName = "PACC";
  vm.listNameEmail = "PACC-Mail";
  vm.listAudit = "PACC-Audit";

  // Choices
  vm.choiceFocus = "Advanced Manufacturing,Business & Professional Services,Construction Technology & Drafting,Culinary Arts & Hospitality,Education,Healthcare,Information Technology,Human Sciences (Liberal Arts),Natural Sciences,Transportation, Distribution & Logistics".split(',');
  vm.choiceICC = "Agriculture, Food & Natural Resources,Architecture & Construction; Arts,Arts, A/V Technology & Communications,Baccalaureate/Transfer and General Studies,Business Management & Administration,Education & Training,Health Science,Hospitality & Culinary,Human Services,Information Technology,Law, Public Safety, Corrections and Security,Manufacturing,Science, Technology, Engineering & Mathematics,Transportation, Distribution & Logistics".split(',');
  vm.choiceICCB = "1.1 Baccalaureate/Transfer Instruction,1.2 Occupational/Technical Instruction,1.4 Remedial Education".split(",");
  vm.choiceType = "New Course,Changes to Existing Course,New Program,Changes to Existing Program,New Pathway,Changes to an Existing Pathway,Sunset a Program,Other".split(",");
  vm.choiceCollege = "DA,HW,KK,MX,OH,TR,WR".split(",");
  vm.choiceCollegeSister = vm.choiceCollege;
  vm.choiceCollegeSister.push('Not offered at any sister college');
  vm.choiceProposal = "New Course,Revised Course,New Program,Revised Program".split(
    ","
  );
  vm.choiceStatusStep7 = "Pending,Sent to CS9 Support,Completed".split(",");
  vm.choiceYN = "Yes,No".split(",");

  // Staus
  vm.d = {
    maxstatus: 1,
    status: 1,
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
    step6: {},
    step7: {}
  };

  // Formatting
  vm.calcSemester = function () {
    // Jan Mar - Spring
    // Jun Jul - Summer
    // Aug Dec - Fall
    var today = new Date();
    var n = today.getMonth();
    var fy = today.getFullYear();
    fy++;
    switch (n) {
      case 0:
      case 1:
      case 2:
        return 'Spring ' + fy;
        break;
      case 5:
      case 6:
        return 'Summer ' + fy;
        break;
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
        return 'Fall ' + fy;
    }
  };

  // Navigation
  vm.next = function () {
    vm.d.status++;
    if (vm.d.status > 8) {
      vm.d.status = 8;
    }
  };
  vm.prev = function () {
    if (vm.d.status.length == 2) {
      vm.d.status = vm.d.status.substring(0, 1);
    }

    vm.d.status--;
    if (vm.d.status < 1) {
      vm.d.status = 1;
    }
  };
  vm.setStatus = function (x) {
    vm.d.status = x;
  };

  vm.save = function (sendMail) {
    // Setup
    console.log("save");
    vm.writeAudit('save');

    if (vm.id && vm.id != "undefined") {
      // FormStatusDate

      var obj = {
        Title: ".",
        JSON: angular.toJson(vm.d),
        FormStatus: vm.d.status.toString(),
        PACCTitle: vm.d.step1.pacctitle,
        College: vm.d.step1.selectCollege
      };

      // UPDATE if have ID
      $pnp.sp.web.lists
        .getByTitle(vm.listName)
        .items.getById(vm.id)
        .update(obj)
        .then(function (r) {
          // response
          console.log(r);
          // Popup
          if (r.item) {
            toastr.success("Form updated OK #" + vm.id);
          }

          // Email option
          if (vm.originalStatus != vm.d.status && sendMail) {
            $pnp.sp.web.lists
              .getByTitle(vm.listNameEmail)
              .items.add({
                Title: vm.d.status.toString(),
                ParentID: vm.id.toString()
              })
              .then(function (r) {
                // Mark original status
                vm.originalStatus = vm.d.status;
              });
          }
        });
    } else {
      // INSERT if missing
      vm.d.formStatus = "Open";

      $pnp.sp.web.lists
        .getByTitle(vm.listName)
        .items.add({
          Title: ".",
          JSON: angular.toJson(vm.d),
          FormStatus: vm.d.status.toString(),
          PACCTitle: vm.d.step1.pacctitle,
          College: vm.d.step1.selectCollege
        })
        .then(function (r) {
          // response
          console.log(r);
          document.location.href += "?id=" + r.data.Id;
          // Popup
          toastr.success("Form created OK #" + r.data.Id);
          vm.id = r.data.Id;

          // Email option
          if (vm.originalStatus != vm.d.status && sendMail) {
            $pnp.sp.web.lists
              .getByTitle(vm.listNameEmail)
              .items.add({
                Title: vm.d.status.toString(),
                ParentID: vm.id.toString()
              })
              .then(function (r) {
                // Mark original status
                vm.originalStatus = vm.d.status;
              });
          }
        });
    }
  };

  vm.navigate = function (status) {
    if (status <= vm.d.maxstatus) {
      vm.d.status = status;
      vm.$apply();
    }
  };

  vm.submit = function (status, sendMail, type) {
    // Approval Routing
    if (type) {
      vm.d.step1.type = type;
    }

    // Maximum stage
    if (status > vm.d.maxstatus) {
      vm.d.maxstatus = status;
    }
    vm.writeAudit('Submit to step:' + status + ', sendMail:' + sendMail);
    vm.d.status = status;

    // Save
    vm.save(sendMail);
    vm.$apply();
  };

  // View Folder
  vm.viewFolder = function () {
    window.open("/sites/PAC/automated/dev/Attach/" + vm.id, "_blank");
  };

  // Cancel button
  vm.cancel = function () {
    document.location.href = window._spPageContextInfo.webAbsoluteUrl;
  };

  // Upload
  vm.upload = function () {
    var control = document.getElementById("uploadFile");
    var file = control.files[0];
    var folderAttach = $pnp.sp.web.getFolderByServerRelativeUrl(
      "/sites/PAC/automated/dev/Attach"
    );
    folderAttach.folders.add(vm.id).then(function (respFolder) {
      var folder = $pnp.sp.web.getFolderByServerRelativeUrl(
        "/sites/PAC/automated/dev/Attach/" + vm.id
      );
      folder.files.add(file.name, file, true).then(function (respFile) {
        // Uploaded File
        console.log(respFile);

        // Display
        toastr.success("File uploaded OK - " + file.name);

        // Attachments
        window.setTimeout(function () {
          $pnp.sp.web
            .getFolderByServerRelativeUrl(
              "/sites/PAC/automated/dev/Attach/" + vm.id
            )
            .files.get()
            .then(function (resp) {
              vm.uploadFiles = resp;

              // Refresh
              vm.$apply();
            });
        }, 500);
      });
    });

    // Reset
    document.getElementById("uploadFile").value = "";
  };

  vm.getIcon = function (sru) {
    var splits = sru.toLowerCase().split(".");
    var ext = splits[splits.length - 1];
    var imageFolder = "/_layouts/images/";
    switch (ext) {
      case "css":
        return imageFolder + "css16.gif";
      case "doc":
      case "docx":
        return imageFolder + "doc16.gif";
      case "xls":
      case "xlsx":
        return imageFolder + "xls16.gif";
      case "ppt":
      case "pptx":
        return imageFolder + "ppt16.gif";
      case "pdf":
        return imageFolder + "icpdf.png";
      case "jpg":
      case "jpeg":
      case "gif":
      case "png":
        return imageFolder + "jpg16.gif";
      default:
        return imageFolder + "noextension16.gif";
    }
  };

  // Init
  vm.load = function () {
    // Populate current user
    $pnp.sp.web.currentUser.get().then(function (res) {
      vm.currentUser = res;

      if (!vm.d.step1.advocateEmail) {
        vm.d.step1.advocateTitle = res.Title;
        vm.d.step1.advocateEmail = res.Email;
        vm.$apply();
      }
    });

    // Recommenders
    $pnp.sp.web.lists
      .getByTitle('Recommenders')
      .items
      .select("Title", "College", "Recommenders/Title", "Recommenders/EMail")
      .expand("Recommenders")
      .get().then(function (r) {
        vm.recommenders = r;
      });

    // Document JSON body
    vm.id = gup("id");
    if (vm.id) {
      // READ list data to populate form
      $pnp.sp.web.lists
        .getByTitle(vm.listName)
        .items.getById(vm.id)
        .get()
        .then(function (r) {
          // Parse JSON into view model
          vm.d = JSON.parse(r.JSON);

          // Original status
          vm.originalStatus = vm.d.status;

          // Format dates
          var frmt = "YYYY-MM-DD";
          if (vm.d && vm.d.cis && vm.d.cis.businessSince) {
            if (vm.d.cis.businessSince) {
              vm.d.cis.businessSince = moment(vm.d.cis.businessSince).format(
                frmt
              );
            }
          }
          if (vm.d && vm.d.bo && vm.d.bo.resp && vm.d.bo.resp.dob) {
            if (vm.d.bo.resp.dob) {
              vm.d.bo.resp.dob = moment(vm.d.bo.resp.dob).format(frmt);
            }
          }
          if (vm.d && vm.d.lockbox && vm.d.lockbox.tentantive) {
            if (vm.d.lockbox.tentantive) {
              vm.d.lockbox.tentantive = moment(vm.d.lockbox.tentantive).format(
                frmt
              );
            }
          }
          if (vm.d && vm.d.cashvault && vm.d.cashvault.effective) {
            if (vm.d.cashvault.effective) {
              vm.d.cashvault.effective = moment(
                vm.d.cashvault.effective
              ).format(frmt);
            }
          }
          if (vm.d && vm.d.smartsafe && vm.d.smartsafe.effective) {
            if (vm.d.smartsafe.effective) {
              vm.d.smartsafe.effective = moment(
                vm.d.smartsafe.effective
              ).format(frmt);
            }
          }
          if (vm.d && vm.d.bo && vm.d.bo.ownerTable) {
            angular.forEach(vm.d.bo.ownerTable, function (row) {
              if (row.dob) {
                row.dob = moment(row.dob).format(frmt);
              }
            });
          }
          if (vm.d && vm.d.signers && vm.d.signers.rows) {
            angular.forEach(vm.d.signers.rows, function (row) {
              if (row.dob) {
                row.dob = moment(row.dob).format(frmt);
              }
            });
          }

          // Calculate Step2 Semester
          var sem = vm.calcSemester()
          if (!vm.d.step2.choiceSemester) {
            vm.d.step2.choiceSemester = sem;
          }

          // Refresh GUI
          vm.$apply();


        });

      // Folder per ID
      var folderAttach = $pnp.sp.web.getFolderByServerRelativeUrl(
        "/sites/PAC/automated/dev/Attach"
      );
      folderAttach.folders.add(vm.id).then(function () {
        // Attachments
        $pnp.sp.web
          .getFolderByServerRelativeUrl(
            "/sites/PAC/automated/dev/Attach/" + vm.id
          )
          .files.get()
          .then(function (resp) {
            vm.uploadFiles = resp;

            // Refresh GUI
            vm.$apply();
          });
      });

      // // security groups
      // $pnp.sp.web.lists
      //   .getByTitle(vm.listNameSecurity)
      //   .items
      //   .get()
      //   .then(function (r) {
      //     // Parse JSON into view model
      //     angular.forEach(r.data, function (row) {
      //       if (row.Title == 'OnBoarding') {
      //         // elevate access
      //         vm.security = 'OnBoarding';
      //       }
      //     });
      //   });
    }
  };
  vm.load();

  // Events
  vm.changeCollege = function () {
    vm.d.curriculumFacilitator = '';
    vm.d.curriculumFacilitatorEMail = '';
    console.log(vm.d.selectCollege);

    // Fiter CF
    var row = _.filter(vm.recommenders, {
      College: vm.d.step1.selectCollege,
      Title: 'Curriculum Facilitator'
    })
    if (row[0].Recommenders) {
      // CF
      vm.d.curriculumFacilitator = row[0].Recommenders[0].Title;
      vm.d.curriculumFacilitatorEMail = row[0].Recommenders[0].EMail;
    }

    
    // Fiter VP
    var row = _.filter(vm.recommenders, {
      College: vm.d.step1.selectCollege,
      Title: 'Vice President'
    })
    if (row[0].Recommenders) {
      // CF
      vm.d.vp = row[0].Recommenders[0].Title;
      vm.d.vpEMail = row[0].Recommenders[0].EMail;
    }
  };

  // If the current user CF?
  // window.paccCtl.d.curriculumFacilitatorEMail = window.paccCtl.currentUser.Email
  // window.paccCtl.$apply();
  vm.currentCF = function () {
    if (vm.currentUser) {
      if (vm.currentUser.Email == vm.d.step1.advocateEmail); {
        return false;
      }
    }
    
    if (vm.currentUser) {
      return (vm.currentUser.Email == vm.d.curriculumFacilitatorEMail);
    } else {
      return false;
    }
  };

  // Append to PACC-Audit log
  vm.writeAudit = function (msg) {
    $pnp.sp.web.lists
      .getByTitle(vm.listAudit)
      .items.add({
        Title: msg,
        ParentID: vm.id
      })
      .then(function (r) {
        // response
        console.log(r);
      });
  };


  vm.formatSelectedColleges = function (select) {
    var temp = '';
    angular.forEach(select, function (r) {
      temp += r + ","
    });
    return temp.substr(0, temp.length - 1);
  }

  vm.step2vote = function(role, vote) {
    vm.d.step2[role] = vote;
  };
  vm.undo = function(role) {
    vm.d.step2[role] = null;
  };

}



// Register module
window.paccApp = angular.module("paccApp", []);
window.paccApp.controller("paccCtl", paccCtl);
window.paccApp.directive("datepicker", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
      var updateModel = function (dateText) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(dateText);
        });
      };
      var options = {
        dateFormat: "yy-mm-dd",
        onSelect: function (dateText) {
          updateModel(dateText);
        }
      };
      $(elem).datepicker(options);
    }
  };
});