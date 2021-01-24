// Dev context HTTP
if (!window._spPageContextInfo) {
  if (document.location.origin.indexOf('sharepoint.com') > 0) {
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
    if (typeof obj != "object" || obj === null || !x in obj)
      return false;
    obj = obj[x];
    return true;
  });
}

// App routing
window.cobApp = angular.module("cobApp", ["ngRoute"]);
window.cobApp.config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "start.htm"
      })
      .when("/acct", {
        templateUrl: "acct.htm"
      })
      .when("/acctrecon", {
        templateUrl: "acctrecon.htm"
      })
      .when("/ach", {
        templateUrl: "ach.htm"
      })
      .when("/achdebit", {
        templateUrl: "achdebit.htm"
      })
      .when("/billpay", {
        templateUrl: "billpay.htm"
      })
      .when("/bo", {
        templateUrl: "bo.htm"
      })
      .when("/cashvault", {
        templateUrl: "cashvault.htm"
      })
      .when("/cis", {
        templateUrl: "cis.htm"
      })
      .when("/corppurchase", {
        templateUrl: "corppurchase.htm"
      })
      .when("/corp-res", {
        templateUrl: "corp-res.htm"
      })
      .when("/corpsupply", {
        templateUrl: "corpsupply.htm"
      })
      .when("/edi", {
        templateUrl: "edi.htm"
      })
      .when("/express", {
        templateUrl: "express.htm"
      })
      .when("/lockbox", {
        templateUrl: "lockbox.htm"
      })
      .when("/master", {
        templateUrl: "master.htm"
      })
      .when("/merchant", {
        templateUrl: "merchant.htm"
      })
      .when("/nonrevolve", {
        templateUrl: "nonrevolve.htm"
      })
      .when("/ppay", {
        templateUrl: "ppay.htm"
      })
      .when("/rdc", {
        templateUrl: "rdc.htm"
      })
      .when("/returnitem", {
        templateUrl: "returnitem.htm"
      })
      .when("/signers", {
        templateUrl: "signers.htm"
      })
      .when("/guarantor", {
        templateUrl: "guarantor.htm"
      })
      .when("/smartsafe", {
        templateUrl: "smartsafe.htm"
      })
      .when("/sweep", {
        templateUrl: "sweep.htm"
      })
      .when("/wire", {
        templateUrl: "wire.htm"
      })
      .when("/odata", {
        templateUrl: "odata.htm"
      })
      .when("/idata", {
        templateUrl: "idata.htm"
      })
      .when("/daylight", {
        templateUrl: "daylight.htm"
      })
      .when("/reposweep", {
        templateUrl: "reposweep.htm"
      })
      .when("/mmsweep", {
        templateUrl: "mmsweep.htm"
      })
      .when("/repwire", {
        templateUrl: "repwire.htm"
      })
      .otherwise({
        redirectTo: "/"
      });

    $locationProvider.html5Mode(false);
  }
]);

