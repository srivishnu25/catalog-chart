import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import priceData from "../assets/btcdata.json";

// const volumeData = priceData.map((data) => [
//   data[0],
//   Math.floor(Math.random() * 5000),
// ]);
const volumeData = priceData.map((data, index, arr) => {
  if (index === 0) return [data[0], Math.floor(Math.random() * 1000)]; // First value random
  const prevPrice = arr[index - 1][1];
  const priceChange = Math.abs(data[1] - prevPrice); // Absolute price change
  const estimatedVolume = Math.floor(priceChange * 100); // Scale volume based on price movement
  return [data[0], estimatedVolume];
});

let symbol = ["BTC"];

function ChartTab({ onUpdate }) {
  const options = {
    chart: {
      backgroundColor: "white",
      type: "area",
      height: "500px",
      //   width: 879,
      marginRight: 120,
      events: {
        render: function () {
          var chart = this;
          var buttons = chart.rangeSelector.buttons;

          // Handle selected button style
          buttons.forEach(function (button, index) {
            if (index === chart.rangeSelector.selected) {
              button.element.classList.add("highcharts-button-selected");
            } else {
              button.element.classList.remove("highcharts-button-selected");
            }
          });

          var renderer = chart.renderer;
          var points = chart.series[0].points;
          var lastPoint = points[points.length - 1];
          var lastSecondPoint = points[points.length - 2];
          onUpdate(lastPoint.y.toFixed(2), lastSecondPoint.y.toFixed(2));
          // Label background
          if (!chart.labelBg) {
            chart.labelBg = renderer
              .rect(0, 0, 98, 33, 5)
              .attr({
                fill: "#4b40ee",
              })
              .add();
          } else {
            chart.labelTxt.attr({
              text: lastPoint.y.toFixed(2),
            });
          }

          // Label text
          if (!chart.labelTxt) {
            chart.labelTxt = renderer
              .text(lastPoint.y.toFixed(2), 0, 0)
              .css({
                fontSize: "18px",
                color: "#ffffff",
                fontWeight: "normal",
                fontFamily: `"MyCustomFont", sans-serif`,
              })
              .add();
          }

          // Position label elements
          const xOffset = chart.plotWidth + 12;
          const yOffset = lastPoint.plotY + chart.plotTop - 16;

          chart.labelBg
            .attr({
              x: xOffset,
              y: yOffset,
            })
            .toFront();

          chart.labelTxt
            .attr({
              x: xOffset + 49, // center of 98 width rect
              y: yOffset + 22,
              align: "center",
            })
            .toFront();
        },
      },
    },

    tooltip: {
      formatter: function () {
        const chart = this.series.chart;
        const point = this.point;
        const renderer = chart.renderer;

        // Create the box once
        if (!chart.hoverRect) {
          chart.hoverRect = renderer
            .rect(0, 0, 98, 33, 5)
            .attr({
              fill: "#1A243A",
            })
            .css({
              pointerEvents: "none",
            })
            .add();
        }

        // Create text once
        if (!chart.hoverText) {
          chart.hoverText = renderer
            .text(point.y.toFixed(2), 0, 0)
            .css({
              fontSize: "18px",
              color: "#ffffff",
              fontWeight: "normal",
              fontFamily: "MyCustomFont, sans-serif",
            })
            .add();
        }

        // Update position and text
        chart.hoverRect
          .attr({
            x: chart.plotLeft + chart.plotWidth,
            y: point.plotY + chart.plotTop - 16,
          })
          .toFront();

        chart.hoverText
          .attr({
            text: point.y.toFixed(2),
            x: chart.plotLeft + chart.plotWidth + 17,
            y: point.plotY + chart.plotTop + 6,
          })
          .toFront();

        return false; // prevent default tooltip
      },
      useHTML: false,
      backgroundColor: "transparent",
      borderWidth: 0,
      shadow: false,
      enabled: true,
    },
    credits: false,
    plotOptions: {
      series: {
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, Highcharts.color("#4B40EE").setOpacity(0.35).get("rgba")], // Start color (Primary)
            [1, Highcharts.color("#E8E7FF").setOpacity(0.15).get("rgba")],
          ],
        },
        events: {
          mouseOut: function () {
            const chart = this.chart;

            if (chart.hoverRect) {
              chart.hoverRect.destroy();
              chart.hoverRect = null;
            }

            if (chart.hoverText) {
              chart.hoverText.destroy();
              chart.hoverText = null;
            }
          },
        },
      },
    },
    series: [
      {
        name: symbol,
        data: priceData,
        tooltip: {
          valueDecimals: 2,
        },
      },
      {
        type: "column", // Add volume as bars
        name: "Volume",
        data: volumeData,
        yAxis: 1, // Use second y-axis
        color: "#E2E4E7",
      },
    ],
    colors: ["#4B40EE", "#E8E7FF"],
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: false, // Removes any extra scrollbars
    },
    xAxis: {
      gridLineWidth: 1, // Adds grid lines for the entire height of the graph
      gridLineColor: "#E2E4E7", // Customize the grid line color
      gridLineDashStyle: "solid", // Optional: Customize grid line style
      lineColor: "#E2E4E7", // X-axis main line
      lineWidth: 1,
      labels: {
        enabled: false, // Remove date labels (e.g., "11 Jan 2025")
      },
      crosshair: {
        width: 1,
        color: "#B0B0B0",
        dashStyle: "Dash",
      },
    },
    yAxis: [
      {
        gridLineWidth: 0, // Remove Y-axis lines
        title: {
          text: null, // Remove Y-axis title
        },
        labels: {
          formatter: function () {
            //   console.log(this.axis.dataMax);
            const series = this.axis.chart.series[0];
            if (!series || !series.data || series.data.length === 0) return "";

            const lastPoint = series.data[series.data.length - 1];
            const lastY = lastPoint && lastPoint.y;

            // Match the label value exactly with the last Y value
            if (this.value === lastY) {
              return this.value.toFixed(2);
            }

            return ""; // Don't show other labels
          },
        },
        crosshair: {
          width: 1,
          color: "#B0B0B0",
          dashStyle: "Dash",
        },
      },
      {
        // Secondary Y-Axis (Volume)
        title: { text: null },
        labels: { enabled: false }, // Hide Y-axis labels for volume
        opposite: false, // Align with x-axis
        height: "20%", // Give volume a smaller height
        top: "80%", // Push it to the bottom
        offset: 0,
        gridLineWidth: 0,
      },
    ],
    rangeSelector: {
      inputEnabled: false,
      labelStyle: {
        display: "none", // 👈 This hides the "Zoom" label
      },
      buttonPosition: {
        align: "right",
        x: -48,
        y: 0,
      },
      buttonSpacing: 16,
      buttonTheme: {
        width: 49,
        height: 33,
        r: 8, // optional: rounded corners
        fill: "transparent",
        style: {
          fontSize: "18px",
          fontWeight: "normal",
          color: "#6F7177",
          fontFamily: `"MyCustomFont", 'sans-serif'`,
        },
        states: {
          hover: {
            // Keep it same as normal so hover doesn't affect selected
            fill: "transparent",
            style: {
              color: "#6F7177",
            },
          },
          select: {
            fill: "#4B40EE",
            style: {
              fontWeight: "normal",
              color: "#ffffff",
            },
          },
        },
      },
      buttons: [
        {
          type: "day",
          count: 1,
          text: "1d",
        },
        {
          type: "day",
          count: 3,
          text: "3d",
        },
        {
          type: "day",
          count: 7,
          text: "1w",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
        {
          type: "month",
          count: 12,
          text: "1y",
        },
        {
          type: "all",
          text: "max",
        },
      ],
      selected: 4,
    },
  };

  return (
    <div id="container" className="py-5 w-[78%]">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
}

export default ChartTab;
