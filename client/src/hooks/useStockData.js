import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useStockData = (symbol, selectedRange, showCandleChart) => {
  const [chartData, setChartData] = useState({ series: [], options: {} });
  const [latestPrice, setLatestPrice] = useState(null);
  const [latestDate, setLatestDate] = useState(null);
  const [longName, setLongName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [priceChangePercent, setPriceChangePercent] = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(
    async (range) => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/stock/${symbol}?range=${range}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data, longName } = await response.json();
        if (data) {
          const parsedData = JSON.parse(data);

          const dates = Object.keys(parsedData.Close).map((timestamp) =>
            parseInt(timestamp)
          );
          const prices = Object.values(parsedData.Close).map((price, index) => [
            dates[index],
            price,
          ]);

          const latestTimestamp = dates[dates.length - 1];
          const latestPriceValue = prices[prices.length - 1][1];
          const prevPriceValue = prices[prices.length - 2][1];

          const latestDateFormatted = new Date(
            latestTimestamp
          ).toLocaleDateString();

          setLatestPrice(latestPriceValue.toFixed(2));
          setLatestDate(latestDateFormatted);

          const priceChange = latestPriceValue - prevPriceValue;
          const priceChangePercent = (
            (priceChange / prevPriceValue) *
            100
          ).toFixed(2);
          setPriceChangePercent(priceChangePercent);

          // Determine colors based on price change
          const lineColor = priceChange >= 0 ? ["#34c759"] : ["#ff3b30"];

          const series = [{ name: "Closing Price", data: prices }];
          const options = {
            chart: {
              type: "area",
              zoom: { enabled: true },
              parentHeightOffset: -10,
              toolbar: { show: false },
            },
            colors: lineColor,
            dataLabels: { enabled: false },
            stroke: { curve: "smooth" },
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
                  return `₹${value.toFixed(2)}`;
                },
              },
            },
            legend: { horizontalAlign: "left" },
          };

          // Candle chart data preparation
          const candleData = dates.map((date, index) => ({
            x: new Date(date),
            y: [
              parsedData.Open[date],
              parsedData.High[date],
              parsedData.Low[date],
              parsedData.Close[date],
            ],
          }));

          const candleSeries = [{ data: candleData }];
          const candleOptions = {
            chart: {
              type: "candlestick",
              zoom: { enabled: true },
              parentHeightOffset: -10,
              toolbar: { show: false },
            },
            dataLabels: { enabled: false },
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
                  return `₹${value.toFixed(2)}`;
                },
              },
            },
            legend: { horizontalAlign: "left" },
          };

          setChartData({
            series: showCandleChart ? candleSeries : series,
            options: showCandleChart ? candleOptions : options,
          });
          setLongName(longName);
        }
      } catch (error) {
        toast.error(`Failed to fetch data: ${error.message}`);
        navigate("/");
      } finally {
        setLoading(false);
      }
    },
    [symbol, navigate, showCandleChart]
  );

  useEffect(() => {
    fetchData(selectedRange);
  }, [fetchData, selectedRange]);

  return {
    chartData,
    latestPrice,
    latestDate,
    longName,
    loading,
    priceChangePercent,
  };
};

export default useStockData;
