import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType, country = "all", ...props }) {
  const [graphData, setGraphData] = useState({});
  const [colorOfGraph, setColorOfGraph] = useState("rgba(204, 16, 52, 0.3)");
  const [borderColorOfGraph, setBorderColorOfGraph] = useState("#CC1034");

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://disease.sh/v3/covid-19/historical/${country}?lastdays=300`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let datas = data.timeline ? data.timeline : data;
          let dataToCreateChart = buildChartData(datas, casesType);

          setGraphData(dataToCreateChart);
          switch (casesType) {
            case "cases":
              setColorOfGraph("rgba(204, 16, 52, 0.3)");
              setBorderColorOfGraph("#CC1034");
              break;

            case "recovered":
              setColorOfGraph("rgba(125, 215, 29, 0.3)");
              setBorderColorOfGraph("#7dd71d");
              break;

            case "deaths":
              setColorOfGraph("rgba(251, 68, 67, 0.3)");
              setBorderColorOfGraph("#fb4443");
              break;

            default:
              break;
          }
        });
    };

    fetchData();
  }, [casesType, country]);

  let graphLabel = `${casesType} in ${country}`.toUpperCase();
  if (country === "all") {
    graphLabel = `${casesType} in WORLDWIDE`.toUpperCase();
  }

  return (
    <div className={props.className}>
      {graphData.length > 0 && (
        <Line
          height={350}
          data={{
            datasets: [
              {
                label: graphLabel,
                backgroundColor: colorOfGraph,
                borderColor: borderColorOfGraph,
                data: graphData,
                borderWidth: 2,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
