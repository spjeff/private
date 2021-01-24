<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PACC 3.0</title>
</head>

<!-- <base href="https://cccedu.sharepoint.com/sites/PAC/automated/dev/SiteAssets/" /> -->

<script type="text/javascript">
window._spPageContextInfo = {
    webServerRelativeUrl: "/sites/PAC/automated/dev",
    webAbsoluteUrl: "https://cccedu.sharepoint.com/sites/PAC/automated/dev"
};
</script>

<!-- Microsoft -->
<script type="text/javascript" src="//ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>
<!-- <script src="/_layouts/15/core.js"></script> -->
<script src="/_layouts/15/init.js"></script>

<script src="/_layouts/15/SP.Runtime.js"></script>
<script src="/_layouts/15/SP.js"></script>
<script src="/_layouts/15/SP.UI.Controls.js"></script>
<script src="/_layouts/15/SP.core.js"></script>
<script src="/_layouts/15/1033/strings.js"></script>
<script src="/_layouts/15/clienttemplates.js"></script>
<script src="/_layouts/15/clientforms.js"></script>
<script src="/_layouts/15/clientpeoplepicker.js"></script>
<script src="/_layouts/15/autofill.js"></script>

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
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.0.5/es6-promise.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.2/fetch.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sp-pnp-js/2.0.1/pnp.min.js"></script>

<!-- Lodash -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"></script>

<!-- People Picker -->
<script src="/sites/PAC/automated/dev/SiteAssets/sp-peoplepicker.js"></script>
<link href="/sites/PAC/automated/dev/SiteAssets/sp-peoplepicker.css" rel="stylesheet" type="text/css">

<!-- App -->
<script src="ccc-pacc.js?v=060819"></script>
<link rel="stylesheet" href="ccc-pacc.css">

<body>
    <div ng-app="paccApp">
        <div ng-controller="paccCtl">

            <table border="0" width="100%">
                <tr>
                    <td>
                        <!-- Logo -->
                        <a href="https://cccedu.sharepoint.com/sites/PAC/automated/dev/">
                            <img src="ccc.jpg" alt="" height="39px" width="150px" />
                        </a>
                    </td>
                    <td style="padding-left: 10px">

                    
                        <map name="pacc-map">
                            <area target="" alt="1" title="1" coords="1,3,39,40" shape="rect" href="javascript:window.paccCtl.navigate(1)">
                            <area target="" alt="1a" title="1.1" coords="41,44,83,88" shape="rect" href="javascript:window.paccCtl.navigate(1.1)">
                            <area target="" alt="2" title="2" coords="86,0,123,38" shape="rect" href="javascript:window.paccCtl.navigate(2)">
                            <area target="" alt="2a" title="2.1" coords="123,46,165,85" shape="rect" href="javascript:window.paccCtl.navigate(2.1)">
                            <area target="" alt="2b" title="2.2" coords="171,49,208,87" shape="rect" href="javascript:window.paccCtl.navigate(2.2)">
                            <area target="" alt="3" title="3" coords="203,2,254,41" shape="rect" href="javascript:window.paccCtl.navigate(3)">
                            <area target="" alt="3a" title="3.1" coords="252,50,294,87" shape="rect" href="javascript:window.paccCtl.navigate(3.1)">
                            <area target="" alt="3b" title="3.2" coords="295,49,337,87" shape="rect" href="javascript:window.paccCtl.navigate(3.2)">
                            <area target="" alt="4" title="4" coords="337,2,377,40" shape="rect" href="javascript:window.paccCtl.navigate(4)">
                            <area target="" alt="4a" title="4.1" coords="376,48,418,86" shape="rect" href="javascript:window.paccCtl.navigate(4.1)">
                            <area target="" alt="4b" title="4.2" coords="416,48,461,88" shape="rect" href="javascript:window.paccCtl.navigate(4.2)">
                            <area target="" alt="5" title="5" coords="463,1,503,40" shape="rect" href="javascript:window.paccCtl.navigate(5)">
                            <area target="" alt="6" title="6" coords="506,2,544,42" shape="rect" href="javascript:window.paccCtl.navigate(6)">
                            <area target="" alt="7" title="7" coords="587,40,547,2" shape="rect" href="javascript:window.paccCtl.navigate(7)">
                            <area target="" alt="8" title="8" coords="589,0,634,42" shape="rect" href="javascript:window.paccCtl.navigate(8)">
                        </map>

                        <!-- Phases -->
                        <img src="1.png" alt="" ng-show="d.status == 1" usemap="#pacc-map">
                        <img src="2.png" alt="" ng-show="d.status == 1.1" usemap="#pacc-map">
                        <img src="3.png" alt="" ng-show="d.status == 2" usemap="#pacc-map">
                        <img src="4.png" alt="" ng-show="d.status == 2.1" usemap="#pacc-map">
                        <img src="5.png" alt="" ng-show="d.status == 2.2" usemap="#pacc-map">
                        <img src="6.png" alt="" ng-show="d.status == 3" usemap="#pacc-map">
                        <img src="7.png" alt="" ng-show="d.status == 3.1" usemap="#pacc-map">
                        <img src="8.png" alt="" ng-show="d.status == 3.2" usemap="#pacc-map">
                        <img src="9.png" alt="" ng-show="d.status == 4" usemap="#pacc-map">
                        <img src="10.png" alt="" ng-show="d.status == 4.1" usemap="#pacc-map">
                        <img src="11.png" alt="" ng-show="d.status == 4.2" usemap="#pacc-map">
                        <img src="12.png" alt="" ng-show="d.status == 5" usemap="#pacc-map">
                        <img src="13.png" alt="" ng-show="d.status == 6" usemap="#pacc-map">
                        <img src="14.png" alt="" ng-show="d.status == 7" usemap="#pacc-map">
                        <img src="15.png" alt="" ng-show="d.status == 8" usemap="#pacc-map">

                    </td>
                    <td style="text-align: right;padding-right:10px">
                        <b>
                            <span title="{{currentUser.UserPrincipalName}}">
                                {{currentUser.Title}}
                            </span>
                        </b>
                    </td>
                </tr>
            </table>


            <div ng-cloak>
                <!-- Content -->
                <div ng-include="'step0.html'" ng-show="d.status == 0"></div>
                <div ng-include="'step1.html'" ng-show="d.status == 1"></div>
                <div ng-include="'step1a.html'" ng-show="d.status == 1.1"></div>
                <div ng-include="'step2.html'" ng-show="d.status == 2"></div>
                <div ng-include="'step2a.html'" ng-show="d.status == 2.1"></div>
                <div ng-include="'step2b.html'" ng-show="d.status == 2.2"></div>
                <div ng-include="'step3.html'" ng-show="d.status == 3"></div>
                <div ng-include="'step3a.html'" ng-show="d.status == 3.1"></div>
                <div ng-include="'step3b.html'" ng-show="d.status == 3.2"></div>
                <div ng-include="'step4.html'" ng-show="d.status == 4"></div>
                <div ng-include="'step4a.html'" ng-show="d.status == 4.1"></div>
                <div ng-include="'step4b.html'" ng-show="d.status == 4.2"></div>
                <div ng-include="'step5.html'" ng-show="d.status == 5"></div>
                <div ng-include="'step6.html'" ng-show="d.status == 6"></div>
                <div ng-include="'step7.html'" ng-show="d.status == 7"></div>
                <div ng-include="'step8.html'" ng-show="d.status == 8"></div>
            </div>
        </div>
    </div>
</body>

</html>