import React from "react";
import { useTheme } from "@material-ui/styles";
import ApexCharts from "react-apexcharts";

export default function ApexPieChart(props) {
  var theme = useTheme();
  function themeOptions() {
    return {
      labels: ["Active Users", "Referred Users"],
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: { position: "top", horizontalAlign: "left" },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  }
  return (
    <>{props.loading ?
      <>Loading...</> :
      <ApexCharts
        options={themeOptions(theme)}
        series={props.data}
        type="donut"
        height={300}
      />
    }
    </>
  );
}