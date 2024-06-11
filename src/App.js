import React, { useState, useEffect } from "react";
import axios from "axios";
import QuoteCard from "./Components/quotecard";
import QuoteList from "./Components/QuoteList";
import "./App.css";
const App = () => {
  const [quote, setQuote] = useState("");
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    fetchQuote();
    const storedQuotes = localStorage.getItem("savedQuotes");
    if (storedQuotes) {
      setSavedQuotes(JSON.parse(storedQuotes));
    }
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get(
        "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
      );
      setQuote(response.data[0]);
    } catch (error) {
      console.error("Error fetching the quote:", error);
    }
  };

  const saveQuote = () => {
    const newSavedQuotes = [...savedQuotes, quote];
    setSavedQuotes(newSavedQuotes);
    localStorage.setItem("savedQuotes", JSON.stringify(newSavedQuotes));
    fetchQuote();
  };

  const deleteQuote = (index) => {
    const newSavedQuotes = savedQuotes.filter((_, i) => i !== index);
    setSavedQuotes(newSavedQuotes);
    localStorage.setItem("savedQuotes", JSON.stringify(newSavedQuotes));
  };

  return (
    <div className="app">
      <h1>Ron Swanson Quotes</h1>
      <QuoteCard quote={quote} />
      <div className="button-group">
        <button onClick={saveQuote}>Save to List</button>
        <button onClick={fetchQuote}>Get Another Quote</button>
      </div>
      <QuoteList quotes={savedQuotes} onDelete={deleteQuote} />
    </div>
  );
};

export default App;
