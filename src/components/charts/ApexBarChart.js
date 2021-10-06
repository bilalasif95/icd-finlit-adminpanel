import React from "react";
import { useTheme } from "@material-ui/styles";
import ApexCharts from "react-apexcharts";

export default function ApexBarChart(props) {
  var theme = useTheme();
  function themeOptions() {
    return {
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
        },
      },
      chart: {
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      fill: {
        opacity: 1,
      },
      // tooltip: {
      //   y: {
      //     formatter: function (val) {
      //       return "$ " + val + " thousands";
      //     },
      //   },
      // },
    };
  }
  return (
    <>{props.loading ?
      <>Loading...</> :
      <ApexCharts
        options={themeOptions(theme)}
        series={props.data}
        type="bar"
        height={350}
      />
    }
    </>
  );
}