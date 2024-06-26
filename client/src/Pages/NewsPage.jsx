import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./layout";
import CardComponent from "../Components/Card";
import Loader from "../Components/Loader";
import toast from "react-hot-toast";

const NewsPage = () => {
  const { url } = useParams();
  const [newsArticle, setNewsArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsArticle = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/news/${encodeURIComponent(url)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news article");
        }
        const data = await response.json();
        setNewsArticle(data);
      } catch (error) {
        toast.error("Error fetching news article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsArticle();
  }, [url]);

  const renderFullDescription = (fullDescription) => {
    const sentences = fullDescription.split(". ");
    const chunks = [];

    for (let i = 0; i < sentences.length; i += 2) {
      chunks.push(sentences.slice(i, i + 2).join(". "));
    }

    return chunks.map((chunk, index) => (
      <p key={index} className="mb-4">
        {chunk}
        {chunk.endsWith(".") ? "" : "."}
      </p>
    ));
  };

  return (
    <Layout>
      <CardComponent className="overflow-auto h-[36rem]">
        {loading ? (
          <Loader />
        ) : (
          newsArticle && (
            <div className="max-w-3xl mx-auto p-4">
              <h1 className="text-3xl font-bold mb-4">{newsArticle.title}</h1>
              <p className="text-gray-600 mb-4">
                By <b>{newsArticle.author}</b>&nbsp; | &nbsp;{newsArticle.date}
              </p>
              <img
                src={newsArticle.image_url}
                alt={newsArticle.title}
                className="w-full h-auto mb-4 rounded shadow"
              />
              <p className="text-lg mb-4">{newsArticle.description}</p>
              <div className="text-lg">
                {renderFullDescription(newsArticle.full_description)}
              </div>
            </div>
          )
        )}
      </CardComponent>
    </Layout>
  );
};

export default NewsPage;
