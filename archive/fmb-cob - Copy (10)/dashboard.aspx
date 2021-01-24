<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>COB Dashboard</title>

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
    <script src="dashboard.js"></script>

</head>

<body>


    <div ng-app="cobDashboardApp">
        <div ng-controller="cobDashboardCtl">
		
		
		<h2>
            <a href="https://firstmidwest.sharepoint.com/sites/cobtest">
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
                    <td class="dashheader">Open <br />({{data2.length}})</td>
                    <td class="dashheader">In Queue<br />({{data3.length}})</td>
                    <td class="dashheader">In Progress<br />({{data4.length}})</td>
                    <td class="dashheader">Out To<br />Client ({{data5.length}})</td>
                    <td class="dashheader">Under<br />Review ({{data6.length}})</td>
                    <td class="dashheader">Account(s)<br />Complete ({{data7.length}})</td>
                    <td class="dashheader">Docs<br />Approved ({{data8.length}})</td>
                    <td class="dashheader">Set up<br />Complete ({{data9.length}})</td>
                    <td class="dashheader">Product(s)<br />Established ({{data10.length}})</td>
                    <td class="dashheader">Training<br />Complete ({{data11.length}})</td>
                    <td class="dashheader">CIS Record InProgress <br />({{data15.length}})</td>
                    <td class="dashheader">CIS Record Complete <br />({{data16.length}})</td>
                    <td class="dashheader">Closed <br />({{data12.length}})</td>
                    <td class="dashheader">On Hold <br />({{data13.length}})</td>
                    <td class="dashheader">Purge <br />({{data14.length}})</td>
                    <td class="dashheader">OnBoarding Complete <br />({{data17.length}})</td>
                </tr>
                <tr>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data1" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : ((c.elapsed > 0) && (c.elapsed < 10)), 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2"><div class="cardname">{{c.JSONparse.start.companyName}}</div></td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>

                    </td>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data2" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2"><div class="cardname">{{c.JSONparse.start.companyName}}</div></td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>

                    </td>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data3" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2"><div class="cardname">{{c.JSONparse.start.companyName}}</div></td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>

                    </td>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data4" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <div class="cardname">{{c.JSONparse.start.companyName}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>

                    </td>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data5" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <div class="cardname">
                                            {{c.JSONparse.start.companyName}}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>

                    </td>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data6" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <div class="cardname">{{c.JSONparse.start.companyName}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data7" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <div class="cardname">{{c.JSONparse.start.companyName}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data8" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <div class="cardname">{{c.JSONparse.start.companyName}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data9" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <div class="cardname">{{c.JSONparse.start.companyName}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data10" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <div class="cardname">{{c.JSONparse.start.companyName}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data11" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <div class="cardname">{{c.JSONparse.start.companyName}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                    <td class="cardcol">
                            <div class="card" ng-repeat="c in data15" ng-mouseover="hover(c, $event)">
                                <table ng-click="navigate(c)">
                                    <tr>
                                        <td class="cardid">#{{c.Id}}</td>
                                        <td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <div class="cardname">{{c.JSONparse.start.companyName}}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                        <td class="cardcol">
                                <div class="card" ng-repeat="c in data16" ng-mouseover="hover(c, $event)">
                                    <table ng-click="navigate(c)">
                                        <tr>
                                            <td class="cardid">#{{c.Id}}</td>
                                            <td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <div class="cardname">{{c.JSONparse.start.companyName}}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data12" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <div class="cardname">{{c.JSONparse.start.companyName}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data13" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <div class="cardname">{{c.JSONparse.start.companyName}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                    <td class="cardcol">
                        <div class="card" ng-repeat="c in data14" ng-mouseover="hover(c, $event)">
                            <table ng-click="navigate(c)">
                                <tr>
                                    <td class="cardid">#{{c.Id}}</td>
									<td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <div class="cardname">{{c.JSONparse.start.companyName}}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                    <td class="cardcol">
                            <div class="card" ng-repeat="c in data17" ng-mouseover="hover(c, $event)">
                                <table ng-click="navigate(c)">
                                    <tr>
                                        <td class="cardid">#{{c.Id}}</td>
                                        <td ng-class="{'card_sla_green' : c.elapsed < 10, 'card_sla_yellow' : c.elapsed > 10, 'card_sla_red' : c.elapsed > 30}">Days:{{c.elapsed}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <div class="cardname">{{c.JSONparse.start.companyName}}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">{{c.JSONparse.start.purpose}}</td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                </tr>
            </table>

        </div>
    </div>
	
	

	
</body>

</html>