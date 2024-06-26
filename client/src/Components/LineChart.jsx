import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ chartData }) => {
  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="area"
      height={350}
    />
  );
};

export default LineChart;