function cobCtl($scope, $http) {
  // Scope
  var vm = $scope;
  window.cobCtl = $scope;

  // SharePoint Config
  vm.listName = "COB";
  vm.listNameSecurity = "Security";
  vm.uploadFiles = [];

  // // View change event
  // vm.$on('$viewContentLoaded', function () {
  //   // Date picker
  //   $(".datepicker").datepicker();
  //   $(".datepicker").datepicker("option", "dateFormat", "yy-mm-dd");
  // });

  vm.valid = function () {
    // bypass
    if (vm.d.start.purpose == 'loanrequest') {
      return true;
    }

    // Core required fields
    var base = (vm.d.start.purpose &&
      vm.d.start.person &&
      vm.d.start.rm &&
      vm.d.start.tmo &&
      vm.d.start.cc &&
      vm.d.start.companyName &&
      vm.d.start.selectTypeEntity &&
      vm.d.start.companyContactName &&
      vm.d.start.companyContactPhone &&
      vm.d.start.companyContactMail);
    if (!vm.hideDueDiligence()) {
      // Due Diligence required fields
      return (base &&
        vm.d.start.gambling &&
        vm.d.start.atm &&
        vm.d.start.prepaid &&
        vm.d.start.video &&
        vm.d.start.checkcash &&
        vm.d.start.marijuna &&
        vm.d.start.marijunarelated);
    } else {
      // Core
      return base;
    }
  };

  // Choices
  vm.choiceScanner = "Epson Capture One,Epson Capture One - Auto Feed 30DPM,Epson Capture One - Auto Feed 60DPM,Epson Capture One - Auto Feed 90DPM,Digital Check,Digital Check - Auto Feed 50 DPM, FTP Client".split(
    ","
  );
  vm.choiceWarranty = "No extended warranty (Standard 2yr manufacturing warranty),2 yr warranty w/ overnight replacement,3 yr warranty w/ overnight replacement".split(
    ","
  );
  vm.choiceMailOption = "US Mail (First Class), FedEx Ground, and FedEx Next Day".split(
    ","
  );
  vm.choiceIdType = "Driver's License,State ID,US Passport,Matricula,Foreign Passport,Other".split(
    ","
  );
  vm.choiceTypeEntity = "Sole Proprietorship,Partnership,Corporation - Publicly Traded,Corporation - Privately Held,Limited Liability Co - Publicly Traded,Limited Liability Co - Privately Held,IOLTA - Individual,IOLTA - Company,IBRETA - Individual,IBRETA - Company,Public Entity,Unicorporated Organization/Association,Political Fund,Non-Profit Organization/Association,Non-Profit Corporation,Commingled Escrow,Individual Escrow,Memorial,Recreational/Club,Statutory Trust".split(
    ","
  );
  vm.choiceDocHandled = "Deliver to Person listed above,Deliver to FMB Colleague listed below,Work with Client contact listed below".split(
    ","
  );
  vm.choiceSourceFundsInt = "Checking,Savings,Money Market,Maturing CD,Loan".split(
    ","
  );
  vm.choiceSourceFundsExt = "Check,Cash,Money Order,Official Check".split(",");
  vm.choiceStatementOption = "Image,No Checks,CD-ROM".split(",");
  vm.choiceBizExpress = "MICRO,SMALL,MID".split(",");
  vm.choiceFrequency = "DAILY,WEEKLY,BI WEEKLY,MONTHLY".split(",");
  vm.choiceSECCodes = "CCD,PPD,CTX,WEB,TEL".split(",");
  vm.choiceStartAccount = "ABL COMMERCIAL CKING-501,ABL-CASH COLL ACCT-525,ABL-SPRING CASH COLL-524,BUS CKG W/INT IOLTA-082,BUSINESS DDA-075,BUSINESS DDA (NEW)-250,BUSINESS SAVINGS-085,CD BUSINESS-405,CD PUBLIC-415,COMML INTEREST CKING-080,ESSENTIAL CKING-188,ESSENTIAL DLX-186,ESSENTIAL PLS-187,HLTHCARE CHK-221,HLTHCARE CK SUB ACCT- 224,HLTHCARE PLTM-223,HLTHCARE PLUS-222,MONEY SERV BUS ACCT-500,NON PERS CKG W/INT-081,NON PROFIT CKG W/INT- 203,NONPERSONAL MMKT-097,NON-PROFIT CD-411,NON-PROFIT DDA-200,NON-PROFIT MMKT-208,NON-PROFIT SAVINGS-220,PREMIER BUSINESS MMA- 098,PREMIER BUSINESS MMA- 209,PRIME INVEST PUBLIC-309,PUBLIC CHECKING-290,PUBLIC CKG W/INT-303,PUBLIC IMMA-307,PUBLIC SAVINGS-320,PUBLIC SUPER CKG W/I- 280,SOLUTIONS MMKT-092".split(
    ","
  );
  vm.choiceNonRevolve = "4th,10th,13th,14th,20th,25th".split(",");
  vm.choiceNonRevolveCorp = "Monthly,Semi-Monthly,Weekly".split(",");
  vm.choiceLockboxReportFormat = "Format1,Format2,Format3,Format4,Format5,Format6,Format7,Custom".split(
    ","
  );
  vm.choiceExistingClient = "Add Signer(s),Remove Signer(s),Change Signer(s),Change Entity,Buyout,Adding DBA to a Corp,Adding Series to LLC,Other (Provide detail to CDO)".split(
    ","
  );
  vm.choiceCISBusinessType = "AG Services/Landscape,All Vehicle Sales,Amusement & Recreation,Apparel & Accessories,Auto Repair/Services,Bar/Night Club,Business Services,Casino/Gambling,Charity/Religious,Childcare,Construction,Educational Services,Entertainment/Art,Estate/Trust,Fire Arms/Guns,Food Stores,Gas Station,General Merch Store,General Contractor,Hair Salon/Barber,Health Services,Home Assoc/Prop Mgmt,Hotels/Lodges/Camps,Insurance Agent/Broker,Investment Company,Legal Services,Liquor Store,Loan Store/Pawn Shop,Membership Org,Misc Repair Services,Misc Retail,Misc Services,Nail/Tan Salon,Other,Real Estate,Restaurant/Fast Food,Scrap/Salvage,Specialty Trades,Tobacco Sales,Transport/Trucking,Vending".split(
    ","
  );
  vm.choiceCISEmployees = "1-4,5-9,10-19,20-49,50-99,100-499,500-999,1000+".split(
    ","
  );
  vm.choiceState = "AK,AL,AR,AZ,CA,CO,CT,DE,FL,GA,HI,IA,ID,IL,IN,KS,KY,LA,MA,MD,ME,MI,MN,MO,MS,MT,NC,ND,NE,NH,NJ,NM,NV,NY,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VA,VT,WA,WI,WV,WY".split(
    ","
  );
  vm.choiceSweep = "Deficit Sweep - Complete all columns;Excess Sweep - Complete all columns;Collection/Disbursement Sweep (ZBAs)- Complete 1,2,3;Scheduled Sweep- Complete 1,2,5;Line of Credit Sweep include Loan and Note number".split(
    ";"
  );
  vm.choiceGeography = "1 - Local,2 - National,3 - International".split(",");
  vm.choiceCountry = "Afghanistan,Albania,Algeria,Andorra,Angola,Anguilla,Antigua & Barbuda,Argentina,Armenia,Australia,Austria,Azerbaijan,Bahamas,Bahrain,Bangladesh,Barbados,Belarus,Belgium,Belize,Benin,Bermuda,Bhutan,Bolivia,Bosnia & Herzegovina,Botswana,Brazil,Brunei Darussalam,Bulgaria,Burkina Faso,Myanmar/Burma,Burundi,Cambodia,Cameroon,Canada,Cape Verde,Cayman Islands,Central African Republic,Chad,Chile,China,Colombia,Comoros,Congo,Costa Rica,Croatia,Cuba,Cyprus,Czech Republic,Democratic Republic of the Congo,Denmark,Djibouti,Dominica,Dominican Republic,Ecuador,Egypt,El Salvador,Equatorial Guinea,Eritrea,Estonia,Ethiopia,Fiji,Finland,France,French Guiana,Gabon,Gambia,Georgia,Germany,Ghana,Great Britain,Greece,Grenada,Guadeloupe,Guatemala,Guinea,Guinea-Bissau,Guyana,Haiti,Honduras,Hungary,Iceland,India,Indonesia,Iran,Iraq,Israel and the Occupied Territories,Italy,Ivory Coast (Cote d'Ivoire),Jamaica,Japan,Jordan,Kazakhstan,Kenya,Kosovo,Kuwait,Kyrgyz Republic (Kyrgyzstan),Laos,Latvia,Lebanon,Lesotho,Liberia,Libya,Liechtenstein,Lithuania,Luxembourg,Republic of Macedonia,Madagascar,Malawi,Malaysia,Maldives,Mali,Malta,Martinique,Mauritania,Mauritius,Mayotte,Mexico,Moldova, Republic of,Monaco,Mongolia,Montenegro,Montserrat,Morocco,Mozambique,Namibia,Nepal,Netherlands,New Zealand,Nicaragua,Niger,Nigeria,Korea, Democratic Republic of (North Korea) ,Norway,Oman,Pacific Islands,Pakistan,Panama,Papua New Guinea,Paraguay,Peru,Philippines,Poland,Portugal,Puerto Rico,Qatar,Reunion,Romania,Russian Federation,Rwanda,Saint Kitts and Nevis,Saint Lucia,Saint Vincent's & Grenadines,Samoa,Sao Tome and Principe,Saudi Arabia,Senegal,Serbia,Seychelles,Sierra Leone,Singapore,Slovak Republic (Slovakia),Slovenia,Solomon Islands,Somalia,South Africa,Korea, Republic of (South Korea),South Sudan,Spain,Sri Lanka,Sudan,Suriname,Swaziland,Sweden,Switzerland,Syria,Tajikistan,Tanzania,Thailand,Timor Leste,Togo,Trinidad & Tobago,Tunisia,Turkey,Turkmenistan,Turks & Caicos Islands,Uganda,Ukraine,United Arab Emirates,Uruguay,Uzbekistan,Venezuela,Vietnam,Virgin Islands (UK),Virgin Islands (US),Yemen,Zambia,Zimbabwe".split(
    ","
  );
  vm.choiceStatus = "Returned,Open,In Queue,In Progress,Out To Client,Under Review,Account(s) Complete,Docs Approved,Set up Complete,Product(s) Established,Training Complete,Closed,On Hold,Purge".split(
    ","
  );
  vm.choiceExistingDeposit = "Remove Signer(s),Change Signer(s),Change Entity,Buyout,Adding DBA to a Corp,Adding Series to LLC,Other (Provide detail to)".split(
    ","
  );
  vm.choiceFreq = "Daily,Weekly,Bi-Weekly,Monthly".split(",");

  vm.hideDueDiligence = function () {
    return (vm.d.start.purpose != 'newentity' && vm.d.start.purpose != 'newClient' && vm.d.start.purpose != 'newAccount' && vm.d.start.purpose != 'loanrequest');
  };

  // Default data
  vm.d = {
    edi: {
      recacct: [{}]
    },
    achdebit: {
      achdebitAccounts: [{}]
    },
    wire: {
      wireAccount: [{}],
      wireIndividual: [{}]
    },
    billpay: {
      remitAddress: [{}],
      rowBillMask: [{}]
    },
    lockbox: {
      rmUsers: [{}, {}],
      acceptPayee: [{}]
    },
    ppay: {
      wireIndividual: [{}]
    },
    ach: {
      rowsAch: [{}]
    },
    start: {
      numberAccountOpened: 1,
      accountOpened: [{}],
      person: null,
      emailupdate: null,
      rm: null,
      emailrm: null,
      tmo: null,
      emailtmo: null,
      cc: null,
      gambling: null,
      atm: null,
      prepaid: null,
      video: null,
      checkcash: null,
      marijuna: null,
      marijunarelated: null,
      cisNumber: null,
      companyTIN: null,
      companyName: null,
      selectState: null,
      selectTypeEntity: null,
      companyContactName: null,
      companyContactPhone: null,
      companyContactMail: null

    },
    signers: {
      rows: [{}]
    },
    master: {
      subEntity: [{}]
    },
    express: {
      expressLoans: [{}]
    },
    ppay: {
      wireAccount: [{}],
      wireIndividual: [{}]
    },
    corpsupply: {
      corpsupplyRows: [{}]
    },
    acct: {
      accounts: [{
        destWireCountry: [{}]
      }]
    },
    rdc: {
      rdcRows: [{}]
    },
    returnitem: {
      returnItemSecurity: [{}],
      returnItemUsers: [{}],
      returnItemAccounts: [{}]
    },
    sweep: {
      sweepTable: [{}]
    },
    bo: {
      ownerTable: [{}, {}, {}, {}],
      respTable: [{}],
      resp: {}
    },
    acctrecon: {
      acctReconAuth: [{}]
    },
    corpRes: {
      corpResAuth: [{}]
    },
    odata: {
      accounts: [{}],
      rows: [{
          name: 'Closing Ledger Balance',
          number: '015'
        },
        {
          name: 'Closing Available (Collected) Balance',
          number: '045'
        },
        {
          name: 'One Day Float',
          number: '072'
        },
        {
          name: 'Two Day Float',
          number: '074'
        },
        {
          name: 'Total Credits - Amount',
          number: '100'
        },
        {
          name: 'Total Debits - Number',
          number: '400'
        },
        {
          name: 'Average Ledger Balance (cycle-to-date)',
          number: '020'
        },
        {
          name: 'Average Collected Balance (cycle-to-date)',
          number: '050'
        },
        {
          name: 'Total Credits - Number',
          number: '102'
        },
        {
          name: 'Total Debits - Number',
          number: '402'
        },
        {
          name: 'Lockbox Deposits *',
          number: '115'
        },
        {
          name: 'Opening Available Balance',
          number: '040'
        },
        {
          name: 'Wire Transfer Transactions *',
          number: '195 and 495'
        },
        {
          name: 'Average Collected Balance (year-to-date)',
          number: '055'
        },
        {
          name: 'Average Ledger Balance (year-to-date)',
          number: '025'
        },
        {
          name: 'Three or More Day Float',
          number: '075'
        },
        {
          name: 'Collection and Disbursement Transactions',
          number: '277 and 577'
        },
        {
          name: 'All Detail Transactions',
          number: ''
        },
        {
          name: 'All Detail Transactions EXCEPT Checks',
          number: '(475)'
        }
      ]
    }
  };

  // Add row functions
  vm.addRow = function (schema) {
    // Build and execute dynamic JS code
    var cmd = "vm.d." + schema + ".push({});";
    eval(cmd);
  };

  //Delete row functions
  vm.deleteRow = function (schema, index) {
    // Build and execute dynamic JS code
    var cmd = "vm.d." + schema + ".splice(index, 1);";
    eval(cmd);
  };

  // Validation
  vm.personalTaxId = function (txt) {
    return (
      txt == "Sole Proprietorship" ||
      txt == "Limited Liability Co - Publicly Traded" ||
      txt == "Limited Liability Co - Privately Held" ||
      txt == "Comingled Escrow"
    );
  };

  // Events
  vm.numberAccountChanged = function () {
    var gap = vm.d.start.numberAccountOpened - vm.d.start.accountOpened.length;
    if (gap == 0) return;
    if (gap > 0) {
      // more
      for (var i = 0; i < gap; i++) {
        vm.d.start.accountOpened.push({});
      }
    } else {
      // less
      for (var i = gap; i < 0; i++) {
        vm.d.start.accountOpened.splice(-1, 1);
      }
    }
  };

  vm.cpUpdate = function () {
    if (vm.corpPurchase.stmtOption == "C") {
      vm.corpPurchase.indivBillingMemo = "1";
    } else {
      vm.corpPurchase.indivBillingMemo = "2";
    }
  };

  vm.achUpdate = function (row, style) {
    if (style == "debit") {
      if (row.Debitaccounts) {
        vm.yesDebit = 1;
      } else {
        vm.yesDebit = 0;
      }
    } else {
      if (row.accounts) {
        vm.yesCo = 1;
      } else {
        vm.yesCo = 0;
      }
    }
  };

  vm.submit = function () {
    vm.d.formStatus = 'In Queue';
    vm.save();
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

  // Upload
  vm.upload = function () {
    var control = document.getElementById('uploadFile');
    var file = control.files[0];
    var folderAttach = $pnp.sp.web.getFolderByServerRelativeUrl("/sites/cobtest/COBAttach");
    folderAttach.folders.add(vm.id).then(function (respFolder) {
      var folder = $pnp.sp.web.getFolderByServerRelativeUrl("/sites/cobtest/COBAttach/" + vm.id);
      folder.files.add(file.name, file, true).then(function (respFile) {
        console.log(respFile);

        // Attachments
        $pnp.sp.web.getFolderByServerRelativeUrl("/sites/cobtest/COBAttach/" + vm.id).files.get().then(function (resp) {
          vm.uploadFiles = resp;
        });
      });
    });

    // Reset
    document.getElementById("uploadFile").value = "";
  };

  vm.getIcon = function (sru) {
    var splits = sru.toLowerCase().split('.');
    var ext = splits[splits.length - 1];
    var imageFolder = '/_layouts/images/';
    switch (ext) {
      case 'css':
        return imageFolder + 'css16.gif';
      case 'doc':
      case 'docx':
        return imageFolder + 'doc16.gif';
      case 'xls':
      case 'xlsx':
        return imageFolder + 'xls16.gif';
      case 'ppt':
      case 'pptx':
        return imageFolder + 'ppt16.gif';
      case 'pdf':
        return imageFolder + 'icpdf.png';        
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'png':
        return imageFolder + 'jpg16.gif';
      default:
        return imageFolder + 'noextension16.gif';
    }
  };

  // Init
  vm.load = function () {

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

          // Format dates
          var frmt = 'YYYY-MM-DD';
          if (vm.d && vm.d.cis && vm.d.cis.businessSince) {
            vm.d.cis.businessSince = moment(vm.d.cis.businessSince).format(frmt);
          }
          if (vm.d && vm.d.bo && vm.d.bo.resp && vm.d.bo.resp.dob) {
            vm.d.bo.resp.dob = moment(vm.d.bo.resp.dob).format(frmt);
          }
          if (vm.d && vm.d.lockbox && vm.d.lockbox.tentantive) {
            vm.d.lockbox.tentantive = moment(vm.d.lockbox.tentantive).format(frmt);
          }
          if (vm.d && vm.d.cashvault && vm.d.cashvault.effective) {
            vm.d.cashvault.effective = moment(vm.d.cashvault.effective).format(frmt);
          }
          if (vm.d && vm.d.smartsafe && vm.d.smartsafe.effective) {
            vm.d.smartsafe.effective = moment(vm.d.smartsafe.effective).format(frmt);
          }
          if (vm.d && vm.d.bo && vm.d.bo.ownerTable) {
            angular.forEach(vm.d.bo.ownerTable, function (row) {
              row.dob = moment(row.dob).format(frmt);
            });
          }
          if (vm.d && vm.d.signers && vm.d.signers.rows) {
            angular.forEach(vm.d.signers.rows, function (row) {
              row.dob = moment(row.dob).format(frmt);
            });
          }

          // Refresh GUI
          vm.$apply();

        
          // Attachments
          $pnp.sp.web.getFolderByServerRelativeUrl("/sites/cobtest/COBAttach/" + vm.id).files.get().then(function (resp) {
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
}

// Register controller
window.cobApp.controller("cobCtl", cobCtl);
window.cobApp.directive("datepicker", function () {
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
  }
});