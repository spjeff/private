<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Longeveron - EDC (version 1.6)</title>

  <!-- AngularJS + JQuery -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.2/angular.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.2/angular-route.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"></script>

  <!-- PNP + Icon -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <!-- script src="https://cdnjs.cloudflare.com/ajax/libs/sp-pnp-js/3.0.10/pnp.min.js"></script -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>

  <!-- Toastr -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.css" />

  <!-- Bootstrap -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

  <!-- PNP -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
    integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.0.5/es6-promise.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.2/fetch.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sp-pnp-js/2.0.1/pnp.min.js"></script>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/css/select2.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/js/select2.min.js"></script>

  <!-- App -->
  <link rel="stylesheet" href="csg-long.css?v=112218" />
  <script src="csg-long.js?v=112218"></script>
</head>

<body>
  <div ng-app="csgApp">
    <div ng-controller="csgCtl" ng-cloak>
      <div>
        <table>
          <tr>
            <td>
              <a href="https://studytst.lgvreg.com/sites/aging">
                <img src="long.png" alt="" id="logo" />
              </a>
            </td>
            <td>
              <h1 class="title">{{ study }}</h1>
            </td>
            <td style="text-align: right"></td>
          </tr>
        </table>

        <div id="tabs">
          <ul>
            <li><a href="#a">Personal Info</a></li>
            <li ng-show="id"><a href="#b">Medical Info</a></li>
            <li ng-show="id"><a href="#c">Concomitant Med.</a></li>
            <li ng-show="id"><a href="#d">Urinalysis</a></li>
            <li ng-show="id"><a href="#e">CBC</a></li>
            <li ng-show="id"><a href="#f">Serum Chemistry</a></li>
            <li ng-show="id"><a href="#g">Serology Info.</a></li>
            <li ng-show="id"><a href="#h">Coagulation Info.</a></li>
            <li ng-show="id"><a href="#i">AE/SAE</a></li>
            <!-- <li ng-show="id"><a href="#j">File Upload</a></li> -->
          </ul>
          <div class="csg-content" id="a">
            <table border=0>
              <tr>
                <td colspan="4">
                  <!-- Error Display -->
                  <div ng-show="validationMessage" class="csg-invalid">
                    {{ validationMessage }}
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <h2>
                    <table>
                      <tr>
                        <td><span style="white-space: nowrap">Patient ID: {{ d.SiteID }}-</span> </td>
                        <td><input type="text" name="" id="" ng-model="d.pid" size="5"
                            ng-class="{'csg-required-field': !d.pid}"></td>
                      </tr>
                    </table>
                  </h2>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colspan="4">
                  <h2>Site Information</h2>
                </td>
              </tr>
              <tr>
                <td class="csg-label">Site</td>
                <td>

                  <!-- Location -->
                  <div>
                    <select name="" id="" ng-model="d.location" ng-options="x.Id as x.Title for x in choiceLocation"
                      ng-change="siteChange()"></select>
                    {{}}
                  </div>

                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <h2>Contact Information</h2>
                </td>
              </tr>
              <tr>
                <td class="csg-label">First Name</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.firstName"
                    ng-class="{'csg-required-field': !d.firstName}" />
                </td>
                <td class="csg-label">Last Name</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.lastName"
                    ng-class="{'csg-required-field': !d.lastName}" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">Date of Birth</td>
                <td>
                  <input type="text" datepicker name="" id="" ng-model="d.dob" ng-class="{'csg-required-field': !d.dob}"
                    placeholder="mm-dd-yyyy" />
                  <i class="fa calendar-0"></i>
                </td>
                <td class="csg-label" colspan="2">
                  <b> Age {{ ageCalc() }}</b>
                </td>
              </tr>
              <tr>
                <td class="csg-label">Address</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.address" />
                </td>
                <td class="csg-label">City</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.city" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">State/Prov</td>
                <td>
                  <select ng-model="d.selectState" ng-options="x.abbr as x.state for x in states"
                    onchange="setDropdown(this, 'selectState')"></select>

                  <input type="text" maxlength="150" name="" id="" ng-model="d.selectStateOther"
                    placeholder="Type state here" ng-show="d.selectState == 'OT'" />
                </td>
                <td class="csg-label">Postal Code</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.postal" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">Country</td>
                <td>
                  <select class="chosen-select" name="" id="" ng-model="d.selectCountry"
                    ng-options="x.abbr as x.country for x in choiceCountries"
                    onchange="setDropdown(this, 'selectCountry')"></select>
                  <input type="text" maxlength="150" name="" id="" ng-model="d.selectCountryOther"
                    placeholder="Type country here" ng-show="d.selectCountry == 'OT'" />
                </td>
                <td class="csg-label">Home Phone</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.homephone" placeholder="(__) ___ - ____" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">Cell Phone</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.cellphone" placeholder="(__) ___ - ____" />
                </td>
                <td class="csg-label">Email</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.email" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">Height (in)</td>
                <td class="csg-leftcol-med">
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.height" />
                  <!--
                      ng-class="{'csg-required-field': !d.injectRow[d.inject].visitRow[d.visit].med.height}">
                    -->
                </td>
                <td class="csg-label">Ethnicity</td>
                <td class="csg-leftcol-med">
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.ethnicity" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">Weight (lbs)</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.weight" />
                  <!--
                      ng-class="{'csg-required-field': !d.injectRow[d.inject].visitRow[d.visit].med.weight}">
                    -->
                </td>
                <td class="csg-label">Sex</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.sex" />
                </td>
              </tr>


              <tr>
                <td colspan="4">
                  <h2>Private Physician Information</h2>
                </td>
              </tr>

              <tr>
                <td class="csg-label">First Name</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.physician.firstName" />
                </td>
                <td class="csg-label">Last Name</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.physician.lastName" />
                </td>
              </tr>

              <tr>
                <td class="csg-label">Address</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.physician.address" />
                </td>
                <td class="csg-label">City</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.physician.city" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">State/Prov</td>
                <td>
                  <select class="chosen-select" name="" id="" ng-model="d.physician.state"
                    ng-options="x.abbr as x.state for x in states"
                    onchange="setDropdown(this, 'physician.state')"></select>
                  <input type="text" maxlength="150" name="" id="" ng-model="d.physician.StateOther"
                    placeholder="Type country here" ng-show="d.physician.state == 'OT'" />
                </td>
                <td class="csg-label">Postal Code</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.physician.postal" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">Country</td>
                <td>
                  <select class="chosen-select" name="" id="" ng-model="d.physician.country"
                    ng-options="x.abbr as x.country for x in choiceCountries"
                    onchange="setDropdown(this, 'physician.country')"></select>
                  <input type="text" maxlength="150" name="" id="" ng-model="d.physician.CountryOther"
                    placeholder="Type country here" ng-show="d.physician.country == 'OT'" />
                </td>
                <td class="csg-label">Phone</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.physician.phone" placeholder="(__) ___ - ____" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">Office Fax</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.physician.fax" placeholder="(__) ___ - ____" />
                </td>
                <td class="csg-label">Email</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.physician.email" />
                </td>
              </tr>
            </table>
          </div>
          <div class="csg-content" id="b">
            <table border=0 width="100%">
              <tr>
                <td colspan="4">
                  <!-- Error Display -->
                  <div ng-show="validationMessage" class="csg-invalid">
                    {{ validationMessage }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="csg-wrap csg-label">Infusion ID</td>
                <td>
                  <select ng-model="d.inject" ng-options="x.index as x.display for x in d.choiceInject"></select>

                  <button ng-click="addInject()">
                    <i class="fa fa-plus-circle">Add</i>
                  </button>

                </td>
                <td class="csg-label">Date of Infusion</td>
                <td>
                  <input type="text" datepicker name="" id="" ng-model="d.injectRow[d.inject].injectionDate"
                    ng-disabled="d.visit != 0" placeholder="mm-dd-yyyy"
                    ng-class="{'csg-required-field': !d.injectRow[d.inject].injectionDate && d.visit == 0}" />
                  <i class="fa calendar-0"></i>
                </td>
              </tr>


              <tr>
                <td colspan="2" style="vertical-align:top">

                  <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].eligible">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  Patient determine eligible?
                  <div ng-show="d.injectRow[d.inject].visitRow[d.visit].eligible=='No'">
                    What was the exclusion criteria:
                    <br>
                    <textarea name="" id="" cols="30" rows="2"
                      ng-model="d.injectRow[d.inject].visitRow[d.visit].eligiblereason"></textarea>
                    <br>
                    Were waivers granted?
                    <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].eligiblewaiver">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <br>
                    <input type="checkbox" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].consent">
                    Informed Consent Signed?
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <h2>Select Visit:</h2>
                </td>
                <td colspan="3">
                  <!-- Visit diagram -->
                  <img usemap="#image-map-base" src="base.png" alt="" ng-show="d.visit == 0" />
                  <img usemap="#image-map-30" src="30.png" alt="" ng-show="d.visit == 1" />
                  <img usemap="#image-map" src="180.png" alt="" ng-show="d.visit == 2" />
                  <img usemap="#image-map" src="365.png" alt="" ng-show="d.visit == 3" />


                  <!-- ImageMap -->
                  <map name="image-map-base">
                    <area target="" alt="" title="" href="javascript:void(0)" coords="0,0,144,66" shape="rect"
                      ng-click="setVisit(0)" />
                    <area target="" alt="" title="" href="javascript:void(0)"
                      coords="147,2,286,72,0,3,141,67,371,35,3,1" shape="rect" ng-click="setVisit(1)" />
                  </map>

                  <!-- ImageMap -->
                  <map name="image-map-30">
                    <area target="" alt="" title="" href="javascript:void(0)" coords="0,0,144,66" shape="rect"
                      ng-click="setVisit(0)" />
                    <area target="" alt="" title="" href="javascript:void(0)"
                      coords="147,2,286,72,0,3,141,67,371,35,3,1" shape="rect" ng-click="setVisit(1)" />
                    <area target="" alt="" title="" href="javascript:void(0)" coords="292,0,427,72" shape="rect"
                      ng-click="setVisit(2)" />
                  </map>

                  <!-- ImageMap -->
                  <map name="image-map">
                    <area target="" alt="" title="" href="javascript:void(0)" coords="0,0,144,66" shape="rect"
                      ng-click="setVisit(0)" />
                    <area target="" alt="" title="" href="javascript:void(0)"
                      coords="147,2,286,72,0,3,141,67,371,35,3,1" shape="rect" ng-click="setVisit(1)" />
                    <area target="" alt="" title="" href="javascript:void(0)" coords="292,0,427,72" shape="rect"
                      ng-click="setVisit(2)" />
                    <area target="" alt="" title="" href="javascript:void(0)" coords="434,0,578,72" shape="rect"
                      ng-click="setVisit(3)" />
                  </map>


                </td>
              </tr>
              <tr>
                <td class="csg-table-spacer"></td>
              </tr>
              <tr>
                <td class="csg-label">
                  <div ng-show="d.visit != 0">Date of Visit</div>
                </td>
                <td>
                  <div ng-show="d.visit != 0">
                    <input type="text" datepicker name="" id=""
                      ng-model="d.injectRow[d.inject].visitRow[d.visit].visitDate" placeholder="mm-dd-yyyy" />
                    <i class="fa calendar-0"></i>
                  </div>
                </td>
                <td></td>
                <td>
                  <button style="float:left" ng-click="preFillMedInfo()" class="csg-prefill">
                    <i class="fa fa-magic"></i> Prefill from prior Infusion
                  </button>
                </td>
              </tr>

              <tr>
                <td class="csg-label">Systolic BP</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.systolic" />
                </td>
                <td class="csg-label">O2</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.o2" />
                </td>

              </tr>

              <tr>
                <td class="csg-label">
                  <!-- Number Of LMSC Infusions -->
                </td>
                <td>
                  <!-- <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.nolmsc" /> -->
                </td>
              </tr>
              <tr>
                <td class="csg-label">Diastolic BP</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.Diastolic" />
                </td>
                <td class="csg-label">Heart Rate</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.HeartRate" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">Temperature</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.temp" />
                </td>
                <td class="csg-label">Respiration Rate</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.resp" />
                </td>
              </tr>

              <tr>
                <td colspan="2" class="csg-label">
                  <!-- <input type="checkbox" name="deceased" id="deceased" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.deceased" />
                    <label for="deceased">Deceased</label> -->
                </td>
                <td colspan="2" class="csg-label">
                  <input type="checkbox" name="partic" id="partic"
                    ng-model="d.injectRow[d.inject].visitRow[d.visit].med.partic" />
                  <label for="partic">Actively Participating</label>
                </td>
              </tr>

              <tr>
                <td>
                  <span class="csg-label">Indication</span>
                </td>
                <td colspan="4">
                  <select ng-model="d.indication" ng-options="x as x for x in choiceIndication">
                  </select>
                </td>
              </tr>


              <tr>
                <td colspan="4">
                  <h2>Medical Information</h2>
                </td>
              </tr>

              <!-- <tr>
                <td class="csg-label">Inflammatory Biomarkers</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.inflam" />
                </td>
              </tr> -->
              <tr>
                <td class="csg-label">Frailty Score</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.frailty" />
                </td>
                <!-- <td class="csg-label">MMSE Score</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.mmse" />
                </td> -->
              </tr>

              <tr>
                <td class="csg-label">6-MWT</td>
                <td>
                  <div style="white-space: nowrap">
                    <input type="text" maxlength="150"
                      ng-model="d.injectRow[d.inject].visitRow[d.visit].med.sixwmd" />(meters)
                  </div>
                </td>
                <td class="csg-label">FSH Level</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.fsh" />
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td class="csg-label">Urine Pregnancy</td>
                <td>
                  <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.urinePregnancy"
                    ng-options="x for x in choiceUrinePreg"></select>
                </td>
              </tr>
              <!-- <tr>
                <td class="csg-label">ECG Results</td>
                <td>
                  <select ng-model="d.injectRow[d.inject].visitRow[d.visit].med.ecg" ng-options="x for x in choiceECG"></select>
                </td>
              </tr> -->
              <tr>
                <td class="csg-label">General Notes</td>
                <td colspan="3">
                  <textarea ng-model="d.injectRow[d.inject].visitRow[d.visit].med.notes" name="" id="" cols="60"
                    rows="5"></textarea>
                </td>
              </tr>

              <tr>
                <td colspan="4">
                  <h2>Infusion Data</h2>
                </td>
              </tr>
              <!-- <tr>
                <td class="csg-label">BP</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.infbp" />
                </td>
                <td class="csg-label">HR</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.infhr" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">RR</td>

                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.infrr" />
                </td>
                <td class="csg-label">O2Sat Temp</td>
                <td>
                  <input type="text" maxlength="150" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.info2" />
                </td>
              </tr> -->

              <tr>
                <td class="csg-label">Premedication
                  administration time</td>
                <td>
                  <input type="text" size="10" name="" id="d.injectRow[d.inject].visitRow[d.visit].med.PreTime">
                </td>
              </tr>


              <tr>
                <td class="csg-label">Benadryl Time</td>

                <td><input type="text" size="10" name="" id="d.injectRow[d.inject].visitRow[d.visit].med.benTime"></td>

                <td class="csg-label">Dose</td>
                <td><input type="text" size="10" name="" id="d.injectRow[d.inject].visitRow[d.visit].med.benDose"></td>
              </tr>

              <tr>
                <td class="csg-label">Hydrocortisone Time</td>

                <td><input type="text" size="10" name="" id="d.injectRow[d.inject].visitRow[d.visit].med.benTime"></td>

                <td class="csg-label">Dose</td>
                <td><input type="text" size="10" name="" id="d.injectRow[d.inject].visitRow[d.visit].med.benDose"></td>
              </tr>
              <tr>
                <td class="csg-label">Start time of infusion</td>
                <td>
                  <input type="text" name="" id="d.injectRow[d.inject].visitRow[d.visit].med.infusstart">
                </td>
                <td class="csg-label">Stop time of infusion
                </td>
                <td>
                  <input type="text" name="" id="d.injectRow[d.inject].visitRow[d.visit].med.infusstop">
                </td>
              </tr>
              <tr>
                <td class="csg-label">Dose Infused (mL)</td>
                <td>
                  <input type="text" name="" id="d.injectRow[d.inject].visitRow[d.visit].med.dose">
                </td>
                <td class="csg-label">Was the infusion interrupted?
                </td>
                <td>
                  <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.infusinterrupt"
                    ng-options="x for x in choiceYesNo"></select>
                  <div ng-show="d.injectRow[d.inject].visitRow[d.visit].med.infusinterrupt=='Yes'">
                    <input type="text" name="" id=""
                      ng-model="d.injectRow[d.inject].visitRow[d.visit].med.infusinterruptReason" />
                  </div>
                </td>
              </tr>
              <tr>
                <td class="csg-label">
                  <!-- Clinical Frailty Score -->
                </td>
                <td>
                  <!-- <input type="text" name="" id="" ng-model=""> -->
                </td>
                <td class="csg-label">Was the infusion stopped?</td>
                <td>
                  <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].med.infusionStop"
                    ng-options="x for x in choiceYesNo"></select>
                  <div ng-show="d.injectRow[d.inject].visitRow[d.visit].med.infusionStop=='Yes'">
                    <input type="text" name="" id=""
                      ng-model="d.injectRow[d.inject].visitRow[d.visit].med.infusionStopReason" />
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="csg-content" id="c">
            <table border="0">
              <tr>
                <td colspan="4">
                  <!-- Error Display -->
                  <div ng-show="validationMessage" class="csg-invalid">
                    {{ validationMessage }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="csg-wrap">
                  <h2>Infusion ID</h2>
                </td>
                <td>{{ d.inject + 1 }}</td>
              </tr>
              <tr>
                <td>
                  <h2>Visit</h2>
                </td>
                <td colspan="3">
                  <!-- Visit diagram -->
                  <img src="base-gray.png" alt="" ng-show="d.visit == 0" />
                  <img src="30-gray.png" alt="" ng-show="d.visit == 1" />
                  <img src="180-gray.png" alt="" ng-show="d.visit == 2" />
                  <img src="365-gray.png" alt="" ng-show="d.visit == 3" />
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <h2>Concomitant Medications</h2>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <button style="float:right" ng-click="preFill()" class="csg-prefill">
                    <i class="fa fa-magic"></i> Prefill from Prior Visit
                  </button>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <!-- Detail -->
                  <table border="0" width="100%">
                    <tr style="background-color:#c0c0c0; font-weight:bold;">
                      <td>Medication</td>
                    </tr>
                    <tr ng-repeat="r in d.injectRow[d.inject].visitRow[d.visit].con.meds">
                      <td>
                        <table>
                          <tr class="csg-field">
                            <td>Name</td>
                            <td>Dosage</td>
                            <td style="padding-right: 10px">Taking</td>
                            <td>Indication</td>
                          </tr>

                          <tr>
                            <td>
                              <!--
                                  <input type="text" maxlength="150" ng-model="r.medname">
                                -->
                              <div ng-class="{'csg-invalid' : !r.medname}">
                                <select class="chosen-select" name="{{$index}}" ng-model="r.medname"
                                  ng-options="x for x in choiceCommonMeds"
                                  onchange="setDropdown(this, 'con.meds[].medname', this.name)"></select>
                              </div>

                              <input type="text" maxlength="150" name="" id="" ng-model="r.mednameOther"
                                ng-show="r.medname == 'OTHER'" />
                            </td>
                            <td>
                              <input type="text" maxlength="150" ng-model="r.dosage" size="10"
                                ng-class="{'csg-invalid' : !r.dosage}" />
                            </td>
                            <td>
                              <input type="checkbox" name="" id="" ng-model="r.taking" />
                            </td>
                            <td>
                              <input type="text" maxlength="150" ng-model="r.indication" />
                            </td>
                          </tr>
                          <tr class="csg-field">
                            <td>Start Date</td>
                            <td>End Date</td>
                            <td></td>
                            <td>Notes</td>
                          </tr>
                          <tr>
                            <td>
                              <input type="text" datepicker name="" id="" ng-model="r.startDate"
                                 placeholder="mm-dd-yyyy" />
                                 <!-- ng-class="{'csg-invalid' : !r.startDate}" -->
                              <i class="fa calendar-0"></i>
                            </td>
                            <td>
                              <input type="text" datepicker name="" id="" ng-model="r.endDate"
                                placeholder="mm-dd-yyyy" />

                              <i class="fa calendar-0"></i>
                            </td>
                            <td></td>
                            <td>
                              <input type="text" maxlength="150" ng-model="r.notes" />
                            </td>
                            <td>
                              <i class="fa fa-minus-circle" ng-click="removeConmed($index)"></i>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="fa fa-plus-circle" ng-click="addConmed()">Add</i>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
          <div class="csg-content" id="d">
            <table>
              <tr>
                <td colspan="4">
                  <!-- Error Display -->
                  <div ng-show="validationMessage" class="csg-invalid">
                    {{ validationMessage }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="csg-wrap">
                  <h2>Infusion ID</h2>
                </td>
                <td>{{ d.inject + 1 }}</td>
              </tr>
              <tr>
                <td>
                  <h2>Visit</h2>
                </td>
                <td colspan="3">
                  <!-- Visit diagram -->
                  <img src="base-gray.png" alt="" ng-show="d.visit == 0" />
                  <img src="30-gray.png" alt="" ng-show="d.visit == 1" />
                  <img src="180-gray.png" alt="" ng-show="d.visit == 2" />
                  <img src="365-gray.png" alt="" ng-show="d.visit == 3" />
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <h2>Urinalysis</h2>
                </td>
                <td class="csg-wrap">
                  <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.collected"
                    ng-options="x for x in choiceCollection"></select>
                  Collected/Not Collected
                </td>
              </tr>

              <tr>
                <td class="csg-label">Date of Collection</td>
                <td>
                  <input tabindex="100" type="text" datepicker name="" id=""
                    ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.collectiondate"
                    ng-class="{'csg-required-field': !d.injectRow[d.inject].visitRow[d.visit].uri.collectiondate}"
                    placeholder="mm-dd-yyyy" />
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="csg-label">Appearance
                </td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.color" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="101" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.appearance"
                    size="10">
                </td>
              </tr>
              <tr>
                <td class="csg-label">Color</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.color" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="102" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.color"
                    size="10">
                </td>
                <td class="csg-label">Specific Gravity</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.gravity" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="108" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.gravity"
                    size="10">
                </td>
              </tr>
              <tr>
                <td class="csg-label">Clarity</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.clarity" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="103" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.clarity"
                    size="10">
                </td>
                <td class="csg-label">pH</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.ph" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="109" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.ph" size="10">
                </td>
              </tr>
              <tr>
                <td class="csg-label">Bilirubin</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.bili" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="104" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.bili"
                    size="10">
                </td>
                <td class="csg-label">Ketones</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.ketones" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="110" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.ketones"
                    size="10">
                </td>
              </tr>
              <tr>
                <td class="csg-label">Nitrates</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.nitrates" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="104" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.nitrates"
                    size="10">
                </td>
                <td class="csg-label">Urine WBC</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.urinewbc" ng-options="x for x in choiceUrinalysis"></select> -->

                  <input tabindex="111" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.urinewbc"
                    size="10">/HPF

                </td>
              </tr>
              <tr>
                <td class="csg-label">Leukocytes</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.leuk" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="105" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.leuk"
                    size="10">
                </td>
                <td class="csg-label">Urine RBC</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.rbc" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="112" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.rbc"
                    size="10">/HPF
                </td>
              </tr>
              <tr>
                <td class="csg-label">Urine Glucose</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.glucose" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="106" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.glucose"
                    size="10">
                </td>
                <td class="csg-label">Epithetial Cells</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.epithetial" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="113" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.epithetial"
                    size="10">/HPF
                </td>
              </tr>
              <tr>
                <td class="csg-label">Urine Protein</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.protein" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="107" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.protein"
                    size="10">
                </td>
                <td class="csg-label">Bacteria</td>
                <td>
                  <!-- <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.bacteria" ng-options="x for x in choiceUrinalysis"></select> -->
                  <input tabindex="114" type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.bacteria"
                    size="10">/HPF
                </td>
              </tr>
              <!-- <tr>
                <td class="csg-label">Urine Culture</td>
                <td>
                  <select ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.culture" ng-options="x for x in choiceUrinalysis"></select>
                  <input type="text" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.culture" size="10">
                </td>
              </tr> -->
              <tr>
                <td class="csg-label">General Notes</td>
                <td colspan="4">
                  <textarea tabindex="115" ng-model="d.injectRow[d.inject].visitRow[d.visit].uri.notes" name="" id="" cols="60"
                    rows="10"></textarea>
                </td>
              </tr>
            </table>
          </div>
          <div class="csg-content" id="e">
            <table border="0">
              <tr>
                <td colspan="4">
                  <!-- Error Display -->
                  <div ng-show="validationMessage" class="csg-invalid">
                    {{ validationMessage }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="csg-wrap">
                  <h2>Infusion ID</h2>
                </td>
                <td>{{ d.inject + 1 }}</td>
              </tr>
              <tr>
                <td>
                  <h2>Visit</h2>
                </td>

                <td colspan="3">
                  <!-- Visit diagram -->
                  <img src="base-gray.png" alt="" ng-show="d.visit == 0" />
                  <img src="30-gray.png" alt="" ng-show="d.visit == 1" />
                  <img src="180-gray.png" alt="" ng-show="d.visit == 2" />
                  <img src="365-gray.png" alt="" ng-show="d.visit == 3" />
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <h2>Complete Blood Count</h2>
                </td>
                <td class="csg-wrap">
                  <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].cbc.collected"
                    ng-options="x for x in choiceCollection"></select>
                  Collected/Not Collected
                </td>
              </tr>
              <tr>
                <td class="csg-label">Date of Collection</td>
                <td>
                  <input tabindex="201" type="text" datepicker name="" id=""
                    ng-model="d.injectRow[d.inject].visitRow[d.visit].cbc.collectiondate"
                    ng-class="{'csg-required-field': !d.injectRow[d.inject].visitRow[d.visit].cbc.collectiondate}"
                    placeholder="mm-dd-yyyy" />
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="csg-label">WBC</td>
                <td class="csg-wrap">
                  <input tabindex="202" type="text" size="10" ng-model="d.injectRow[d.inject].visitRow[d.visit].cbc.wbc" />thousand/uL
                </td>
                <td class="csg-label">RDW</td>
                <td>
                  <input tabindex="207" type="text" size="10" ng-model="d.injectRow[d.inject].visitRow[d.visit].cbc.rdw" />%
                </td>
              </tr>

              <tr>
                <td class="csg-label">RBC</td>
                <td class="csg-wrap">
                  <input tabindex="203" type="text" size="10" ng-model="d.injectRow[d.inject].visitRow[d.visit].cbc.rbc" />million/uL
                </td>
                <td class="csg-label">MCHC</td>
                <td>
                  <input tabindex="208" type="text" size="10" ng-model="d.injectRow[d.inject].visitRow[d.visit].cbc.mchc" />g/dL
                </td>
              </tr>
              <tr>
                <td class="csg-label">Hbg</td>
                <td class="csg-wrap">
                  <input tabindex="204" type="text" size="10" ng-model="d.injectRow[d.inject].visitRow[d.visit].cbc.hbg" />g/dL
                </td>
                <td class="csg-label">MPV</td>
                <td>
                  <input tabindex="209" type="text" size="10" ng-model="d.injectRow[d.inject].visitRow[d.visit].cbc.mpv" />fL
                </td>
              </tr>
              <tr>
                <td class="csg-label">Hct</td>
                <td class="csg-wrap">
                  <input tabindex="205" type="text" size="10" ng-model="d.injectRow[d.inject].visitRow[d.visit].cbc.hct" />%
                </td>
                <td class="csg-label">Platelet Count</td>
                <td>
                  <input tabindex="210" type="text" size="10"
                    ng-model="d.injectRow[d.inject].visitRow[d.visit].cbc.platelet" />Thousand/uL
                </td>
              </tr>
              <tr>
                <td class="csg-label">MCV</td>
                <td class="csg-wrap">
                  <input tabindex="206" type="text" size="10" name="" id=""
                    ng-model="d.injectRow[d.inject].visitRow[d.visit].cbc.mcv" />fL
                </td>
                <td class="csg-label">MCH</td>
                <td>
                  <input tabindex="211" type="text" size="10" name="" id=""
                    ng-model="d.injectRow[d.inject].visitRow[d.visit].cbc.mch" />fL
                </td>
              </tr>
              <tr>
                <td class="csg-label">General Notes</td>
                <td colspan="3">
                  <textarea tabindex="212" name="" id="" cols="60" rows="10"
                    ng-model="d.injectRow[d.inject].visitRow[d.visit].cbc.notes"></textarea>
                </td>
              </tr>
            </table>
          </div>
          <div class="csg-content" id="f">
            <table>
              <tr>
                <td colspan="4">
                  <!-- Error Display -->
                  <div ng-show="validationMessage" class="csg-invalid">
                    {{ validationMessage }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="csg-wrap">
                  <h2>Infusion ID</h2>
                </td>
                <td>{{ d.inject + 1 }}</td>
              </tr>
              <tr>
                <td>
                  <h2>Visit</h2>
                </td>

                <td colspan="3">
                  <!-- Visit diagram -->
                  <img src="base-gray.png" alt="" ng-show="d.visit == 0" />
                  <img src="30-gray.png" alt="" ng-show="d.visit == 1" />
                  <img src="180-gray.png" alt="" ng-show="d.visit == 2" />
                  <img src="365-gray.png" alt="" ng-show="d.visit == 3" />
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <h2>Serum Chemistry</h2>
                </td>
                <td class="csg-wrap">
                  <select tabindex="309" name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.collected"
                    ng-options="x for x in choiceCollection"></select>
                  Collected/Not Collected
                </td>
              </tr>
              <tr>
                <td class="csg-label">Date of Collection</td>
                <td>
                  <input tabindex="301" type="text" datepicker name="" id=""
                    ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.collectiondate"
                    ng-class="{'csg-required-field': !d.injectRow[d.inject].visitRow[d.visit].chem.collectiondate}"
                    placeholder="mm-dd-yyyy" />
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="csg-label">Glucose</td>
                <td class="csg-wrap">
                  <input tabindex="302" type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.glucose" />
                  mg/dL
                </td>
                <td class="csg-label">Chloride</td>
                <td class="csg-wrap">
                  <input tabindex="310" type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.chloride" />
                  mmol/L
                </td>
              </tr>
              <tr>
                <td class="csg-label">Calcium</td>
                <td class="csg-wrap">
                  <input tabindex="303" type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.calcium" />
                  mg/dL
                </td>
                <td class="csg-label">BUN/Creatinine Ratio</td>
                <td class="csg-wrap">
                  <input tabindex="311" type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.bun" />
                  mg/dL
                </td>
              </tr>
              <tr>
                <td class="csg-label">Albium</td>
                <td class="csg-wrap">
                  <input tabindex="304" type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.albium" />
                  g/dL
                </td>
                <!-- <td class="csg-label">Creatine</td>
                <td class="csg-wrap">
                  <input type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.creatine" />
                  mg/dL
                </td> -->
              </tr>
              <tr>
                <td class="csg-label">Total Protein</td>
                <td class="csg-wrap">
                  <input tabindex="305" type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.totalprotein" />
                  g/dL
                </td>
                <td class="csg-label">ALP</td>
                <td class="csg-wrap">
                  <input tabindex="312" type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.alp" />
                  IU/L
                </td>
              </tr>
              <tr>
                <td class="csg-label">Sodium</td>
                <td>
                  <input tabindex="306" type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.sodium" />
                  mmol/L
                </td>
                <td class="csg-label">ALT</td>
                <td class="csg-wrap">
                  <input tabindex="313" type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.alt" />
                  IU/L
                </td>
              </tr>
              <tr>
                <td class="csg-label">Potassium</td>
                <td class="csg-wrap">
                  <input tabindex="307" type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.potassium" />
                  mmol/L
                </td>
                <td class="csg-label">AST</td>
                <td class="csg-wrap">
                  <input tabindex="314" type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.ast" />
                  IU/L
                </td>
              </tr>
              <tr>
                <td class="csg-label">CO2</td>
                <td>
                  <input tabindex="308" type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.co2" />
                  mmol/L
                </td>
                <td class="csg-label">Bilirubin</td>
                <td class="csg-wrap">
                  <input tabindex="315" type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.bili" />
                  mg/dL
                </td>
              </tr>
              <tr>
                <td class="csg-label">General Notes</td>
                <td colspan="3">
                  <textarea tabindex="316" name="" id="" cols="60" rows="10"
                    ng-model="d.injectRow[d.inject].visitRow[d.visit].chem.notes"></textarea>
                </td>
              </tr>
            </table>
          </div>


          <div class="csg-content" id="g">
            <table>
              <tr>
                <td colspan="4">
                  <!-- Error Display -->
                  <div ng-show="validationMessage" class="csg-invalid">
                    {{ validationMessage }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="csg-wrap">
                  <h2>Infusion ID</h2>
                </td>
                <td>{{ d.inject + 1 }}</td>
              </tr>
              <tr>
                <td>
                  <h2>Visit</h2>
                </td>

                <td colspan="3">
                  <!-- Visit diagram -->
                  <img src="base-gray.png" alt="" ng-show="d.visit == 0" />
                  <img src="30-gray.png" alt="" ng-show="d.visit == 1" />
                  <img src="180-gray.png" alt="" ng-show="d.visit == 2" />
                  <img src="365-gray.png" alt="" ng-show="d.visit == 3" />
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <h2>Serology
                  </h2>
                </td>
                <td class="csg-wrap">
                  <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].sero.collected"
                    ng-options="x for x in choiceCollection"></select>
                  Collected/Not Collected
                </td>
              </tr>
              <tr>
                <td class="csg-label">Date of Collection</td>
                <td>
                  <input type="text" datepicker name="" id="" ng-model="d.sero.doc"
                    ng-class="{'csg-required-field': !d.sero.doc}" placeholder="mm-dd-yyyy" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">HIV 1/2 AB</td>
                <td class="csg-wrap">
                  <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].sero.hiv"
                    ng-options="x for x in choiceReact"></select>

                </td>
                <td class="csg-label">Hepatitis B surf Ag</td>
                <td class="csg-wrap">
                  <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].sero.hep"
                    ng-options="x for x in choiceReact"></select>
                </td>
              </tr>
              <tr>
                <td class="csg-label">Hepatitis B Core total AB</td>
                <td class="csg-wrap">
                  <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].sero.heptotal"
                    ng-options="x for x in choiceReact"></select>
                </td>
                <td class="csg-label">Hepatitis C Antibody</td>
                <td class="csg-wrap">
                  <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].sero.hepc"
                    ng-options="x for x in choiceReact"></select>
                </td>
              </tr>
              <tr>
                <td class="csg-label">RPR with reflex to Syphilis IGG</td>
                <td class="csg-wrap">
                  <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].sero.rpr"
                    ng-options="x for x in choiceReact"></select>
                </td>
              </tr>
            </table>
          </div>


          <div class="csg-content" id="h">
            <table>
              <tr>
                <td colspan="4">
                  <!-- Error Display -->
                  <div ng-show="validationMessage" class="csg-invalid">
                    {{ validationMessage }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="csg-wrap">
                  <h2>Infusion ID</h2>
                </td>
                <td>{{ d.inject + 1 }}</td>
              </tr>
              <tr>
                <td>
                  <h2>Visit</h2>
                </td>

                <td colspan="3">
                  <!-- Visit diagram -->
                  <img src="base-gray.png" alt="" ng-show="d.visit == 0" />
                  <img src="30-gray.png" alt="" ng-show="d.visit == 1" />
                  <img src="180-gray.png" alt="" ng-show="d.visit == 2" />
                  <img src="365-gray.png" alt="" ng-show="d.visit == 3" />
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <h2>Coagulation
                  </h2>
                </td>
                <td class="csg-wrap">
                  <select name="" id="" ng-model="d.injectRow[d.inject].visitRow[d.visit].coag.collected"
                    ng-options="x for x in choiceCollection"></select>
                  Collected/Not Collected
                </td>
              </tr>

              <tr>
                <td class="csg-label">Date of Collection</td>
                <td>
                  <input type="text" datepicker name="" id="" ng-model="d.coag.doc"
                    ng-class="{'csg-required-field': !d.coag.doc}" placeholder="mm-dd-yyyy" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">PT</td>
                <td class="csg-wrap">
                  <input type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].coag.pt" />
                </td>
                <td class="csg-label">INR</td>
                <td class="csg-wrap">
                  <input type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].coag.inr" />
                </td>
              </tr>
              <tr>
                <td class="csg-label">aPTT</td>
                <td class="csg-wrap">
                  <input type="number" ng-model="d.injectRow[d.inject].visitRow[d.visit].coag.ptt" />
                </td>
              </tr>
            </table>
          </div>


          <div class="csg-content" id="i">
            <table>
              <tr>
                <td colspan="4">
                  <!-- Error Display -->
                  <div ng-show="validationMessage" class="csg-invalid">
                    {{ validationMessage }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="csg-wrap">
                  <h2>Infusion ID</h2>
                </td>
                <td>{{ d.inject + 1 }}</td>
              </tr>
              <tr>
                <td>
                  <h2>Visit</h2>
                </td>

                <td colspan="3">
                  <!-- Visit diagram -->
                  <img src="base-gray.png" alt="" ng-show="d.visit == 0" />
                  <img src="30-gray.png" alt="" ng-show="d.visit == 1" />
                  <img src="180-gray.png" alt="" ng-show="d.visit == 2" />
                  <img src="365-gray.png" alt="" ng-show="d.visit == 3" />
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <h2>AE/SAE</h2>
                </td>
              </tr>
              <tr>
                <td>
                  <button ng-click="newSAE()">
                    <i class="fa fa-plus-circle"></i>
                    Add Form</button>

                </td>
              </tr>
              <tr>
                <td colspan="4">

                  <br><br>
                  <!-- Detail -->
                  <table border="0" width="100%">
                    <tr>
                      <td>ID</td>
                      <td>Title</td>
                      <td>Created</td>
                      <td></td>
                    </tr>

                    <tr ng-repeat="r in respSAE">
                      <td>{{r.ID}}</td>
                      <td>
                        <a
                          href="https://studytst.lgvreg.com/sites/aging/Lists/SAE%20Report/Item/displayifs.aspx?List=c723f511-be74-4a08-9c35-256c942f4b8e&Source=https%3A%2F%2Fportal%2Ecourtsquaregroup%2Ecom%2Fsites%2FClientPortal%2FSiteDirectory%2FLongeveron%2FBahamianEDC%2FLists%2FSAE%2520Report%2FAllItems%2Easpx&ContentTypeId=0x01007C3D3621847C0741A3CF69E701AA8BA8&ID={{r.id}}">{{r.Title}}</a>
                      </td>
                      <td>{{r.Created}}</td>
                      <td>
                        <button ng-click="viewSAE(r)">
                          <i class="fa fa-pencil-square"></i>&nbsp;
                          View Form</button>
                      </td>
                    </tr>

                    <!-- 
                      <td style="vertical-align: top">
                        <input type="text" datepicker ng-model="r.eventdate" placeholder="mm-dd-yyyy" />
                        <i class="fa calendar-0"></i>
                      </td>
                      <td style="vertical-align: top">
                        <input type="number" ng-model="r.eventid" /></td>
                      <td style="vertical-align: top">
                        <input type="text" maxlength="150" ng-model="r.class" />
                      </td>
                      <td>

                        <textarea name="" id="" cols="30" rows="5" ng-model="r.concern"></textarea>

                      </td>
                      <td>
                        <i class="
                          fa fa-minus-circle" ng-click="removeAE($index)"></i>
                      </td>
                    </tr> 
                  <tr>
                      <td>
                        <i class="fa fa-plus-circle" ng-click="addAE()">Add</i>
                      </td>
                    </tr> -->

                  </table>
                </td>
              </tr>

            </table>
          </div>

          <!-- 
            <div class="csg-content" id="j">

            <table>
              <tr ng-show="id">
                <td style="vertical-align: top">
                  <div ng-show="uploadFiles.length > 0">
                    <a href="{{folderAttachUrl}}/{{id}}" target="_blank">
                      <img src="/_layouts/images/folder16.gif" alt="" border="0">View Folder
                    </a></div>
                </td>
                <td style="vertical-align:top">

                  <table border="0" cellpadding="3px" cellspacing="3px">
                    <tr>
                      <td></td>
                      <td><b>Name</b></td>
                      <td><b>Size</b></td>
                    </tr>
                    <tr ng-repeat="f in uploadFiles">
                      <td>
                        <img alt="" ng-src="{{getIcon(f.ServerRelativeUrl)}}">
                      </td>
                      <td>
                        <a ng-href="{{f.ServerRelativeUrl}}">
                          {{f.Name}}
                        </a>
                      </td>
                      <td>
                        {{f.Length}}
                      </td>
                    </tr>
                  </table>

                </td>
                <td style="vertical-align: top">
                  <input type="file" class="btn fmb-purple" name="" id="uploadFile">
                  <button class="btn fmb-green" value="Upload" ng-click="upload()">
                    <i class="fa fa-upload"></i>
                    &nbsp;Upload
                  </button>
                <td></td>
              </tr>
            </table>

          </div> 
        -->

          <div class="savePanel">
            <button class="csg-success csg-button" ng-click="save()" ng-disabled="validateSave()"
              ng-class="{'csg-disabled' : validateSave()}">
              <i class="fa fa-save"></i> Save
            </button>
            <button class="csg-error csg-button" ng-click="cancel()">
              <i class="fa fa-window-close"></i> Cancel
            </button>

            <div ng-cloak class="csg-error-msg" style="white-space: pre-line;" ng-show="validateSave()">
              * Missing required fields
              {{txtValidation}}
            </div>
          </div>
        </div>
        version 1.6
      </div>
    </div>
  </div>
</body>

</html>