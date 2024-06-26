import React, { useEffect, useState } from "react";
import Layout from "./layout";
import { useParams } from "react-router-dom";
import CardComponent from "../Components/Card";
import Loader from "../Components/Loader";
import { FaChartLine } from "react-icons/fa6";
import { LuCandlestickChart } from "react-icons/lu";
import useStockData from "../hooks/useStockData";
import LineChart from "../Components/LineChart";
import CandleChart from "../Components/CandleChart";
import { Button } from "flowbite-react";
import Transaction from "../Components/Transaction";

const dateRanges = [
  { label: "1 Week", value: "1w" },
  { label: "1 Month", value: "1m" },
  { label: "3 Month", value: "3m" },
  { label: "6 Months", value: "6m" },
  { label: "1 Year", value: "1y" },
  { label: "5 Years", value: "5y" },
  { label: "All", value: "all" },
];

const Stocks = () => {
  const { symbol } = useParams();
  const [selectedRange, setSelectedRange] = useState("1m");
  const [showCandleChart, setShowCandleChart] = useState(false);

  const {
    chartData,
    latestPrice,
    latestDate,
    longName,
    loading,
  } = useStockData(symbol, selectedRange, showCandleChart);

  const toggleChartType = () => {
    setShowCandleChart((prevState) => !prevState);
  };

  const [livePrice, setLivePrice] = useState(null);
  const [openPrice, setOpenPrice] = useState(null);
  const [livePriceChangePercent, setLivePriceChangePercent] = useState(null);

  useEffect(() => {
    const fetchLivePrice = async () => {
      const response = await fetch(`http://localhost:5000/stock/liveprice/${symbol}`);
      const data = await response.json();
      if (data.current_price && data.open_price) {
        setLivePrice(data.current_price);
        setOpenPrice(data.open_price);
      }
    };

    const intervalId = setInterval(fetchLivePrice, 3000);

    fetchLivePrice();

    return () => clearInterval(intervalId);
  }, [symbol]);

  useEffect(() => {
    if (livePrice !== null && openPrice !== null) {
      const priceChange = ((livePrice - openPrice) / openPrice) * 100;
      setLivePriceChangePercent(priceChange.toFixed(2));
    }
  }, [livePrice, openPrice]);

  return (
    <Layout>
      <CardComponent>
        <>
          <div className="flex flex-row justify-between px-4">
            <div className="flex flex-col">
              <span className="font-semibold text-xl">{longName}</span>
              <span className="text-sm">{symbol}</span>
            </div>
            <Transaction symbol={symbol} price={livePrice} name={longName} onTransaction={() => {}} />
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-xl">
                Price: {livePrice !== null ? `₹${livePrice.toFixed(2)}` : 'Loading...'}{" "}
                <span
                  className={`text-sm ${
                    livePriceChangePercent >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {livePriceChangePercent !== null
                    ? `${livePriceChangePercent > 0 ? "+" : ""}${livePriceChangePercent}%`
                    : null}
                </span>
              </span>
              <span className="text-xs">
                Updated at: {latestDate !== null ? latestDate : null}
              </span>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex justify-evenly gap-4 mt-6">
              <div className="flex gap-4 justify-evenly flex-1">
                {dateRanges.map((range) => (
                  <button
                    key={range.value}
                    className={`px-3 py-2 rounded-full w-24 ${
                      selectedRange === range.value
                        ? "bg-black text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedRange(range.value)}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
              <button className="focus:outline-none" onClick={toggleChartType}>
                {!showCandleChart ? (
                  <div className="flex justify-center items-center gap-2 px-3 py-2 rounded-full bg-black text-white ">
                    <LuCandlestickChart size={24} />
                    <span>Candle Chart</span>
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-2 px-3 py-2 rounded-full bg-black text-white">
                    <FaChartLine size={24} />
                    <span>Line Chart</span>
                  </div>
                )}
              </button>
            </div>
            <div id="chart" className="mt-4">
              {loading ? (
                <Loader />
              ) : showCandleChart ? (
                <CandleChart chartData={chartData} />
              ) : (
                <LineChart chartData={chartData} />
              )}
            </div>
          </div>
        </>
      </CardComponent>
    </Layout>
  );
};

export default Stocks;
