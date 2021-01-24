<html lang="en">

<head>
    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Longeveron - EDC (version 1.1)</title>

    <!-- AngularJS + JQuery -->
 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.2/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"></script>

    <!-- App -->
    <script src="csg-report-demographic.js?v=112218"></script>
</head>

<body>
    <div ng-app="demoApp">
        <div ng-controller="demoCtl" ng-cloak>

            <div>
                <table width="100%" border="0">
                    <tr>
                        <td>
                            <a href="https://studytst.lgvreg.com/sites/aging/">
                                <img src="long.png" alt="" id="logo">
                            </a>
                        </td>
                        <td>
                            <h1 class="title">Patient Demographic</h1>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <hr>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="2">

                            <!-- inner table -->
                            <table border="1">
                                <tr style="font-weight: bold">
                                    <td>Patient ID</td>
                                    <td>Name</td>
                                    <td>Ethnicity</td>
                                    <td>Sex</td>
                                    <td>Age</td>
                                </tr>
                                <tr ng-repeat="row in data">
                                    <td>{{row.ID}}</td>
                                    <td>{{row.Title}}</td>
                                    <td>{{row.Ethnicity}}</td>
                                    <td>{{row.Sex}}</td>
                                    <td>{{row.Age}}</td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</body>

</html>