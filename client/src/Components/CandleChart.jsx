import React from "react";
import ReactApexChart from "react-apexcharts";

const CandleChart = ({ chartData }) => {
  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="candlestick"
      height={350}
    />
  );
};

export default CandleChart;
