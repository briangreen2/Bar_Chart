anychart.onDocumentReady(function () {
        
    // create a bar chart
    let chart = anychart.bar();

    // data
    let winlossData = [
[44, 38, "2021-22"],
[48, 24, "2020-21"],
[35, 37, "2019-20"],
[42, 40, "2018-19"],
[28, 54, "2017-18"],
[20, 62, "2016-17"],
[21, 61, "2015-16"],
[38, 44, "2014-15"],
[44, 38, "2013-14"],
[49, 33, "2012-13"],
[22, 44, "2011-12"],
[24, 58, "2010-11"],
[12, 70, "2009-10"],
[34, 48, "2008-09"],
[34, 48, "2007-08"],
[41, 41, "2006-07"],
[49, 33, "2005-06"],
[42, 40, "2004-05"],
[47, 35, "2003-04"],
[49, 33, "2002-03"],
[52, 30, "2001-02"],
[26, 56, "2000-01"],
[31, 51, "1999-00"],
[16, 34, "1998-99"],
[43, 39, "1997-98"],
[26, 56, "1996-97"]
];

    // configure a function to create series
    let createSeries = function (columnNumber, name) {
      let data = [];
      for (let i = 0; i < winlossData.length; i++) {

        // calculate percentages for the tooltip
        let val = winlossData[i][columnNumber] * 100;
        if (columnNumber == 0) {
          var percentValue =
            val / (winlossData[i][columnNumber] + winlossData[i][columnNumber + 1]);
       } else {
          var percentValue =
            val / (winlossData[i][columnNumber] + winlossData[i][columnNumber - 1]);
        }
        percentValue = percentValue.toFixed(2);     
    
        var value = winlossData[i][columnNumber];
        var center = 0;
        if (name === "Wins") {
          data.push({
            x: winlossData[i][2],
            low: center,
            high: center + value,
            value: value,
            // add the calculated percentage value
            percentValue: percentValue
          });
        } else {
          data.push({
            x: winlossData[i][2],
            low: -center,
            high: -center - value,
            value: value,
            // add the calculated percentage value
            percentValue: percentValue
          });
        }
      }
  
      var series = chart.rangeBar(data);
      series.name(name).stroke("3 #fff 1").selectionMode("none");
    };

    // create series
    createSeries(0, "Losses");
    createSeries(1, "Wins");

    // set the chart title
    chart
      .title()
      .enabled(true)
      .text("20 Years of BKN/NJ Nets Win-Loss Record (1996-2022)");

    // enable the chart legend
    chart
      .legend()
      .enabled(true);

    // create a stacked bar chart from the multi-series bar chart
    chart.yScale().stackMode("value");

    // customize the settings of the axes
    chart
      .xAxis()
      .ticks(false);
    chart
      .xAxis()
      .title()
      .enabled(true)
      .text("Years")
      .padding([0, 0, 10, 0]);
    chart
      .xAxis()
      .labels()
      .fontSize(11)
      .fontColor("#474747")
      .padding([0, 10, 0, 0]);
    chart.yScale().maximum(80);
    chart
      .yAxis(0)
      .labels()
      .format(function () {
        return Math.abs(this.value);
      });

    

    // create a line marker at 0
    chart
      .lineMarker()
      .value(0)
      .stroke("#CECECE");

    // customize the tooltip
    chart
      .tooltip()
      .useHtml(true)
      .fontSize(12)
      .titleFormat(function () {
        return this.getData("x") + " " + this.seriesName;
      })
      .format(function () {
        return (
          "<h6 style='font-size:12px; font-weight:400; margin: 0.25rem 0;'>Total games: " +
          "<b>" +
          this.getData("value") +
          "</b></h6>" +
          "<h6 style='font-size:12px; font-weight:400; margin: 0.25rem 0;'>Percentage games: " +
          "<b>" +
          this.getData("percentValue") +
          " %</b></h6>"
        );
      });

    // set a custom color palette
    chart.palette(
      anychart.palettes.distinctColors().items(["#000000", "#696969"])
    );

    // set a container id for the chart
    chart.container("container");

    // initiate chart drawing
    chart.draw();

  });