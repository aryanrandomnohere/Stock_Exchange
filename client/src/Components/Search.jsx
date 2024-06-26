import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const SearchComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [stockOptions, setStockOptions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const fetchStockSymbols = async () => {
    try {
      const response = await fetch("http://localhost:5000/symbol");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Ensure data is parsed correctly from JSON string
      const parsedData = JSON.parse(data);
      
      // Transform data into an array of { Ticker, Name } objects
      const transformedData = Object.keys(parsedData.Ticker).map(key => ({
        Ticker: parsedData.Ticker[key],
        Name: parsedData.Name[key]
      }));
      
      return transformedData;
    } catch (error) {
      toast.error(`Failed to fetch symbols: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchStockSymbols().then((data) => {
      if (data) {
        setStockOptions(data);
      }
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === "") {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filteredSuggestions = stockOptions.filter((suggestion) =>
        suggestion.Ticker.toLowerCase().includes(value.toLowerCase()) ||
        suggestion.Name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }
  };

  const handleInputFocus = () => {
    if (inputValue !== "") {
      setShowSuggestions(true);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion.Ticker);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-[200px] sm:w-[270px] md:w-[390px]">
      <form>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <CiSearch size={24} className="text-gray-500 font-extrabold" />
          </div>
          <input
            ref={inputRef}
            type="search"
            id="default-search"
            className="block w-full p-4 py-2.5 pl-10 text-sm text-gray-900 border-0 rounded-xl bg-gray-100 focus:ring-gray-400 focus:shadow-[0px_0px_0px_3px_rgba(0,0,0,0.2)] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
            placeholder="Search for symbols or names..."
            value={inputValue}
            onChange={handleChange}
            onFocus={handleInputFocus}
            autoComplete="off"
            required
          />
        </div>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800">
          {suggestions.map((suggestion, index) => (
            <NavLink
              key={index}
              to={`/stock/${suggestion.Ticker}`}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <li className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                <div className="flex flex-col">
                  <p className="font-semibold text-blue-600 text-sm">{suggestion.Ticker}</p>
                  <p className="text-xs text-gray-600">{suggestion.Name}</p>
                </div>
              </li>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
