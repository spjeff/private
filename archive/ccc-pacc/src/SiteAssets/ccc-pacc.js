/*
Make current PAA
window.paccCtl.d.step1.advocateEmail = window.paccCtl.currentUser.UserPrincipalName
window.paccCtl.$apply()
*/

// Declare
var urlSitePage = 'https://cccedu.sharepoint.com/sites/PAC/automated/dev/SitePages';
var urlCancel = urlSitePage + '/Step%201%20-%20PA%20Cancel%20Proposal.aspx';
var urlSaveClose = urlSitePage + '/Step%201%20-%20PA%20Cancel%20Proposal.aspx';
var urlSaveSubmit = urlSitePage + '/Step%201%20-%20PA%20Successfully%20Initiated%20Proposal.aspx';
var urlSave = '';
var urlClose = urlSitePage + '/Step 2-6 Close Proposal.aspx';
var urlRecommend = urlSitePage + '/Steps 2-6 Recommendation Saved.aspx';
var urlNextStep = urlSitePage + '/Step 1-6 Proposal Recommended to Next Step.aspx';


// from https://stackoverflow.com/questions/237104/how-do-i-check-if-an-array-includes-an-object-in-javascript
Array.prototype.contains = function (obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};

// from https://stackoverflow.com/questions/6253567/javascript-if-last-character-of-a-url-string-is-then-remove-it-how
function removeLastComma(myUrl) {
  if (myUrl) {
    if (myUrl.substring(myUrl.length - 1) == ",") {
      myUrl = myUrl.substring(0, myUrl.length - 1);
    }
  }
  return myUrl;
}

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
  vm.choiceFolder = "Master Syllabus,ICCB Forms,Feedback,Pathways".split(",");
  vm.choiceDiscipline = "disc1,disc2,disc3".split(",");
  vm.choiceStatusICCB = "Missing Documents,Pending ICCB Approval,ICCB Approved".split(",");
  vm.choiceFocus = "Advanced Manufacturing,Business & Professional Services,Construction Technology & Drafting,Culinary Arts & Hospitality,Education,Healthcare,Information Technology,Human Sciences (Liberal Arts),Natural Sciences,Transportation, Distribution & Logistics".split(',');
  vm.choiceICC = "Agriculture, Food & Natural Resources,Architecture & Construction; Arts,Arts, A/V Technology & Communications,Baccalaureate/Transfer and General Studies,Business Management & Administration,Education & Training,Health Science,Hospitality & Culinary,Human Services,Information Technology,Law, Public Safety, Corrections and Security,Manufacturing,Science, Technology, Engineering & Mathematics,Transportation, Distribution & Logistics".split(',');
  vm.choiceICCB = "1.1 Baccalaureate/Transfer Instruction,1.2 Occupational/Technical Instruction,1.4 Remedial Education".split(",");
  vm.choiceType = "New Course,Changes to Existing Course,New Program,Changes to Existing Program,New Pathway,Changes to an Existing Pathway,Sunset-Withdraw a Program,Sunset-Inactivate a Program for 3 Years,Other/Report Out".split(",");
  vm.choiceCollege = "DA,HW,KK,MX,OH,TR,WR".split(",");
  vm.choiceCollegeSister = vm.choiceCollege;
  //vm.choiceCollegeSister.push('Not offered at any sister college');
  vm.choiceProposal = "New Course,Revised Course,New Program,Revised Program".split(
    ","
  );
  vm.choiceStatusStep7 = "Pending,Sent to CS9 Support,Completed".split(",");
  vm.choiceYN = "Yes,No".split(",");

  // Status
  vm.d = {
    maxstatus: 1,
    status: 0,
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
    var sem = '';
    fy++;
    switch (n) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        sem = 'Spring ' + fy;
      case 5:
      case 6:
        sem = 'Summer ' + fy;
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
        sem = 'Fall ' + fy;
    }
    return sem;
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

  vm.save = function (sendMail, type, url) {

    // Redirect
    if (type == 'close' || type == 'submit' || type == 'next') {
      vm.saveHide = true;
    }

    // Setup
    console.log("save");

    // Table
    vm.d.tabled = false;
    if (type == 'tabled') {
      vm.d.tabled = true;
    }

    // Data object
    var obj = {
      Title: ".",
      JSON: angular.toJson(vm.d),
      FormStatus: vm.d.status.toString(),
      PACCTitle: vm.d.step1.pacctitle,
      PACCType: vm.d.step1.selectType,
      College: vm.d.step1.selectCollege,
      CFEmail: vm.d.curriculumFacilitatorEMail,
      Tabled: vm.d.tabled.toString()
      //TBD CFPerson: 
    };

    // Ensure User
    $pnp.sp.web.ensureUser(vm.d.curriculumFacilitatorEMail).then(function (respCF) {
      // Id for Person data type
      obj.CFPersonId = respCF.Id;

      // UPSERT branch (INSERT if new, UPDATE if existing)
      if (vm.id && vm.id != "undefined") {
        // FormStatusDate

        // UPDATE if have ID
        $pnp.sp.web.lists
          .getByTitle(vm.listName)
          .items.getById(vm.id)
          .update(obj)
          .then(function (r) {
            // response
            console.log(r);


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


            // Popup
            if (r.item) {
              toastr.success("Form updated OK #" + vm.id);
              document.location.href = urlSave;
            }

            // Redirect
            if (type == 'close') {
              document.location.href = urlSaveClose;
            }
            if (type == 'submit') {
              document.location.href = urlSaveSubmit;
            }
            if (type == 'reco') {
              document.location.href = urlRecommend;
            }
            if (type == 'next') {
              document.location.href = urlNextStep;
            }

          });
      } else {
        // INSERT if missing
        vm.d.formStatus = "Open";

        $pnp.sp.web.lists
          .getByTitle(vm.listName)
          .items.add(obj)
          .then(function (r) {
            // response
            console.log(r);

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





            // Redirect
            if (type == 'close') {
              document.location.href = urlSaveClose;
            }
            if (type == 'submit') {
              document.location.href = urlSaveSubmit;
            }
            if (type == 'reco') {
              document.location.href = urlRecommend;
            }
            // else {
            //              document.location.href += "?id=" + r.data.Id;
            //}

          });
      }

    });

  };

  vm.navigate = function (status, force) {
    // Exit if Read only security
    if (vm.SecurityLevel == 0 && (status == 1.1 ||
        status == 1.1 ||
        status == 2.1 ||
        status == 2.2 ||
        status == 3.1 ||
        status == 3.2 ||
        status == 4.1 ||
        status == 4.2 ||
        status == 4.3
      )) {
      return;
    }


    if (force) {
      vm.d.status = status;
      vm.$apply();
    }
    if (!vm.d.maxstatus) {
      vm.d.maxstatus = status;
    }
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
    vm.save(sendMail, type);
    vm.$apply();
  };

  // View Folder
  vm.viewFolder = function () {
    window.open("/sites/PAC/automated/dev/Attach/" + vm.id, "_blank");
  };

  // Close button
  vm.close = function () {
    document.location.href = urlClose;
  };

  // Cancel button
  vm.cancel = function (msg) {
    if (!msg) {
      msg = "close";
    }
    var c = confirm('Are you sure you want to ' + msg + '?');
    if (c) {
      //document.location.href = window._spPageContextInfo.webAbsoluteUrl;
      document.location.href = urlCancel;
    }
  };

  // Upload
  vm.upload = function () {
    var control = document.getElementById("uploadFile");
    var file = control.files[0];
    var folderAttach = $pnp.sp.web.getFolderByServerRelativeUrl(
      "/sites/PAC/automated/dev/Attach"
    );
    folderAttach.folders.add(vm.id).then(function (respFolder) {

      // Create subfolders
      angular.forEach(vm.choiceFolder, function (row) {
        var folderAttach = $pnp.sp.web.getFolderByServerRelativeUrl(
          "/sites/PAC/automated/dev/Attach/" + vm.id
        );
        folderAttach.folders.add(row);
      });

      // Dynamic route to root folder (or subfolder) as selected
      if (!selectFolder) {
        var folder = $pnp.sp.web.getFolderByServerRelativeUrl(
          "/sites/PAC/automated/dev/Attach/" + vm.id
        );
      } else {
        var folder = $pnp.sp.web.getFolderByServerRelativeUrl(
          "/sites/PAC/automated/dev/Attach/" + vm.id + "/" + vm.selectFolder
        );
      }
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

  vm.step2PeoplePicker = function(event) {
    console.log(vm.people);
    vm.ddEMail = vm.people[0].Email;
  };

  // Read Only
  vm.isReadOnly = function () {
    if (vm.SecurityLevel != 3 && vm.d.status == 5){
      // Only DO Academic Coordinator for Step 5
      return true;
    }
    if (vm.isCF() && vm.d.status == 2) {
      return true;
    }
    if (vm.isDCF() && vm.d.status == 4) {
      return false;
    }
    return (!vm.isCF() && !vm.isVP() && !vm.isDD() && !vm.isPA() && !vm.isRecommender());
  };

  // Is current Course?
  vm.isCourse = function () {
    return (vm.d.step1.selectType.indexOf('Course') > -1);
  };

  // Is current Program?
  vm.isProgram = function () {
    return (vm.d.step1.selectType.indexOf('Program') > -1);
  };

  // Is current user PA?
  vm.isPA = function () {
    if (vm.currentUser) {
      return vm.currentUser.UserPrincipalName == vm.d.step1.advocateEmail;
    }
  };

  // Is current user CF?
  vm.isCF = function () {
    if (vm.currentUser) {
      return vm.currentUser.UserPrincipalName == vm.d.curriculumFacilitatorEMail;
    }
  };

  // Is current user DCF?
  vm.isDCF = function () {
    if (vm.currentUser) {
      return vm.currentUser.UserPrincipalName == vm.districtCurriculumFacilitatorEMail;
    }
  };

  // Is current user DO?
  vm.isDO = function () {
    if (vm.currentUser) {
      return vm.currentUser.UserPrincipalName == vm.districtOfficeEMail;
    }
  };

  // Is current user VP?
  vm.isVP = function () {
    if (vm.currentUser) {
      return vm.currentUser.UserPrincipalName == vm.vpEMail;
    }
  };

  // Is current user DD?
  vm.isDD = function () {
    if (vm.currentUser) {
      return vm.currentUser.UserPrincipalName == vm.ddEMail;
    }
  };

  // Is current user in Recommender SPList?
  vm.isRecommender = function () {
    var match = false;
    if (vm.recommenders) {
      angular.forEach(vm.recommenders, function (row) {
        if (row.Recommenders[0].EMail == vm.currentUser.UserPrincipalName) {
          match = true;
          return;
        }
      });
    }
    return match;
  };

  // Get Liason
  vm.getLiason = function () {
    // Match selected Title to list of all Discipline Liaisons
    var dt = vm.d.step1.discipline;
    var match = _.filter(vm.disciplineLiaisons, {
      Title: dt
    });
    if (match) {
      return match;
    } else {
      return {
        Name: ''
      };
    }
  };

  // Validate
  vm.notValid = function () {

    // Step 1 - Button Disable
    if (vm.d.status == 1) {
      if (!vm.d.step1.discipline) {
        return true;
      }

      // if (!vm.d.step1.pacctitle ||
      //   !vm.d.step1.rationale
      // ) {
      //   return true;
      // }
    }

    var state = false;
    if (!vm.d.step1.selectType ||
      !vm.d.step1.pacctitle ||
      !vm.d.step1.selectCollege ||
      !vm.d.step1.discipline ||
      //!vm.d.step1.rationale ||
      !vm.d.step1.selectType ||
      !vm.d.step1.pacctitle) {
      state = true
    }
    return state;
  };

  vm.downloadTemplate = function () {
    window.open('https://cccedu.sharepoint.com/sites/PAC/automated/dev/Shared%20Documents/PACC%20Step%203%20Rationale.docx');
  };

  vm.formatEmailFromLogin = function (login) {
    if (login) {
      var temp = login.split('|');
      return temp[temp.length - 1];
    }
  };

  // Init
  vm.load = function () {

    // Populate SecurityLevel
    vm.SecurityLevel = 0; // Read
    $pnp.sp.web.lists
      .getByTitle('SecurityLevel')
      .items
      .get().then(function (r) {
        var match = _.filter(r, {
          Title: 'PACC CF'
        });
        if (match.length) {
          vm.SecurityLevel = 1;
        }
        match = _.filter(r, {
          Title: 'PACC Owners'
        });
        if (match.length) {
          vm.SecurityLevel = 2;
        }
        match = _.filter(r, {
          Title: 'DO Academic Coordinator'
        });
        if (match.length) {
          vm.SecurityLevel = 3;
        }
      });

    // Populate Discipline Liaisons
    $pnp.sp.web.lists
      .getByTitle('Discipline Liaisons')
      .items
      .select("Title", "College", "Liaison/Title", "Liaison/Name")
      .expand("Liaison")
      .orderBy("Title")
      .get().then(function (r) {
        vm.disciplineLiaisons = r;
      });

    // Populate current user
    $pnp.sp.web.currentUser.get().then(function (res) {
      // Current User
      vm.currentUser = res;

      // Recommenders
      $pnp.sp.web.lists
        .getByTitle('Recommenders')
        .items
        .select("Title", "College", "Recommenders/Title", "Recommenders/Name", "Alternate_x0020_CF/Title", "Alternate_x0020_CF/Name")
        .expand("Recommenders", "Alternate_x0020_CF")
        .get().then(function (r) {
          vm.recommenders = r;



          // Sort current user first
          angular.forEach(vm.recommenders, function (row, i) {
            // Convert [Name] to [Email]
            var temp = vm.recommenders[i].Recommenders[0].Name.split("|");
            var email = temp[temp.length - 1];
            row.Recommenders[0].EMail = email;

            if (row.Recommenders[0].EMail == vm.currentUser.UserPrincipalName) {
              row.sort = 1;
            } else {
              row.sort = 0;
            }
          });

          // DCF
          vm.districtCurriculumFacilitatorEMail = _.filter(vm.recommenders, {
            "Title": "District Curriculum Facilitator"
          })[0].Recommenders[0].EMail;

          // DO
          vm.districtOfficeEMail = _.filter(vm.recommenders, {
            "Title": "AVC - Academic Programs"
          })[0].Recommenders[0].EMail;

          // 7 Colleges
          vm.d.curriculumFacilitatorDA = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "DA"
          })[0].Recommenders[0].Title;
          vm.d.curriculumFacilitatorEMailDA = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "DA"
          })[0].Recommenders[0].EMail;
          vm.d.curriculumFacilitatorHW = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "HW"
          })[0].Recommenders[0].Title;
          vm.d.curriculumFacilitatorEMailHW = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "HW"
          })[0].Recommenders[0].EMail;
          vm.d.curriculumFacilitatorKK = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "KK"
          })[0].Recommenders[0].Title;
          vm.d.curriculumFacilitatorEMailKK = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "KK"
          })[0].Recommenders[0].EMail;
          vm.d.curriculumFacilitatorMX = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "MX"
          })[0].Recommenders[0].Title;
          vm.d.curriculumFacilitatorEMailMX = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "MX"
          })[0].Recommenders[0].EMail;
          vm.d.curriculumFacilitatorOH = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "OH"
          })[0].Recommenders[0].Title;
          vm.d.curriculumFacilitatorEMailOH = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "OH"
          })[0].Recommenders[0].EMail;
          vm.d.curriculumFacilitatorTR = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "TR"
          })[0].Recommenders[0].Title;
          vm.d.curriculumFacilitatorEMailTR = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "TR"
          })[0].Recommenders[0].EMail;
          vm.d.curriculumFacilitatorWR = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "WR"
          })[0].Recommenders[0].Title;
          vm.d.curriculumFacilitatorEMailWR = _.filter(vm.recommenders, {
            "Title": "Curriculum Facilitator",
            "College": "WR"
          })[0].Recommenders[0].EMail;

          // 7 Colleges VP
          vm.d.vpDA = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "DA"
          })[0].Recommenders[0].Title;
          vm.d.vpEMailDA = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "DA"
          })[0].Recommenders[0].EMail;
          vm.d.vpHW = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "HW"
          })[0].Recommenders[0].Title;
          vm.d.vpEMailHW = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "HW"
          })[0].Recommenders[0].EMail;
          vm.d.vpKK = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "KK"
          })[0].Recommenders[0].Title;
          vm.d.vpEMailKK = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "KK"
          })[0].Recommenders[0].EMail;
          vm.d.vpMX = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "MX"
          })[0].Recommenders[0].Title;
          vm.d.vpEMailMX = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "MX"
          })[0].Recommenders[0].EMail;
          vm.d.vpOH = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "OH"
          })[0].Recommenders[0].Title;
          vm.d.vpEMailOH = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "OH"
          })[0].Recommenders[0].EMail;
          vm.d.vpTR = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "TR"
          })[0].Recommenders[0].Title;
          vm.d.vpEMailTR = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "TR"
          })[0].Recommenders[0].EMail;
          vm.d.vpWR = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "WR"
          })[0].Recommenders[0].Title;
          vm.d.vpEMailWR = _.filter(vm.recommenders, {
            "Title": "Vice President",
            "College": "WR"
          })[0].Recommenders[0].EMail;


          // Split two array.  Left and right side.
          if (!vm.d.recommendersA) {
            vm.d.recommendersA = _.take(vm.recommenders, 11);
          }
          if (!vm.d.recommendersB) {
            vm.d.recommendersB = _.takeRight(vm.recommenders, vm.recommenders.length - 11);
          }

          // Refresh
          vm.$apply();

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

                // SecurityLevel.  Read only users, only see whole number (remove decimal).
                // Exclude voting
                if (!vm.isCF() && !vm.isVP() && !vm.isDD() && !vm.isDCF() && !vm.isDO()) {
                  if (vm.SecurityLevel == 0) {
                    if (vm.d.status != parseInt(vm.d.status)) {
                      vm.d.status = parseInt(vm.d.status);
                    }
                  }
                }

                // Refresh GUI
                vm.$apply();


              });

            // // Folder per ID
            // var folderAttach = $pnp.sp.web.getFolderByServerRelativeUrl(
            //   "/sites/PAC/automated/dev/Attach"
            // );
            // folderAttach.folders.add(vm.id).then(function () {
            //   // Attachments
            //   $pnp.sp.web
            //     .getFolderByServerRelativeUrl(
            //       "/sites/PAC/automated/dev/Attach/" + vm.id
            //     )
            //     .files.get()
            //     .then(function (resp) {
            //       vm.uploadFiles = resp;

            //       // Refresh GUI
            //       vm.$apply();
            //     });
            // });

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
          } else {
            // Missing ID
            vm.d.status = 1;
            vm.$apply();
          }


        });

      // Advocate populate
      if (!vm.d.step1.advocateEmail) {
        vm.d.step1.advocateTitle = res.Title;
        vm.d.step1.advocateEmail = res.Email;

        // Refresh GUI
        vm.$apply();
      }
    });




  };
  vm.load();

  // Events
  vm.changeCollege = function () {
    vm.curriculumFacilitator = '';
    vm.curriculumFacilitatorEMail = '';
    console.log(vm.d.selectCollege);

    // Vote 2 AutoCheck
    switch (vm.d.step1.selectCollege) {
      case 'DA':
        vm.d.step2.offerDA = true;
        break;
      case 'HW':
        vm.d.step2.offerHW = true;
        break;
      case 'KK':
        vm.d.step2.offerKK = true;
        break;
      case 'MX':
        vm.d.step2.offerMX = true;
        break;
      case 'OH':
        vm.d.step2.offerOH = true;
        break;
      case 'TR':
        vm.d.step2.offerTR = true;
        break;
      case 'WR':
        vm.d.step2.offerWR = true;
        break;
        vm.$apply();
    }

    // Fiter CF
    vm.d.showAlternate = false;
    var row = _.filter(vm.recommenders, {
      College: vm.d.step1.selectCollege,
      Title: 'Curriculum Facilitator'
    });
    if (row[0].Recommenders) {
      // CF
      vm.d.curriculumFacilitator = row[0].Recommenders[0].Title;
      vm.d.curriculumFacilitatorEMail = row[0].Recommenders[0].EMail;
    }

    // Override CF with Alternate CF
    if (vm.d.step1.advocateEmail == vm.d.curriculumFacilitatorEMail) {
      // Alternate CF
      vm.d.curriculumFacilitator = row[0].Alternate_x0020_CF.Title;
      vm.d.curriculumFacilitatorEMail = vm.formatEmailFromLogin(row[0].Alternate_x0020_CF.Name);
      vm.d.showAlternate = true;
    }

    // Fiter DCF
    try {
      var row = _.filter(vm.recommenders, {
        Title: 'District Curriculum Facilitator'
      })
      if (row[0].Recommenders) {
        // DCF
        vm.d.dcurriculumFacilitatorEMail = row[0].Recommenders[0].EMail;
      }
    } catch {}


    // Fiter VP
    try {
      var row = _.filter(vm.recommenders, {
        College: vm.d.step1.selectCollege,
        Title: 'Vice President'
      });
      if (row[0].Recommenders) {
        // CF
        vm.vp = row[0].Recommenders[0].Title;
        vm.vpEMail = row[0].Recommenders[0].EMail;
      }
    } catch {}


    // Fiter Chair
    try {
      var row = _.filter(vm.recommenders, {
        College: vm.d.step1.selectCollege,
        Title: 'Curriculm Commitee Chair'
      })
      if (row[0].Recommenders) {
        // CF
        vm.d.cchair = row[0].Recommenders[0].Title;
        vm.d.cchairEMail = row[0].Recommenders[0].EMail;
      }
    } catch {}

  };

  // If the current user CF?
  // window.paccCtl.d.curriculumFacilitatorEMail = window.paccCtl.currentUser.UserPrincipalName
  // window.paccCtl.$apply();
  vm.currentCF = function () {

    // CF
    if (vm.currentUser) {
      if (vm.currentUser.UserPrincipalName == vm.d.curriculumFacilitatorEMail) {
        return true;
      }
    }

    // DCF
    if (vm.currentUser) {
      if (vm.currentUser.UserPrincipalName == vm.d.dcurriculumFacilitatorEMail) {
        return true;
      }
    }

    return false;
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

  //Vote button click on Step 2
  vm.step2vote = function (role, vote) {
    vm.d.step2[role] = vote;


    // If 3 votes
    // Do we have majority approve (2/3)?
    // Move to Step 3
    if (vm.d.step2.CF && vm.d.step2.DES && vm.d.step2.VP) {
      // Total votes
      var total = 0;
      if (vm.d.step2.CF) total++;
      if (vm.d.step2.DES) total++;
      if (vm.d.step2.VP) total++;

      var approveTotal = 0;
      var accept = 'Accept';
      if (vm.d.step2.CF.indexOf(accept) > -1) {
        approveTotal++;
      }
      if (vm.d.step2.DES.indexOf(accept) > -1) {
        approveTotal++;
      }
      if (vm.d.step2.VP.indexOf(accept) > -1) {
        approveTotal++;
      }

      // Move
      if (total >= 3) {
        if (approveTotal >= 3) {
          toastr.success('Approved for Step 2');
          vm.navigate(3, true);
          vm.save(null, 'reco');
        }
      }
    } else {
      vm.save(null, 'reco');
    }
  };

  vm.undostep2 = function (role) {
    vm.d.step2[role] = null;

    // Always Save
    vm.save(null, 'reco');
  };


  //Vote button click on Step 3
  vm.step3vote = function (role, vote) {
    vm.d.step3[role] = vote;


    // If 3 votes
    // Do we have majority approve (2/3)?
    // Move to Step 3
    if (vm.d.step3.CF && vm.d.step3.DES && vm.d.step3.VP) {
      // Total votes
      var total = 0;
      if (vm.d.step3.CF) total++;
      if (vm.d.step3.DES) total++;
      if (vm.d.step3.VP) total++;

      var approveTotal = 0;
      var accept = 'Accept';
      if (vm.d.step3.CF.indexOf(accept) > -1) {
        approveTotal++;
      }
      if (vm.d.step3.DES.indexOf(accept) > -1) {
        approveTotal++;
      }
      if (vm.d.step3.VP.indexOf(accept) > -1) {
        approveTotal++;
      }

      // Move
      if (total >= 3) {
        if (approveTotal >= 3) {
          toastr.success('Approved for Step 3');
          vm.navigate(4, true);
          vm.save(null, 'reco');
        }
      }
    } else {
      vm.save(null, 'reco');
    }
  };

  vm.undostep3 = function (role) {
    vm.d.step3[role] = null;

    // Always Save
    vm.save(null, 'reco');
  };

  //vote button click on Step 4
  vm.step4vote = function (partition, reco, vote) {
    reco.recovote = vote;

  };
  vm.step4unvote = function (reco) {
    reco.recovote = null;
  };


  vm.step4voteDCFDO = function (style) {
    if (style == 'DCF') {
      vm.d.step4.DCFvote = true;
    }
    if (style == 'DO') {
      vm.d.step4.DOvote = true;
    }
  };

  vm.quorumMet = function () {
    var met = false;
    var a = vm.voteColleges() >= 5;
    var b = (vm.voteTotalJobTitle('Vice President') >= 1);
    var c = (vm.voteTotalJobTitle('Curriculum Facilitator') >= 1);
    var d = (vm.voteTotalJobTitle('Curriculum Committee Chair') >= 1);
    var e = (vm.voteTotalDCF() >= 1);
    var f = (vm.voteTotal() >= 12);
    var g = ((vm.voteAccept('Accept') + vm.voteAccept('AcceptMinor')) >= 8);

    var h = (vm.d.step2.offerDA && vm.voteParticipatingCollege('DA') >= 2);
    var i = (vm.d.step2.offerHW && vm.voteParticipatingCollege('HW') >= 2);
    var j = (vm.d.step2.offerKK && vm.voteParticipatingCollege('KK') >= 2);
    var k = (vm.d.step2.offerMX && vm.voteParticipatingCollege('MX') >= 2);
    var l = (vm.d.step2.offerOH && vm.voteParticipatingCollege('OH') >= 2);
    var m = (vm.d.step2.offerTR && vm.voteParticipatingCollege('TR') >= 2);
    var n = (vm.d.step2.offerWR && vm.voteParticipatingCollege('WR') >= 2);

    if (a && b && c && d && e && f && g &&
      (h || h == undefined) &&
      (i || i == undefined) &&
      (j || j == undefined) &&
      (k || k == undefined) &&
      (l || l == undefined) &&
      (m || m == undefined) &&
      (n || n == undefined)) {
      met = true;
    }

    return met;
  };

  vm.majorityMet = function () {
    return ((vm.voteAccept('Accept') + vm.voteAccept('AcceptMinor')) >= 12);
  };

  vm.voteParticipatingCollege = function (name) {
    // Empty collection
    var colleges = [];

    // Loop votes
    angular.forEach(vm.d.recommendersA, function (row) {
      if (row.recovote) {
        colleges.push(row.College);
      }
    });
    angular.forEach(vm.d.recommendersB, function (row) {
      if (row.recovote) {
        colleges.push(row.College);
      }
    });

    // Group and Count Participating College
    var collegesGroup = _.groupBy(colleges);

    // Total 
    var total = 0;
    if (name == 'DA') {
      if (collegesGroup.DA) {
        return collegesGroup.DA.length;
      } else return 0;
    }
    if (name == 'HW') {
      if (collegesGroup.HW) {
        return collegesGroup.HW.length;
      } else return 0;
    }
    if (name == 'MX') {
      if (collegesGroup.MX) {
        return collegesGroup.MX.length;
      } else return 0;
    }
    if (name == 'OH') {
      if (collegesGroup.OH) {
        return collegesGroup.OH.length;
      } else return 0;
    }
    if (name == 'TR') {
      if (collegesGroup.TR) {
        return collegesGroup.TR.length;
      } else return 0;
    }
    if (name == 'WR') {
      if (collegesGroup.WR) {
        return collegesGroup.WR.length;
      } else return 0;
    }
    if (name == 'KK') {
      if (collegesGroup.KK) {
        return collegesGroup.KK.length;
      } else return 0;
    }
    return total;
  };

  vm.voteColleges = function () {
    // Empty collection
    var colleges = [];

    // Loop votes
    angular.forEach(vm.d.recommendersA, function (row) {
      if (row.recovote) {
        colleges.push(row.College);
      }
    });
    angular.forEach(vm.d.recommendersB, function (row) {
      if (row.recovote) {
        colleges.push(row.College);
      }
    });

    // Unique college
    var collegesUnique = _.uniq(colleges);
    return collegesUnique.length;
  };

  vm.voteAccept = function (style) {
    var total = 0;
    angular.forEach(vm.d.recommendersA, function (row) {
      if (row.recovote == style) {
        total++;
      }
    });
    angular.forEach(vm.d.recommendersB, function (row) {
      if (row.recovote == style) {
        total++;
      }
    });
    return total;
  };

  vm.voteTotal = function () {
    var total = 0;
    angular.forEach(vm.d.recommendersA, function (row) {
      if (row.recovote) {
        total++;
      }
    });
    angular.forEach(vm.d.recommendersB, function (row) {
      if (row.recovote) {
        total++;
      }
    });
    return total;
  };

  vm.voteTotalByJobTitle = function (title) {
    var total = 0;
    angular.forEach(vm.d.recommendersA, function (row) {
      if (row.Title == title) {
        total++;
      }
    });
    angular.forEach(vm.d.recommendersB, function (row) {
      if (row.Title == title) {
        total++;
      }
    });
    return total;
  };

  vm.voteTotalJobTitle = function (jobTitle) {
    var total = 0;
    angular.forEach(vm.d.recommendersA, function (row) {
      if (row.Title == jobTitle) {
        if (row.recovote) {
          total++;
        }
      }
    });
    angular.forEach(vm.d.recommendersB, function (row) {
      if (row.Title == jobTitle) {
        if (row.recovote) {
          total++;
        }
      }
    });
    return total;
  };
  vm.voteTotalCCC = function () {
    return vm.voteTotalByJobTitle('Curriculum Committee Chair');
  };
  vm.voteTotalCF = function () {
    return vm.voteTotalByJobTitle('Curriculum Facilitator');
  };
  vm.voteTotalDCF = function () {
    return (vm.voteTotalByJobTitle('AVC - Academic Programs') + vm.voteTotalByJobTitle('District Curriculum Facilitator'));
  };


  vm.voteAllowStep4 = function () {
    return (vm.quorumMet() && vm.majorityMet());
  };

}


// Register module
window.paccApp = angular.module("paccApp", ['sp-peoplepicker']);
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


// Timer watch People Picker.  Update 500ms if fields different.
function peoplePickerTimer() {
  // Get source
  var source = JSON.parse(document.getElementById('hdnPeoplePick').value);
  var n = source[0].Login.lastIndexOf("|");
  source = source[0].Login;
  source = source.substr(n + 1, source.length - n);

  // Get destination
  var dest = document.getElementById('ddEMail').value;

  // Update if different
  if (source != dest) {
    document.getElementById('ddEMail').value = source;
    window.paccCtl.$apply();
  }
}
window.setInterval(peoplePickerTimer, 500);