import { useState } from "react";
import "../css/Nav.css";

const API_KEY = "VSG6W883WBCHDAT3";

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [bestMatch, setBestMatch] = useState(null);

    const fetchStockSymbol = async (query) => {
        if (query.length < 2) {
            setSuggestions([]);
            setBestMatch(null);
            return;
        }

        try {
            const response = await fetch(
                `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`
            );
            const data = await response.json();
            
            if (data.bestMatches) {
                const stocks = data.bestMatches.map(stock => ({
                    name: stock["2. name"],
                    symbol: stock["1. symbol"]
                }));
                setSuggestions(stocks);
                setBestMatch(stocks.length > 0 ? stocks[0] : null);
            }
        } catch (error) {
            console.error("Error fetching stock symbols:", error);
        }
    };



    const handleSelectStock = (stock) => {
        setSearchTerm("");  
        setSuggestions([]); 
        console.log(stock.symbol); 
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && bestMatch) {
            handleSelectStock(bestMatch);
        }
    };

    return (
        <header className="header">
            <nav className="nav">
                <ul className="ul">
                    <li className="li">Home</li>
                    <li className="li">View Stocks</li>
                    <li className="li">My Portfolio</li>
                </ul>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search stocks..."
                        value={searchTerm}
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                            fetchStockSymbol(event.target.value);
                        }}
                        onKeyDown={handleKeyPress}
                    />
                    {suggestions.length > 0 && (
                        <ul className="suggestions">
                            {suggestions.map((stock, index) => (
                                <li 
                                    key={index} 
                                    className="suggestion-item"
                                    onClick={() => handleSelectStock(stock)}
                                >
                                    {stock.name} ({stock.symbol})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;