<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>COB Dashboard SubStatus</title>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.2/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"></script>


    <!-- AngularJS + JQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"></script>

    <!-- PNP -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.0.5/es6-promise.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.2/fetch.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sp-pnp-js/2.0.1/pnp.min.js"></script>


    <!-- App -->
    <link rel="stylesheet" href="dashboard.css">
    <script src="dashboard-substatus.js"></script>

</head>

<body>


    <div ng-app="cobDashboardApp">
        <div ng-controller="cobDashboardCtl">
		
		
		<h2>
            <a href="https://firstmidwest.sharepoint.com/sites/cobtest/">
                <img src="logo.png" alt="" height="32" width="32" class="fmb-logo">Commercial OnBoarding
                <span ng-show="id" class="ng-binding"> - ID # 159</span>
            </a>
        </h2>
		
	<div id="hovercard">
	  
	  <table>
	  <tr><td>Company Name: </td><td>{{hoverdata.JSONparse.start.companyName}}</td></tr>
	  <tr><td>FMB Colleague: </td><td>{{hoverdata.JSONparse.start.person}}</td></tr>
	  <tr><td>RM:</td><td>{{hoverdata.JSONparse.start.rm}}</td></tr>
	  <tr><td>TMO: </td><td>{{hoverdata.JSONparse.start.tmo}}</td></tr>
	  
	  <tr><td>Modified: </td><td>{{hoverdata.ModifiedShort}}</td></tr>
	  <tr><td>Created: </td><td>{{hoverdata.CreatedShort}}</td></tr>
	  </table>
	  
	</div>
		
		
            <table>
                <tr style="background-color: lightgrey">
                    <td class="dashheader">
                        Returned <br />({{data1.length}})
                    </td>
					
					<td class="dashheader">ID</td>
					<td class="dashheader">Product <br />Name</td>
					<td class="dashheader">Primary <br />Status</td>
					
					<td class="dashheader">Latest <br />Sub-Status </td>
					<td class="dashheader">Training <br />Scheduled Date</td>
					<td class="dashheader">Training <br />Completed Date</td>
					
					<td class="dashheader">Target <br />SLA</td>
					<td class="dashheader">Days <br />Overdue</td>
					<td class="dashheader">Red or Yellow <br />or Green</td>

                </tr>
                <tr ng-repeat="row in data">
					<td>{{row.Id}}</td>
					<td>{{row.JSONparse.start.purpose}}</td>
					<td>{{row.FormStatus}}</td>
					
					<td>[sub status]</td>
					<td></td>
					<td></td>
					
					<td></td>
					<td></td>
					<td></td>
					
					
                </tr>
            </table>

        </div>
    </div>
	
	

	
</body>

</html>