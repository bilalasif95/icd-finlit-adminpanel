import React from "react";
import { useTheme } from "@material-ui/styles";
import ApexCharts from "react-apexcharts";

export default function ApexLineChart(props) {
  var theme = useTheme();
  function themeOptions() {
    return {
      chart: {
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: false
        },
      },
      legend: { position: "top", horizontalAlign: "left" },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    };
  }
  return (
    <ApexCharts
      options={themeOptions(theme)}
      series={props.data}
      type="line"
      height={350}
    />
  );
}