import React, { useEffect, useState } from "react";
import Layout from "./layout";
import CardComponent from "../Components/Card";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import toast from "react-hot-toast";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/news");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        toast.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Layout>
      <h1 className="font-bold text-2xl text-start py-4 pt-0">News</h1>

      <CardComponent className="overflow-auto h-[33rem]">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {news.map((item, index) => (
                <CardComponent
                  key={index}
                  className="bg-gray-100 hover:bg-gray-200"
                >
                  <div className="flex flex-row">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full lg:w-48 h-28 rounded-lg mb-4 lg:mb-0 lg:mr-4"
                    />
                    <div className="flex flex-col justify-between overflow-clip">
                      <div>
                        <h2 className="text-xl font-semibold line-clamp-1 mb-1">
                          <Link
                            to={`/news/${encodeURIComponent(
                              item.title
                            )}/${encodeURIComponent(item.url)}`}
                            className="text-black-500 hover:underline"
                          >
                            {item.title}
                          </Link>
                        </h2>
                        <p className="text-gray-700 line-clamp-2">
                          {item.description}...
                        </p>
                        <p className="text-sm text-gray-500 mt-3">
                          Source: <b>{item.source}</b> &nbsp; | &nbsp;
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardComponent>
              ))}
            </div>
          </>
        )}
      </CardComponent>
    </Layout>
  );
};

export default News;
