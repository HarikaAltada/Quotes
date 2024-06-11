import React from "react";

const QuoteList = ({ quotes, onDelete }) => {
  return (
    <div className="quote-list">
      <h2>Saved Quotes</h2>
      <ul>
        {quotes.map((quote, index) => (
          <li key={index}>
            {quote}
            <button onClick={() => onDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteList;
