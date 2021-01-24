<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PACC 3.0</title>
</head>

<!-- <base href="https://cccedu.sharepoint.com/sites/PAC/automated/dev/SiteAssets/" /> -->

<!-- AngularJS + JQuery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.2/angular.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css">

<!-- PNP + Icon -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>

<!-- Toastr -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.css">

<!-- Bootstrap -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<!-- PNP -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
    crossorigin="anonymous">
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.0.5/es6-promise.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.2/fetch.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sp-pnp-js/2.0.1/pnp.min.js"></script>

<!-- Lodash -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"></script>

<!-- Microsoft -->
<!-- <script src="https://cccedu.sharepoint.com/_layouts/15/SP.Runtime.js"></script>
<script src="https://cccedu.sharepoint.com/_layouts/15/SP.js"></script>
<script src="https://cccedu.sharepoint.com/_layouts/15/SP.UI.Controls.js"></script>
<script src="https://cccedu.sharepoint.com/_layouts/15/1033/strings.js"></script>
<script src="https://cccedu.sharepoint.com/_layouts/15/clienttemplates.js"></script>
<script src="https://cccedu.sharepoint.com/_layouts/15/clientforms.js"></script>
<script src="https://cccedu.sharepoint.com/_layouts/15/clientpeoplepicker.js"></script>
<script src="https://cccedu.sharepoint.com/_layouts/15/autofill.js"></script> -->

<!-- People Picker -->
<!-- <script src="sp-peoplepicker.js"></script>
<link href="sp-peoplepicker.css" rel="stylesheet" type="text/css"> -->

<!-- App -->
<script src="ccc-pacc-042519.js"></script>
<link rel="stylesheet" href="ccc-pacc.css">


<body>
    <div ng-app="paccApp">
        <div ng-controller="paccCtl">

            <table>
                <tr>
                    <td>
                        <!-- Logo -->
                        <a href="https://cccedu.sharepoint.com/sites/PAC/automated/dev/">
                            <img src="ccc.jpg" alt="" height="39px" width="150px" />
                        </a>

                        <!-- TBD -- Super User Admin -->
                        <!-- if Admin, display role drop down.   Apply to role function() for GUI display -->
                        
                    </td>
                    <td style="padding-left: 40px">
                        <map name="pacc-map">
                            <area target="" alt="" title="Initiation" coords="1,4,73,53" shape="rect" href="javascript:window.paccCtl.navigate(1)">
                            <area target="" alt="" title="Justification" coords="76,0,145,53" shape="0" href="javascript:window.paccCtl.navigate(2)">
                            <area target="" alt="" title="Development" coords="150,0,215,52" shape="0" href="javascript:window.paccCtl.navigate(3)">
                            <area target="" alt="" title="Internal Approval" coords="222,1,282,50" shape="0" href="javascript:window.paccCtl.navigate(4)">
                            <area target="" alt="" title="External Submission" coords="290,2,355,53" shape="0" href="javascript:window.paccCtl.navigate(5)">
                            <area target="" alt="" title="External Approval" coords="363,4,424,52" shape="0" href="javascript:window.paccCtl.navigate(6)">
                            <area target="" alt="" title="Systems Setup" coords="430,2,499,53" shape="0" href="javascript:window.paccCtl.navigate(7)">
                            <area target="" alt="" title="Implementation" coords="505,3,574,51" shape="0" href="javascript:window.paccCtl.navigate(8)">
                        </map>

                        <!-- Phases -->
                        <img src="step1.png" alt="" ng-show="d.status == 1" usemap="#pacc-map">
                        <img src="step1.png" alt="" ng-show="d.status == 1.1" usemap="#pacc-map">
                        <img src="step2.png" alt="" ng-show="d.status == 2" usemap="#pacc-map">
                        <img src="step3.png" alt="" ng-show="d.status == 3" usemap="#pacc-map">
                        <img src="step4.png" alt="" ng-show="d.status == 4" usemap="#pacc-map">
                        <img src="step4.png" alt="" ng-show="d.status == 4.1" usemap="#pacc-map">
                        <img src="step4.png" alt="" ng-show="d.status == 4.2" usemap="#pacc-map">
                        <img src="step4.png" alt="" ng-show="d.status == 4.3" usemap="#pacc-map">
                        <img src="step5.png" alt="" ng-show="d.status == 5" usemap="#pacc-map">
                        <img src="step6.png" alt="" ng-show="d.status == 6" usemap="#pacc-map">
                        <img src="step7.png" alt="" ng-show="d.status == 7" usemap="#pacc-map">
                        <img src="step8.png" alt="" ng-show="d.status == 8" usemap="#pacc-map">



                    </td>
                </tr>
            </table>




            <div ng-cloak>

                <!-- Navigation  -->
                <!-- <input type="button" value="< Prev" ng-click="prev()">
                <input type="button" value="Next >" ng-click="next()"> -->

                <!-- Content -->
                <div ng-include="'step1.html'" ng-show="d.status == 1"></div>
                <div ng-include="'step1a.html'" ng-show="d.status == 1.1"></div>
                <div ng-include="'step2.html'" ng-show="d.status == 2"></div>
                <div ng-include="'step3.html'" ng-show="d.status == 3"></div>
                <div ng-include="'step4.html'" ng-show="d.status == 4"></div>
                <div ng-include="'step4a.html'" ng-show="d.status == 4.1"></div>
                <div ng-include="'step4b.html'" ng-show="d.status == 4.2"></div>
                <div ng-include="'step4c.html'" ng-show="d.status == 4.3"></div>
                <div ng-include="'step5.html'" ng-show="d.status == 5"></div>
                <div ng-include="'step6.html'" ng-show="d.status == 6"></div>
                <div ng-include="'step7.html'" ng-show="d.status == 7"></div>
                <div ng-include="'step8.html'" ng-show="d.status == 8"></div>

            </div>
        </div>
    </div>
</body>

</html>