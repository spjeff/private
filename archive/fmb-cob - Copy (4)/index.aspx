<!DOCTYPE html>
<html lang="en">


<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>COB - Commercial OnBoarding</title>

    <!-- AngularJS + JQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.2/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.2/angular-route.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css">

    <!-- PNP + Icon -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sp-pnp-js/3.0.10/pnp.min.js"></script>
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

    <!-- App -->
    <link rel="stylesheet" href="fmb-cob.css">
    <script src="fmb-cob.js"></script>
</head>

<body ng-app="cobApp">

    <div ng-controller="cobCtl">
        <h2>
            <a href="https://firstmidwest.sharepoint.com/sites/cob">
                <img src="logo.png" alt="" height="32" width="32" class="fmb-logo">Commercial OnBoarding
                <span ng-show="id"> - ID # {{id}}</span>
            </a>
        </h2>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <!-- <div class="navbar-header">
                <a class="navbar-brand" href="#">Navigation</a>
            </div> -->

                <ul class="fmb-purple nav navbar-nav">


                    <li>
                        <a href="#/?id={{id}}" ng-click="save()">Start</a>
                    </li>
                    <li>
                        <a href="#/cis/?id={{id}}" ng-click="save()">CIS Record</a>
                    </li>
                    <li>
                        <a href="#/bo/?id={{id}}" ng-click="save()">Beneficial Ownership</a>
                    </li>
                    <li>
                        <a href="#/corp-res/?id={{id}}" ng-click="save()">Corporate Resolution</a>
                    </li>
                    <li>
                        <a href="#/acct/?id={{id}}" ng-click="save()">Account</a>
                    </li>
                    <li>
                        <a href="#/signers/?id={{id}}" ng-click="save()">Signers</a>
                    </li>
                    <li>
                        <a href="#/master/?id={{id}}" ng-click="save()">Master Agreement</a>
                    </li>
                    <li>
                        <a href="#/express/?id={{id}}" ng-click="save()">Business Express</a>
                    </li>
                    <li>
                        <a href="#/ach/?id={{id}}" ng-click="save()">ACH Information</a>
                    </li>
                    <li>
                        <a href="#/wire/?id={{id}}" ng-click="save()">Wire User Info</a>
                    </li>
                    <li>
                        <a href="#/ppay/?id={{id}}" ng-click="save()">Positive Pay</a>
                    </li>
                    <li>
                        <a href="#/rdc/?id={{id}}" ng-click="save()">RDC</a>
                    </li>
                    <li>
                        <a href="#/sweep/?id={{id}}" ng-click="save()">Sweep</a>
                    </li>
                    <li>
                        <a href="#/achdebit/?id={{id}}" ng-click="save()">ACH Debit Block</a>
                    </li>
                    <li>
                        <a href="#/acctrecon/?id={{id}}" ng-click="save()">Account Recon</a>
                    </li>
                    <li>
                        <a href="#/nonrevolve/?id={{id}}" ng-click="save()">Business Non Revolving Card</a>
                    </li>
                    <li>
                        <a href="#/corppurchase/?id={{id}}" ng-click="save()">Corp & Purchasing Card</a>
                    </li>
                    <li>
                        <a href="#/lockbox/?id={{id}}" ng-click="save()">Lockbox</a>
                    </li>
                    <li>
                        <a href="#/cashvault/?id={{id}}" ng-click="save()">Cash Vault</a>
                    </li>
                    <li>
                        <a href="#/smartsafe/?id={{id}}" ng-click="save()">Smart Safe</a>
                    </li>
                    <li>
                        <a href="#/edi/?id={{id}}" ng-click="save()">EDI</a>
                    </li>
                    <li>
                        <a href="#/billpay/?id={{id}}" ng-click="save()">Bill Payment Consol</a>
                    </li>
                    <li>
                        <a href="#/returnitem/?id={{id}}" ng-click="save()">Return Item Services</a>
                    </li>
                </ul>
            </div>
        </nav>


        <!-- Toolbar -->
        <div ng-include="'toolbar.htm'"></div>

        <!-- status -->
        <div style="text-align:right" class="fmb-status">
            Status:
            <select name="" id="" ng-model="d.formStatus" ng-options="x for x in choiceStatus">
            </select>
        </div>

        <!-- Router -->
        <ng-view></ng-view>

        <!-- Toolbar -->
        <div ng-include="'toolbar.htm'" class="fmb-toolbar-bottom"></div>


    </div>
</body>

</html>