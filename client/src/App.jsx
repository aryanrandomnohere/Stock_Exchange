import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToasterProvider from "./Components/Toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import News from "./Pages/News";
import Stocks from "./Pages/Stocks";
import NewsPage from "./Pages/NewsPage";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import PortfolioComponent from "./Pages/Portfolio";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToasterProvider />
        <div className="app flex">
          <Routes>
            <Route path="/" element={<PortfolioComponent />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/news" element={<News />} />
            <Route path="/stock/:symbol" element={<Stocks />} />
            <Route path="/news/:title/:url" element={<NewsPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
