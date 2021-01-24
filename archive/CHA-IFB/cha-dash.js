window.onload = function () {
  var chart = new CanvasJS.Chart("chartContainer2", {
    animationEnabled: true,
    title: {
      text: "R-Department",
    },
    data: [
      {
        type: "pie",
        startAngle: 240,
        yValueFormatString: '##0.00"%"',
        indexLabel: "{label} {y}",
        dataPoints: [
          { y: 79.45, label: "Google" },
          { y: 7.31, label: "Bing" },
          { y: 7.06, label: "Baidu" },
          { y: 4.91, label: "Yahoo" },
          { y: 1.26, label: "Others" },
        ],
      },
    ],
  });
  chart.render();

  // ---

  var totalVisitors = 883000;
  var visitorsData = {
    "R-Status": [
      {
        click: visitorsChartDrilldownHandler,
        cursor: "pointer",
        explodeOnClick: false,
        innerRadius: "75%",
        legendMarkerType: "square",
        name: "R-Status",
        radius: "100%",
        showInLegend: true,
        startAngle: 90,
        type: "doughnut",
        dataPoints: [
          { y: 519960, name: "New Visitors", color: "#E7823A" },
          { y: 363040, name: "Returning Visitors", color: "#546BC1" },
        ],
      },
    ],
    "New Visitors": [
      {
        color: "#E7823A",
        name: "New Visitors",
        type: "column",
        dataPoints: [
          { x: new Date("1 Jan 2015"), y: 33000 },
          { x: new Date("1 Feb 2015"), y: 35960 },
          { x: new Date("1 Mar 2015"), y: 42160 },
          { x: new Date("1 Apr 2015"), y: 42240 },
          { x: new Date("1 May 2015"), y: 43200 },
          { x: new Date("1 Jun 2015"), y: 40600 },
          { x: new Date("1 Jul 2015"), y: 42560 },
          { x: new Date("1 Aug 2015"), y: 44280 },
          { x: new Date("1 Sep 2015"), y: 44800 },
          { x: new Date("1 Oct 2015"), y: 48720 },
          { x: new Date("1 Nov 2015"), y: 50840 },
          { x: new Date("1 Dec 2015"), y: 51600 },
        ],
      },
    ],
    "Returning Visitors": [
      {
        color: "#546BC1",
        name: "Returning Visitors",
        type: "column",
        dataPoints: [
          { x: new Date("1 Jan 2015"), y: 22000 },
          { x: new Date("1 Feb 2015"), y: 26040 },
          { x: new Date("1 Mar 2015"), y: 25840 },
          { x: new Date("1 Apr 2015"), y: 23760 },
          { x: new Date("1 May 2015"), y: 28800 },
          { x: new Date("1 Jun 2015"), y: 29400 },
          { x: new Date("1 Jul 2015"), y: 33440 },
          { x: new Date("1 Aug 2015"), y: 37720 },
          { x: new Date("1 Sep 2015"), y: 35200 },
          { x: new Date("1 Oct 2015"), y: 35280 },
          { x: new Date("1 Nov 2015"), y: 31160 },
          { x: new Date("1 Dec 2015"), y: 34400 },
        ],
      },
    ],
  };

  var newVSReturningVisitorsOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "R-Status",
    },
    subtitles: [
      {
        text: "Click segment to expand",
        backgroundColor: "#2eacd1",
        fontSize: 16,
        fontColor: "white",
        padding: 5,
      },
    ],
    legend: {
      fontFamily: "calibri",
      fontSize: 14,
      itemTextFormatter: function (e) {
        return (
          e.dataPoint.name +
          ": " +
          Math.round((e.dataPoint.y / totalVisitors) * 100) +
          "%"
        );
      },
    },
    data: [],
  };

  var visitorsDrilldownedChartOptions = {
    animationEnabled: true,
    theme: "light2",
    axisX: {
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      lineThickness: 1,
    },
    data: [],
  };

  var chart = new CanvasJS.Chart(
    "chartContainer",
    newVSReturningVisitorsOptions
  );
  chart.options.data = visitorsData["R-Status"];
  chart.render();

  function visitorsChartDrilldownHandler(e) {
    chart = new CanvasJS.Chart(
      "chartContainer",
      visitorsDrilldownedChartOptions
    );
    chart.options.data = visitorsData[e.dataPoint.name];
    chart.options.title = { text: e.dataPoint.name };
    chart.render();
    $("#backButton").toggleClass("invisible");
  }

  $("#backButton").click(function () {
    $(this).toggleClass("invisible");
    chart = new CanvasJS.Chart("chartContainer", newVSReturningVisitorsOptions);
    chart.options.data = visitorsData["R-Status"];
    chart.render();
  });

  // ---

  var chart = new CanvasJS.Chart("chartContainer3", {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "light2", "dark1", "dark2"
    title: {
      text: "R-State",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelFontSize: 16,
        indexLabelPlacement: "outside",
        dataPoints: [
          { x: 10, y: 71 },
          { x: 20, y: 55 },
          { x: 30, y: 50 },
          { x: 40, y: 65 },
          { x: 50, y: 92, indexLabel: "\u2605 Highest" },
          { x: 60, y: 68 },
          { x: 70, y: 38 },
          { x: 80, y: 71 },
          { x: 90, y: 54 },
          { x: 100, y: 60 },
          { x: 110, y: 36 },
          { x: 120, y: 49 },
          { x: 130, y: 21, indexLabel: "\u2691 Lowest" },
        ],
      },
    ],
  });
  chart.render();
};


$(document).ready( function () {
    $('#myTable').DataTable();
} );