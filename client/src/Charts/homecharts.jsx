import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import toast from "react-hot-toast";

const HomeChartComponent = () => {
  const [chartData, setChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/stock/aapl");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data) {
          const parsedData = JSON.parse(data);

          const dates = Object.keys(parsedData.Close).map((timestamp) =>
            parseInt(timestamp)
          );
          const prices = Object.values(parsedData.Close).map((price, index) => [
            dates[index],
            price,
          ]);

          const series = [{ name: "Opening Price", data: prices }];

          const options = {
            chart: {
              type: "area",
              zoom: { enabled: false },
              parentHeightOffset: -10,
            },
            dataLabels: { enabled: false },
            stroke: { curve: "straight" },
            title: { text: "Fundamental Analysis of Stocks", align: "left" },
            subtitle: { text: "Price Movements", align: "left" },
            xaxis: {
              type: "datetime",
              labels: {
                show: false,
                formatter: function (val) {
                  return new Date(val).toLocaleDateString();
                },
              },
            },
            yaxis: {
              opposite: true,
              labels: {
                formatter: function (value) {
                  return "$" + value;
                },
              },
            },
            legend: { horizontalAlign: "left" },
          };

          setChartData({ series, options });
        }
      } catch (error) {
        toast.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between px-4">
        <div className="flex flex-col">
          <span className="font-semibold text-xl">Apple</span>
          <span className="text-sm">AAPL</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-xl">Price</span>
          <span className="text-xs">last updates at 12.30</span>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </>
  );
};

export default HomeChartComponent;
