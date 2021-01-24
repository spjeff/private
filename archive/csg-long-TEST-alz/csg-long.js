// Dev Context
if (!window._spPageContextInfo) {
  window._spPageContextInfo = {
    webAbsoluteUrl: "https://studytst.lgvreg.com/sites/alz"
  };
}

// Get URL Parameter
function gup(name, url) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var results = new RegExp("[\\?&]" + name + "=?([^&#]*)").exec(
    url || window.location.href
  );
  return results == null ? null : results[1];
}

// Date format
var frmt = 'YYYY-MM-DD';

// Modify drop down menu
function setDropdown(select, field, index) {
  var val = select.value.replace("string:", "");
  if (val != "undefined") {
    if (!index) {
      eval("window.csgCtl.d.injectRow[window.csgCtl.d.inject].visitRow[window.csgCtl.d.visit]." + field + " = '" + val + "'");
    } else {
      eval(
        "window.csgCtl.d.injectRow[window.csgCtl.d.inject].visitRow[window.csgCtl.d.visit]." +
        field.replace("[]", "[" + index + "]") +
        " = '" +
        val +
        "'"
      );
    }
  }
  window.csgCtl.$apply();
}

// Declare controller
function csgCtl($scope) {
  var vm = $scope;
  window.csgCtl = $scope;

  // Config
  vm.listName = "Patient";
  vm.listAudit = "Audit";
  vm.study = "Alzheimer Study";
  vm.validationMessage = null;
  vm.saving = false;
  vm.singlelocation = false;
  vm.attachFolderUrl = "/sites/alz/Attach";



  // Navigate visit
  vm.setVisit = function (visit) {
    // Prepare schema
    for (var i = 0; i <= visit; i++) {
      var test = vm.d.injectRow[vm.d.inject].visitRow[i];
      if (test == undefined) {
        // Provision data objects
        vm.d.injectRow[vm.d.inject].visitRow.push(JSON.parse(JSON.stringify(vm.visitTemplate)));
      }
    }

    // Mark active
    vm.d.visit = visit;
    //vm.$apply()
  };

  vm.ageCalc = function () {
    // https://stackoverflow.com/questions/8152426/hosavew-can-i-calculate-the-number-of-years-betwen-two-dates
    var obj = vm.d.dob;
    if (obj) {
      var dob = new Date(obj);
      var ageDifMs = Date.now() - dob.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return '';
  };

  // Invalid date test
  invalidDate = function (d) {
    return (!d || d == 'Invalid Date');
  }

  // Validate save
  vm.validateSave = function (msg) {
    var txt = '';
    // Personal Info
    if (!vm.d.pid) {
      txt += '\r\n Patient ID';
    }
    if (!vm.d.firstName) {
      txt += '\r\n Personal Info > First Name';
    }
    if (!vm.d.lastName) {
      txt += '\r\n Personal Info > Last Name';
    }
    if (!vm.d.dob) {
      txt += '\r\n Personal Info > Date of Birth';
    }

    if (vm.id) {
      // Infusion Date
      /*
      if (vm.id) {
        for (var i = (vm.d.choiceInject.length); i--; i > 0) {
          if (invalidDate(vm.d.injectRow[i].injectionDate)) {
            txt += 'Missing - Medical Info > Infusion Date'
          }
        }
      }
      */

      // Medical Info
      // for (var i = 0; i < vm.d.choiceInject.length; i++) {
      // for (var j = 0; j < vm.d.injectRow[i].visitRow.length; j++) {

      // if (!vm.d.injectRow[i].visitRow[j].med.height) {
      //   txt += 'Missing - Medical Info > Height';
      // }
      // if (!vm.d.injectRow[i].visitRow[j].med.weight) {
      //   txt += 'Missing - Medical Info > Weight';
      // }
      // if (invalidDate(vm.d.injectRow[i].visitRow[j].med.dob)) {
      //   txt += 'Missing - Medical Info > Date of Birth';
      // }

      // }
      // }

      // Concomitant Medications
      for (var i = 0; i < vm.d.choiceInject.length; i++) {
        for (var j = 0; j < vm.d.injectRow[i].visitRow.length; j++) {
          for (var k = 0; k < vm.d.injectRow[i].visitRow[0].con.meds.length; k++) {
            if (vm.validateConMed(vm.d.injectRow[i].visitRow[0].con.meds[k])) {
              txt += '\r\n Concomitant Medication';
            }
          }
        }
      }

      // Date of Collection
      for (var i = 0; i < vm.d.choiceInject.length; i++) {
        for (var j = 0; j < vm.d.injectRow[i].visitRow.length; j++) {
          if (JSON.stringify(vm.d.injectRow[i].visitRow[j].uri) != "{}") {
            if (!vm.d.injectRow[i].visitRow[j].uri.collectiondate) {
              txt += '\r\n Urinalysis - Date of Collection'
            }
          }
        }
      }

      // Date of Collection
      for (var i = 0; i < vm.d.choiceInject.length; i++) {
        for (var j = 0; j < vm.d.injectRow[i].visitRow.length; j++) {
          if (JSON.stringify(vm.d.injectRow[i].visitRow[j].cbc) != "{}") {
            if (!vm.d.injectRow[i].visitRow[j].cbc.collectiondate) {
              txt += '\r\n CBC - Date of Collection'
            }
          }
        }
      }


      // Date of Collection
      for (var i = 0; i < vm.d.choiceInject.length; i++) {
        for (var j = 0; j < vm.d.injectRow[i].visitRow.length; j++) {
          if (JSON.stringify(vm.d.injectRow[i].visitRow[j].chem) != "{}") {
            if (!vm.d.injectRow[i].visitRow[j].chem.collectiondate) {
              txt += '\r\nSerum Chemistry - Date of Collection'
            }
          }
        }
      }



      // end ID required
    }

    // Display
    if (txt) {
      vm.txtValidation = txt;
      return true
    } else {
      return false
    }
  };

  // Validation
  vm.validateConMed = function (row) {
    return !row.medname || !row.dosage || !row.startDate; // || !row.endDate;
  };

  vm.newSAE = function () {
    var url = 'https://studytst.lgvreg.com/sites/alz/Lists/SAE%20Report/Item/newifs.aspx?List=c723f511-be74-4a08-9c35-256c942f4b8e&Source=https%3A%2F%2Fportal%2Ecourtsquaregroup%2Ecom%2Fsites%2FClientPortal%2FSiteDirectory%2FLongeveron%2FBahamianEDC%2FLists%2FSAE%2520Report%2FAllItems%2Easpx&RootFolder=&Web=236453cf-66d3-498e-83ad-f27fb6084ab6&pid=' + vm.id;
    window.open(url, '_blank');
  };
  vm.viewSAE = function (row) {
    var url = 'https://studytst.lgvreg.com/sites/alz/Lists/SAE%20Report/Item/displayifs.aspx?List=c723f511-be74-4a08-9c35-256c942f4b8e&Source=https%3A%2F%2Fportal%2Ecourtsquaregroup%2Ecom%2Fsites%2FClientPortal%2FSiteDirectory%2FLongeveron%2FBahamianEDC%2FLists%2FSAE%2520Report%2FAllItems%2Easpx&ContentTypeId=0x01007C3D3621847C0741A3CF69E701AA8BA8&ID=' + row.ID;
    window.open(url, '_blank');
  };

  // chagne stie drop down
  vm.siteChange = function () {
    var match = _.filter(vm.choiceLocation, {
      Id: vm.d.location
    })[0];
    vm.d.SiteID = match.SiteID;
  };

  // Audit Log
  vm.writeAudit = function (msg) {
    $pnp.sp.web.lists
      .getByTitle(vm.listAudit)
      .items.add({
        Title: msg
      })
      .then(function (r) {
        console.log(r);
      });
  };

  // Drop down choice
  vm.choiceCollection = "Collected,Not Collected".split(",");
  vm.choiceReact = "Reactive,NonReactive".split(",");
  vm.choiceYesNo = "Yes,No".split(",");
  vm.choiceUrinePreg = "Positive,Negative,N/A".split(",");
  vm.choiceECG = "Received,Not Received".split(",");
  vm.choiceIndication = "1 - Aging Frailty Study,2 - Musculoskeletal impairment due to overuse,3 - is Frailty due to causes other than aging".split(",");
  vm.choiceUrinalysis = "High,Normal,Low".split(",");
  vm.choiceCommonMeds = "Lisinopril,Levothyroxine,Metformin Hydrochloride,Simvastatin,Atorvastatin,Metoprolol,Omeprazole,Acetaminophen/Hydrocodone Bitartrate,Amlodipine Besylate,Hydrochlorothiazide,Albuterol,Gabapentin,Sertraline Hydrochloride,Losartan Potassium,Furosemide,Azithromycin,Acetaminophen,Atenolol,Insulin Human,Fluticasone,Citalopram,Pravastatin Sodium,Alprazolam,Potassium,Amoxicillin,Tramadol Hydrochloride,Montelukast,Trazodone Hydrochloride,Bupropion,Rosuvastatin Calcium,Carvedilol,Prednisone,Ibuprofen,Fluoxetine Hydrochloride,Warfarin,Clopidogrel Bisulfate,Hydrochlorothiazide/Lisinopril,Pantoprazole Sodium,Zolpidem Tartrate,Meloxicam,Clonazepam,Glipizide,Cyclobenzaprine Hydrochloride,Insulin Glargine,Escitalopram Oxalate,Aspirin,Ethinyl Estradiol/Norgestimate,Venlafaxine Hydrochloride,Fluticasone Propionate/Salmeterol Xinafoate,Ranitidine,Fenofibrate,Tamsulosin Hydrochloride,Lorazepam,Amphetamine,Methylphenidate,Duloxetine,Paroxetine,Esomeprazole,Naproxen,Ethinyl Estradiol/Norethindrone,Hydrochlorothiazide/Losartan Potassium,Oxycodone,Allopurinol,Estradiol,Lovastatin,Glimepiride,Diltiazem Hydrochloride,Lamotrigine,Cetirizine Hydrochloride,Quetiapine Fumarate,Ergocalciferol,Clonidine,Pregabalin,Tiotropium,Hydrochlorothiazide/Triamterene,Loratadine,Amitriptyline,Folic Acid,Topiramate,Spironolactone,Insulin Aspart,Budesonide/Formoterol,Propranolol Hydrochloride,Ciprofloxacin,Diclofenac,Diazepam,Valsartan,Ezetimibe,Enalapril Maleate,Alendronate Sodium,Lisdexamfetamine Dimesylate,Cephalexin,Hydroxyzine,Latanoprost,Buspirone Hydrochloride,Desogestrel/Ethinyl Estradiol,Isosorbide Mononitrate,Ramipril,Ferrous Sulfate,Tizanidine,Benazepril Hydrochloride,Divalproex Sodium,Celecoxib,Finasteride,Morphine,Sitagliptin Phosphate,Oxybutynin,Donepezil Hydrochloride,Estrogens, Conjugated,Nifedipine,Docusate,Sulfamethoxazole/Trimethoprim,Amoxicillin/Clavulanate Potassium,Doxycycline,Mometasone,Mirtazapine,Ondansetron,Pioglitazone Hydrochloride,Aripiprazole,Verapamil Hydrochloride,Glyburide,Hydrochlorothiazide/Valsartan,Famotidine,Cyanocobalamin,Hydralazine Hydrochloride,Methocarbamol,Digoxin,Risperidone,Cholecalciferol/Alpha-Tocopherol,Levetiracetam,Hydroxychloroquine Sulfate,Amlodipine Besylate/Benazepril Hydrochloride,HCTZ/Propranolol Hydrochloride,Testosterone,Sumatriptan,Levofloxacin,Hydrocortisone,Insulin Lispro,Prednisolone,Omega-3-acid Ethyl Esters,Nebivolol Hydrochloride,Lansoprazole,Nitroglycerin,Temazepam,Insulin Detemir,Baclofen,Doxazosin Mesylate,Gemfibrozil,Terazosin,Promethazine Hydrochloride,Carisoprodol,Albuterol Sulfate/Ipratropium Bromide,Ropinirole Hydrochloride,Triamcinolone,Drospirenone/Ethinyl Estradiol,Phenytoin,Acyclovir,Atenolol/Chlorthalidone,Ethinyl Estradiol/Levonorgestrel,Oxcarbazepine,Benzonatate,Brimonidine Tartrate,Methylprednisolone,Meclizine Hydrochloride,Lithium,Benztropine Mesylate,Olmesartan Medoxomil,Sodium,Sodium Fluoride,Phentermine,Clindamycin,Fluconazole,Budesonide,Rivaroxaban,Clobetasol Propionate,Calcium,Travoprost,Amiodarone Hydrochloride,Nortriptyline Hydrochloride,Memantine Hydrochloride,Ezetimibe/Simvastatin,Penicillin V,Mesalamine,Magnesium,Guaifenesin,Levocetirizine Dihydrochloride,Thyroid,Dabigatran Etexilate Mesylate,Metformin HCl/Sitagliptin Phosphate,Beclomethasone,Quinapril,Valacyclovir,Ipratropium,Chlorthalidone,Liraglutide,Dexmethylphenidate Hydrochloride,Anastrozole,Diphenhydramine Hydrochloride,Nystatin,Desvenlafaxine,OTHER".split(
    ","
  );
  vm.choiceCountries = [{
      abbr: "OT",
      country: "Other"
    },
    {
      abbr: "US",
      country: "United States"
    },
    {
      abbr: "AF",
      country: "Afghanistan"
    },
    {
      abbr: "AL",
      country: "Albania"
    },
    {
      abbr: "DZ",
      country: "Algeria"
    },
    {
      abbr: "AS",
      country: "American Samoa"
    },
    {
      abbr: "AD",
      country: "Andorra"
    },
    {
      abbr: "AO",
      country: "Angola"
    },
    {
      abbr: "AI",
      country: "Anguilla"
    },
    {
      abbr: "AQ",
      country: "Antarctica"
    },
    {
      abbr: "AG",
      country: "Antigua And Barbuda"
    },
    {
      abbr: "AR",
      country: "Argentina"
    },
    {
      abbr: "AM",
      country: "Armenia"
    },
    {
      abbr: "AW",
      country: "Aruba"
    },
    {
      abbr: "AU",
      country: "Australia"
    },
    {
      abbr: "AT",
      country: "Austria"
    },
    {
      abbr: "AZ",
      country: "Azerbaijan"
    },
    {
      abbr: "BS",
      country: "Bahamas"
    },
    {
      abbr: "BH",
      country: "Bahrain"
    },
    {
      abbr: "BD",
      country: "Bangladesh"
    },
    {
      abbr: "BB",
      country: "Barbados"
    },
    {
      abbr: "BY",
      country: "Belarus"
    },
    {
      abbr: "BE",
      country: "Belgium"
    },
    {
      abbr: "BZ",
      country: "Belize"
    },
    {
      abbr: "BJ",
      country: "Benin"
    },
    {
      abbr: "BM",
      country: "Bermuda"
    },
    {
      abbr: "BT",
      country: "Bhutan"
    },
    {
      abbr: "BO",
      country: "Bolivia"
    },
    {
      abbr: "BA",
      country: "Bosnia And Herzegovina"
    },
    {
      abbr: "BW",
      country: "Botswana"
    },
    {
      abbr: "BV",
      country: "Bouvet Island"
    },
    {
      abbr: "BR",
      country: "Brazil"
    },
    {
      abbr: "IO",
      country: "British Indian Ocean Territory"
    },
    {
      abbr: "BN",
      country: "Brunei Darussalam"
    },
    {
      abbr: "BG",
      country: "Bulgaria"
    },
    {
      abbr: "BF",
      country: "Burkina Faso"
    },
    {
      abbr: "BI",
      country: "Burundi"
    },
    {
      abbr: "KH",
      country: "Cambodia"
    },
    {
      abbr: "CM",
      country: "Cameroon"
    },
    {
      abbr: "CA",
      country: "Canada"
    },
    {
      abbr: "CV",
      country: "Cape Verde"
    },
    {
      abbr: "KY",
      country: "Cayman Islands"
    },
    {
      abbr: "CF",
      country: "Central African Republic"
    },
    {
      abbr: "TD",
      country: "Chad"
    },
    {
      abbr: "CL",
      country: "Chile"
    },
    {
      abbr: "CN",
      country: "China"
    },
    {
      abbr: "CX",
      country: "Christmas Island"
    },
    {
      abbr: "CC",
      country: "Cocos (keeling) Islands"
    },
    {
      abbr: "CO",
      country: "Colombia"
    },
    {
      abbr: "KM",
      country: "Comoros"
    },
    {
      abbr: "CG",
      country: "Congo"
    },
    {
      abbr: "CK",
      country: "Cook Islands"
    },
    {
      abbr: "CR",
      country: "Costa Rica"
    },
    {
      abbr: "CI",
      country: "Cote D'ivoire"
    },
    {
      abbr: "HR",
      country: "Croatia"
    },
    {
      abbr: "CU",
      country: "Cuba"
    },
    {
      abbr: "CY",
      country: "Cyprus"
    },
    {
      abbr: "CZ",
      country: "Czech Republic"
    },
    {
      abbr: "DK",
      country: "Denmark"
    },
    {
      abbr: "DJ",
      country: "Djibouti"
    },
    {
      abbr: "DM",
      country: "Dominica"
    },
    {
      abbr: "DO",
      country: "Dominican Republic"
    },
    {
      abbr: "TP",
      country: "East Timor"
    },
    {
      abbr: "EC",
      country: "Ecuador"
    },
    {
      abbr: "EG",
      country: "Egypt"
    },
    {
      abbr: "SV",
      country: "El Salvador"
    },
    {
      abbr: "GQ",
      country: "Equatorial Guinea"
    },
    {
      abbr: "ER",
      country: "Eritrea"
    },
    {
      abbr: "EE",
      country: "Estonia"
    },
    {
      abbr: "ET",
      country: "Ethiopia"
    },
    {
      abbr: "FK",
      country: "Falkland Islands (malvinas)"
    },
    {
      abbr: "FO",
      country: "Faroe Islands"
    },
    {
      abbr: "FJ",
      country: "Fiji"
    },
    {
      abbr: "FI",
      country: "Finland"
    },
    {
      abbr: "FR",
      country: "France"
    },
    {
      abbr: "GF",
      country: "French Guiana"
    },
    {
      abbr: "PF",
      country: "French Polynesia"
    },
    {
      abbr: "TF",
      country: "French Southern Territories"
    },
    {
      abbr: "GA",
      country: "Gabon"
    },
    {
      abbr: "GM",
      country: "Gambia"
    },
    {
      abbr: "GE",
      country: "Georgia"
    },
    {
      abbr: "DE",
      country: "Germany"
    },
    {
      abbr: "GH",
      country: "Ghana"
    },
    {
      abbr: "GI",
      country: "Gibraltar"
    },
    {
      abbr: "GR",
      country: "Greece"
    },
    {
      abbr: "GL",
      country: "Greenland"
    },
    {
      abbr: "GD",
      country: "Grenada"
    },
    {
      abbr: "GP",
      country: "Guadeloupe"
    },
    {
      abbr: "GU",
      country: "Guam"
    },
    {
      abbr: "GT",
      country: "Guatemala"
    },
    {
      abbr: "GN",
      country: "Guinea"
    },
    {
      abbr: "GW",
      country: "Guinea-bissau"
    },
    {
      abbr: "GY",
      country: "Guyana"
    },
    {
      abbr: "HT",
      country: "Haiti"
    },
    {
      abbr: "HM",
      country: "Heard Island And Mcdonald Islands"
    },
    {
      abbr: "VA",
      country: "Holy See (vatican City State)"
    },
    {
      abbr: "HN",
      country: "Honduras"
    },
    {
      abbr: "HK",
      country: "Hong Kong"
    },
    {
      abbr: "HU",
      country: "Hungary"
    },
    {
      abbr: "IS",
      country: "Iceland"
    },
    {
      abbr: "IN",
      country: "India"
    },
    {
      abbr: "ID",
      country: "Indonesia"
    },
    {
      abbr: "IR",
      country: "Iran, Islamic Republic Of"
    },
    {
      abbr: "IQ",
      country: "Iraq"
    },
    {
      abbr: "IE",
      country: "Ireland"
    },
    {
      abbr: "IL",
      country: "Israel"
    },
    {
      abbr: "IT",
      country: "Italy"
    },
    {
      abbr: "JM",
      country: "Jamaica"
    },
    {
      abbr: "JP",
      country: "Japan"
    },
    {
      abbr: "JO",
      country: "Jordan"
    },
    {
      abbr: "KZ",
      country: "Kazakstan"
    },
    {
      abbr: "KE",
      country: "Kenya"
    },
    {
      abbr: "KI",
      country: "Kiribati"
    },
    {
      abbr: "KP",
      country: "Korea, Democratic People's Republic Of"
    },
    {
      abbr: "KR",
      country: "Korea, Republic Of"
    },
    {
      abbr: "KV",
      country: "Kosovo"
    },
    {
      abbr: "KW",
      country: "Kuwait"
    },
    {
      abbr: "KG",
      country: "Kyrgyzstan"
    },
    {
      abbr: "LA",
      country: "Lao People's Democratic Republic"
    },
    {
      abbr: "LV",
      country: "Latvia"
    },
    {
      abbr: "LB",
      country: "Lebanon"
    },
    {
      abbr: "LS",
      country: "Lesotho"
    },
    {
      abbr: "LR",
      country: "Liberia"
    },
    {
      abbr: "LY",
      country: "Libyan Arab Jamahiriya"
    },
    {
      abbr: "LI",
      country: "Liechtenstein"
    },
    {
      abbr: "LT",
      country: "Lithuania"
    },
    {
      abbr: "LU",
      country: "Luxembourg"
    },
    {
      abbr: "MO",
      country: "Macau"
    },
    {
      abbr: "MK",
      country: "Macedonia"
    },
    {
      abbr: "MG",
      country: "Madagascar"
    },
    {
      abbr: "MW",
      country: "Malawi"
    },
    {
      abbr: "MY",
      country: "Malaysia"
    },
    {
      abbr: "MV",
      country: "Maldives"
    },
    {
      abbr: "ML",
      country: "Mali"
    },
    {
      abbr: "MT",
      country: "Malta"
    },
    {
      abbr: "MH",
      country: "Marshall Islands"
    },
    {
      abbr: "MQ",
      country: "Martinique"
    },
    {
      abbr: "MR",
      country: "Mauritania"
    },
    {
      abbr: "MU",
      country: "Mauritius"
    },
    {
      abbr: "YT",
      country: "Mayotte"
    },
    {
      abbr: "MX",
      country: "Mexico"
    },
    {
      abbr: "FM",
      country: "Micronesia, Federated States Of"
    },
    {
      abbr: "MD",
      country: "Moldova, Republic Of"
    },
    {
      abbr: "MC",
      country: "Monaco"
    },
    {
      abbr: "MN",
      country: "Mongolia"
    },
    {
      abbr: "MS",
      country: "Montserrat"
    },
    {
      abbr: "ME",
      country: "Montenegro"
    },
    {
      abbr: "MA",
      country: "Morocco"
    },
    {
      abbr: "MZ",
      country: "Mozambique"
    },
    {
      abbr: "MM",
      country: "Myanmar"
    },
    {
      abbr: "NA",
      country: "Namibia"
    },
    {
      abbr: "NR",
      country: "Nauru"
    },
    {
      abbr: "NP",
      country: "Nepal"
    },
    {
      abbr: "NL",
      country: "Netherlands"
    },
    {
      abbr: "AN",
      country: "Netherlands Antilles"
    },
    {
      abbr: "NC",
      country: "New Caledonia"
    },
    {
      abbr: "NZ",
      country: "New Zealand"
    },
    {
      abbr: "NI",
      country: "Nicaragua"
    },
    {
      abbr: "NE",
      country: "Niger"
    },
    {
      abbr: "NG",
      country: "Nigeria"
    },
    {
      abbr: "NU",
      country: "Niue"
    },
    {
      abbr: "NF",
      country: "Norfolk Island"
    },
    {
      abbr: "MP",
      country: "Northern Mariana Islands"
    },
    {
      abbr: "NO",
      country: "Norway"
    },
    {
      abbr: "OM",
      country: "Oman"
    },
    {
      abbr: "PK",
      country: "Pakistan"
    },
    {
      abbr: "PW",
      country: "Palau"
    },
    {
      abbr: "PS",
      country: "Palestinian Territory, Occupied"
    },
    {
      abbr: "PA",
      country: "Panama"
    },
    {
      abbr: "PG",
      country: "Papua New Guinea"
    },
    {
      abbr: "PY",
      country: "Paraguay"
    },
    {
      abbr: "PE",
      country: "Peru"
    },
    {
      abbr: "PH",
      country: "Philippines"
    },
    {
      abbr: "PN",
      country: "Pitcairn"
    },
    {
      abbr: "PL",
      country: "Poland"
    },
    {
      abbr: "PT",
      country: "Portugal"
    },
    {
      abbr: "PR",
      country: "Puerto Rico"
    },
    {
      abbr: "QA",
      country: "Qatar"
    },
    {
      abbr: "RE",
      country: "Reunion"
    },
    {
      abbr: "RO",
      country: "Romania"
    },
    {
      abbr: "RU",
      country: "Russian Federation"
    },
    {
      abbr: "RW",
      country: "Rwanda"
    },
    {
      abbr: "SH",
      country: "Saint Helena"
    },
    {
      abbr: "KN",
      country: "Saint Kitts And Nevis"
    },
    {
      abbr: "LC",
      country: "Saint Lucia"
    },
    {
      abbr: "PM",
      country: "Saint Pierre And Miquelon"
    },
    {
      abbr: "VC",
      country: "Saint Vincent And The Grenadines"
    },
    {
      abbr: "WS",
      country: "Samoa"
    },
    {
      abbr: "SM",
      country: "San Marino"
    },
    {
      abbr: "ST",
      country: "Sao Tome And Principe"
    },
    {
      abbr: "SA",
      country: "Saudi Arabia"
    },
    {
      abbr: "SN",
      country: "Senegal"
    },
    {
      abbr: "RS",
      country: "Serbia"
    },
    {
      abbr: "SC",
      country: "Seychelles"
    },
    {
      abbr: "SL",
      country: "Sierra Leone"
    },
    {
      abbr: "SG",
      country: "Singapore"
    },
    {
      abbr: "SK",
      country: "Slovakia"
    },
    {
      abbr: "SI",
      country: "Slovenia"
    },
    {
      abbr: "SB",
      country: "Solomon Islands"
    },
    {
      abbr: "SO",
      country: "Somalia"
    },
    {
      abbr: "ZA",
      country: "South Africa"
    },
    {
      abbr: "ES",
      country: "Spain"
    },
    {
      abbr: "LK",
      country: "Sri Lanka"
    },
    {
      abbr: "SD",
      country: "Sudan"
    },
    {
      abbr: "SR",
      country: "Suriname"
    },
    {
      abbr: "SJ",
      country: "Svalbard And Jan Mayen"
    },
    {
      abbr: "SZ",
      country: "Swaziland"
    },
    {
      abbr: "SE",
      country: "Sweden"
    },
    {
      abbr: "CH",
      country: "Switzerland"
    },
    {
      abbr: "SY",
      country: "Syrian Arab Republic"
    },
    {
      abbr: "TW",
      country: "Taiwan, Province Of China"
    },
    {
      abbr: "TJ",
      country: "Tajikistan"
    },
    {
      abbr: "TZ",
      country: "Tanzania, United Republic Of"
    },
    {
      abbr: "TH",
      country: "Thailand"
    },
    {
      abbr: "TG",
      country: "Togo"
    },
    {
      abbr: "TK",
      country: "Tokelau"
    },
    {
      abbr: "TO",
      country: "Tonga"
    },
    {
      abbr: "TT",
      country: "Trinidad And Tobago"
    },
    {
      abbr: "TN",
      country: "Tunisia"
    },
    {
      abbr: "TR",
      country: "Turkey"
    },
    {
      abbr: "TM",
      country: "Turkmenistan"
    },
    {
      abbr: "TC",
      country: "Turks And Caicos Islands"
    },
    {
      abbr: "TV",
      country: "Tuvalu"
    },
    {
      abbr: "UG",
      country: "Uganda"
    },
    {
      abbr: "UA",
      country: "Ukraine"
    },
    {
      abbr: "AE",
      country: "United Arab Emirates"
    },
    {
      abbr: "GB",
      country: "United Kingdom"
    },
    {
      abbr: "UM",
      country: "United States Minor Outlying Islands"
    },
    {
      abbr: "UY",
      country: "Uruguay"
    },
    {
      abbr: "UZ",
      country: "Uzbekistan"
    },
    {
      abbr: "VU",
      country: "Vanuatu"
    },
    {
      abbr: "VE",
      country: "Venezuela"
    },
    {
      abbr: "VN",
      country: "Viet Nam"
    },
    {
      abbr: "VG",
      country: "Virgin Islands, British"
    },
    {
      abbr: "VI",
      country: "Virgin Islands, U.s."
    },
    {
      abbr: "WF",
      country: "Wallis And Futuna"
    },
    {
      abbr: "EH",
      country: "Western Sahara"
    },
    {
      abbr: "YE",
      country: "Yemen"
    },
    {
      abbr: "ZM",
      country: "Zambia"
    },
    {
      abbr: "ZW",
      country: "Zimbabwe"
    }
  ];

  vm.states = [{
      abbr: "OT",
      state: "Other"
    },
    {
      state: "ALABAMA",
      abbr: "AL"
    },
    {
      state: "ALASKA",
      abbr: "AK"
    },
    {
      state: "ARIZONA",
      abbr: "AZ"
    },
    {
      state: "ARKANSAS",
      abbr: "AR"
    },
    {
      state: "CALIFORNIA",
      abbr: "CA"
    },
    {
      state: "COLORADO",
      abbr: "CO"
    },
    {
      state: "CONNECTICUT",
      abbr: "CT"
    },
    {
      state: "DELAWARE",
      abbr: "DE"
    },
    {
      state: "FLORIDA",
      abbr: "FL"
    },
    {
      state: "GEORGIA",
      abbr: "GA"
    },
    {
      state: "HAWAII",
      abbr: "HI"
    },
    {
      state: "IDAHO",
      abbr: "ID"
    },
    {
      state: "ILLINOIS",
      abbr: "IL"
    },
    {
      state: "INDIANA",
      abbr: "IN"
    },
    {
      state: "IOWA",
      abbr: "IA"
    },
    {
      state: "KANSAS",
      abbr: "KS"
    },
    {
      state: "KENTUCKY",
      abbr: "KY"
    },
    {
      state: "LOUISIANA",
      abbr: "LA"
    },
    {
      state: "MAINE",
      abbr: "ME"
    },
    {
      state: "MARYLAND",
      abbr: "MD"
    },
    {
      state: "MASSACHUSETTS",
      abbr: "MA"
    },
    {
      state: "MICHIGAN",
      abbr: "MI"
    },
    {
      state: "MINNESOTA",
      abbr: "MN"
    },
    {
      state: "MISSISSIPPI",
      abbr: "MS"
    },
    {
      state: "MISSOURI",
      abbr: "MO"
    },
    {
      state: "MONTANA",
      abbr: "MT"
    },
    {
      state: "NEBRASKA",
      abbr: "NE"
    },
    {
      state: "NEVADA",
      abbr: "NV"
    },
    {
      state: "NEW HAMPSHIRE",
      abbr: "NH"
    },
    {
      state: "NEW JERSEY",
      abbr: "NJ"
    },
    {
      state: "NEW MEXICO",
      abbr: "NM"
    },
    {
      state: "NEW YORK",
      abbr: "NY"
    },
    {
      state: "NORTH CAROLINA",
      abbr: "NC"
    },
    {
      state: "NORTH DAKOTA",
      abbr: "ND"
    },
    {
      state: "OHIO",
      abbr: "OH"
    },
    {
      state: "OKLAHOMA",
      abbr: "OK"
    },
    {
      state: "OREGON",
      abbr: "OR"
    },
    {
      state: "PENNSYLVANIA",
      abbr: "PA"
    },
    {
      state: "RHODE ISLAND",
      abbr: "RI"
    },
    {
      state: "SOUTH CAROLINA",
      abbr: "SC"
    },
    {
      state: "SOUTH DAKOTA",
      abbr: "SD"
    },
    {
      state: "TENNESSEE",
      abbr: "TN"
    },
    {
      state: "TEXAS",
      abbr: "TX"
    },
    {
      state: "UTAH",
      abbr: "UT"
    },
    {
      state: "VERMONT",
      abbr: "VT"
    },
    {
      state: "VIRGINIA",
      abbr: "VA"
    },
    {
      state: "WASHINGTON",
      abbr: "WA"
    },
    {
      state: "WEST VIRGINIA",
      abbr: "WV"
    },
    {
      state: "WISCONSIN",
      abbr: "WI"
    },
    {
      state: "WYOMING",
      abbr: "WY"
    },
    {
      state: "GUAM",
      abbr: "GU"
    },
    {
      state: "PUERTO RICO",
      abbr: "PR"
    },
    {
      state: "VIRGIN ISLANDS",
      abbr: "VI"
    }
  ];

  // Visit Data Template
  vm.visitTemplate = {
    con: {
      meds: []
    },
    ae: {
      events: [{}]
    },
    med: {
      weight: undefined,
      height: undefined,
      dob: undefined
    },
    cbc: {},
    chem: {},
    sero: {},
    coag: {},
    uri: {}
  };

  // Data defaults
  vm.d = {
    visit: 0,
    inject: 0,
    physician: {},
    injectRow: [{
      visitRow: []
    }],
    choiceInject: [{
      index: 0,
      display: 1
    }],
    indication: '1 - Aging Frailty Study'
  };
  vm.d.injectRow[0].visitRow.push(JSON.parse(JSON.stringify(vm.visitTemplate)));


  // Table row events
  vm.addInject = function () {
    var x = vm.d.choiceInject.length + 1;

    vm.d.choiceInject.push({
      index: x - 1,
      display: x
    });
    vm.d.inject = x - 1;

    // Injections
    var newInjectRow = {
      visitRow: []
    };
    newInjectRow.visitRow.push(JSON.parse(JSON.stringify(vm.visitTemplate)));
    vm.d.injectRow.push(newInjectRow);

  };
  vm.addConmed = function () {
    vm.d.injectRow[vm.d.inject].visitRow[vm.d.visit].con.meds.push({});
    window.setTimeout(function () {
      // Chosen
      $(".chosen-select").select2({
        tags: true
      });
    }, 250);
  };
  vm.addAE = function () {
    vm.d.injectRow[vm.d.inject].visitRow[vm.d.visit].ae.events.push({});
  };
  vm.removeAE = function (index) {
    vm.d.injectRow[vm.d.inject].visitRow[vm.d.visit].ae.events.splice(index, 1);
  };
  vm.removeConmed = function (index) {
    vm.d.injectRow[vm.d.inject].visitRow[vm.d.visit].con.meds.splice(index, 1);
  };
  vm.preFill = function () {
    var vn = vm.d.visit - 1;
    if (vn < 0) {
      vn = 0;
    }
    vm.d.injectRow[vm.d.inject].visitRow[vm.d.visit].con.meds = JSON.parse(JSON.stringify(vm.d.injectRow[vm.d.inject].visitRow[vn].con.meds));
  }
  vm.preFillMedInfo = function () {
    var vn = vm.d.visit - 1;
    var injectID = vm.d.inject;
    if (vn < 0) {
      vn = 0;
      injectID = vm.d.inject - 1
    }
    vm.d.injectRow[vm.d.inject].visitRow[vm.d.visit].med = JSON.parse(JSON.stringify(vm.d.injectRow[injectID].visitRow[vn].med));
    //REM vm.d.injectRow[vm.d.inject].visitRow[vm.d.visit].med.dob = moment(vm.d.injectRow[injectID].visitRow[vn].med.dob).format(frmt);
  }


  // Save to SharePoint List
  vm.save = function () {

    if (!vm.saving) {
      // Exit if missing required fields
      var invalid = vm.validateSave('msg');
      if (invalid) {
        return
      }

      // Lock save button
      vm.saving = true;
      console.log("save");
      vm.writeAudit("Save Patient ID " + vm.id);

      // DOB and more
      var dob = vm.d.dob.toString();
      var Ethnicity = vm.d.injectRow[vm.d.inject].visitRow[vm.d.visit].med.ethnicity;
      var Sex = vm.d.injectRow[vm.d.inject].visitRow[vm.d.visit].med.sex;
      var Age = vm.ageCalc().toString();
      dob = moment(dob).format('MM/DD/YYYY');
      var PatientID = vm.d.SiteID + "-" + vm.d.pid;

      if (vm.id && vm.id != "undefined") {
        // UPDATE if have ID
        $pnp.sp.web.lists
          .getByTitle(vm.listName)
          .items.getById(vm.id)
          .update({
            Title: vm.d.firstName + ' ' + vm.d.lastName,
            JSON: angular.toJson(window.csgCtl.d),
            DOB: dob,
            Ethnicity: Ethnicity,
            Sex: Sex,
            Age: Age,
            Street: vm.d.address,
            City: vm.d.city,
            State: vm.d.selectState,
            Indication: vm.d.indication,
            LocationId: vm.d.location,
            PatientID: PatientID
          })
          .then(function (r) {
            // response
            console.log(r);
            toastr.success("Saved");
            vm.saving = false;
          });
      } else {
        // INSERT if missing
        $pnp.sp.web.lists
          .getByTitle(vm.listName)
          .items.add({
            Title: vm.d.firstName + ' ' + vm.d.lastName,
            JSON: angular.toJson(window.csgCtl.d),
            DOB: dob,
            Ethnicity: Ethnicity,
            Sex: Sex,
            Age: Age,
            Street: vm.d.address,
            City: vm.d.city,
            State: vm.d.selectState,
            Indication: vm.d.indication,
            LocationId: vm.d.location,
            PatientID: PatientID
          })
          .then(function (r) {
            // response
            console.log(r);
            document.location.href += "?id=" + r.data.Id;
            toastr.success("Saved");
            vm.saving = false;
          });
      }
    }
  };

  // Init
  vm.load = function () {

    $pnp.setup({
      headers: {
        "Accept": "application/json; odata=verbose"
      }
    });


    // Location lookup
    var caml = '<View><ViewFields><FieldRef Name="ID" /><FieldRef Name="Title" /><FieldRef Name="SiteID" /></ViewFields><Query><OrderBy><FieldRef Name="ID" /></OrderBy><Where><Eq><FieldRef Name="Users" /><Value Type="Integer"><UserID Type="Integer" /></Value></Eq></Where></Query></View>';
    var q = {
      ViewXml: caml
    };
    $pnp.sp.web.lists
      .getByTitle('Locations')
      .getItemsByCAMLQuery(q)
      .then(function (resp) {
        // JSON Location
        vm.choiceLocation = resp;
        if (vm.choiceLocation.length == 1) {
          vm.singlelocation = true;
          vm.d.location = vm.choiceLocation[0].Id;
          vm.d.SiteID = vm.choiceLocation[0].SiteID;
        }
        vm.$apply();

        vm.id = gup("id");
        if (vm.id) {
          // Read JSON current -- Patient
          $pnp.sp.web.lists
            .getByTitle(vm.listName)
            .items.getById(vm.id)
            .get()
            .then(function (r) {
              // Save JSON to view model
              vm.d = JSON.parse(r.JSON);

              // Date Format
              for (var i = 0; i < vm.d.injectRow.length; i++) {
                if (vm.d.injectRow[i].injectionDate) {
                  vm.d.injectRow[i].injectionDate = moment(vm.d.injectRow[i].injectionDate).format(frmt);
                }
                for (var j = 0; j < vm.d.injectRow[i].visitRow.length; j++) {

                  // DOB
                  vm.d.injectRow[i].visitRow[j].med.dob = moment(vm.d.injectRow[i].visitRow[j].med.dob).format(frmt);

                  // Con Medications
                  if (vm.d.injectRow[i].visitRow[j].con) {
                    for (var k = 0; k < vm.d.injectRow[i].visitRow[j].con.meds.length; k++) {
                      vm.d.injectRow[i].visitRow[j].con.meds[k].startDate = moment(vm.d.injectRow[i].visitRow[j].con.meds[k].startDate).format(frmt);
                      //vm.d.injectRow[i].visitRow[j].con.meds[k].endDate = moment(vm.d.injectRow[i].visitRow[j].con.meds[k].endDate).format(frmt);
                    }
                  }

                  // Events
                  if (vm.d.injectRow[i].visitRow[j].ae) {
                    for (var k = 0; k < vm.d.injectRow[i].visitRow[j].ae.events.length; k++) {
                      vm.d.injectRow[i].visitRow[j].ae.events[k].eventdate = moment(vm.d.injectRow[i].visitRow[j].ae.events[k].eventdate).format(frmt);
                    }
                  }
                }
              }

              // Attachments
              window.setTimeout(function () {
                $pnp.sp.web
                  .getFolderByServerRelativeUrl(vm.attachFolderUrl + "/" + vm.id)
                  .files.get()
                  .then(function (resp) {
                    vm.uploadFiles = resp;

                    // Refresh
                    vm.$apply();
                  });
              }, 500);

              // SAE
              var query = "<Where><Eq><FieldRef Name='Patient_x0020_ID' /><Value Type='Text'>" + vm.id + "</Value></Eq></Where>";
              var caml = {
                ViewXml: "<View><Query>" + query + "</Query><ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /></ViewFields></View>"
              };
              $pnp.sp.web.lists
                .getByTitle('AE Report')
                .getItemsByCAMLQuery(caml)
                .then(function (respSAE) {
                  vm.respSAE = respSAE;
                });

              // Audit
              vm.writeAudit("User viewed ID " + vm.id);
            });

          // Refresh
          vm.$apply();
        }
      });
  };
  vm.load();

  vm.cancel = function () {
    document.location.href =
      "https://studytst.lgvreg.com/sites/alz";
  };

  // Upload
  vm.upload = function () {
    var control = document.getElementById("uploadFile");
    var file = control.files[0];
    var folderAttach = $pnp.sp.web.getFolderByServerRelativeUrl(
      vm.attachFolderUrl
    );
    folderAttach.folders.add(vm.id).then(function (respFolder) {
      var folder = $pnp.sp.web.getFolderByServerRelativeUrl(
        vm.attachFolderUrl + "/" + vm.id
      );
      folder.files.add(file.name, file, true).then(function (respFile) {
        // Uploaded File
        console.log(respFile);

        // Attachments
        window.setTimeout(function () {
          $pnp.sp.web
            .getFolderByServerRelativeUrl(vm.attachFolderUrl + "/" + vm.id)
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
}

// Angular - Boot
window.csgApp = angular.module("csgApp", []).controller("csgCtl", csgCtl);
window.csgApp.directive("datepicker", function () {
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
        dateFormat: "mm-dd-yy",
        onSelect: function (dateText) {
          updateModel(dateText);
        }
      };
      $(elem).datepicker(options);
    }
  }
});

// JQuery - Boot
$(document).ready(function () {
  window.setTimeout(function () {
    // Chosen
    // $(".chosen-select").select2({
    // tags: true
    // });

  }, 1000);


  // Tabs
  $("#tabs")
    .tabs({
      activate: function (event, ui) {
        // Change Tab Event
        // Chosen

        //        $(".chosen-select").select2({
        //tags: true
        //});

      }
    })
    .addClass("ui-tabs-vertical ui-helper-clearfix");
});