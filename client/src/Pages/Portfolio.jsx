import React, { useEffect, useState } from "react";
import CardComponent from "../Components/Card";
import Layout from "./layout";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const PortfolioComponent = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userStocks, setUserStocks] = useState([]);
  const [stockQuantities, setStockQuantities] = useState({});

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/users/${currentUser.user._id}`
        );
        const data = await res.json();
        const stockIds = data.stocks.map((item) => item.stock);
        const stockQuantities = data.stocks.reduce((acc, item) => {
          acc[item.stock] = item.quantity;
          return acc;
        }, {});
        setStockQuantities(stockQuantities);

        const fetchStockDetails = async () => {
          const detailsPromises = stockIds.map(async (stockId) => {
            const detailsRes = await fetch(
              `http://localhost:3000/stocks/${stockId}`
            );
            if (!detailsRes.ok) {
              throw new Error(
                `Failed to fetch details for stock ID ${stockId}`
              );
            }
            return detailsRes.json();
          });

          const details = await Promise.all(detailsPromises);
          setUserStocks(details);
        };

        fetchStockDetails();
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (currentUser) {
      fetchStocks();
    }
  }, [currentUser]);

  return (
    <>
      {currentUser ? (
        <Layout>
          <h1 className="font-bold text-2xl text-start py-4 pt-0">
            My Portfolio
          </h1>
          <div className="flex flex-col gap-6">
            <CardComponent className="overflow-auto h-[26rem]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userStocks.map((stock) => (
                  <div
                    key={stock._id}
                    className="border p-4 rounded-lg shadow-md"
                  >
                    <NavLink to={`/stock/${stock.symbol}`}>
                      <p className="font-semibold">{stock.symbol}</p>
                      <p>{stock.name}</p>
                    </NavLink>
                    <p>
                      {stock.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                    <p>Quantity: {stockQuantities[stock._id]}</p>
                  </div>
                ))}
              </div>
            </CardComponent>
            <div className="flex flex-row gap-6">
              <div className="w-2/3">
                <CardComponent>{/* <HomeChartComponent /> */}</CardComponent>
              </div>
              <div className="w-1/3">
                <CardComponent className="">
                  <div className=""></div>
                </CardComponent>
              </div>
            </div>
          </div>
        </Layout>
      ) : (
        <Layout>
          <div>Please Signin to continue</div>
        </Layout>
      )}
    </>
  );
};

export default PortfolioComponent;
