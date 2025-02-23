import { useState, useEffect } from "react";
import axios from "axios";
import "../css/Stocks.css"; 
const Stocks = () => {
    const [stocks, setStocks] = useState([]);
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/stocks");
                if(response.data!=null)
                setStocks(response.data); 
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };
        fetchStockData();
    }, []);

    return (
        <div className="stock-container">
            {stocks.length > 0 ? (
                stocks.map((stock, index) => (
                    <div key={index} className="stock-card">
                        <h2>{stock.symbol}</h2>
                        <p>💰 Price: ₹{stock.price}</p>
                        <p>📊 Change: {stock.change}</p>
                        <p>📦 Volume: {stock.volume.toLocaleString()}</p>
                    </div>
                ))
            ) : (
                <p>Loading stock data...</p>
            )}
        </div>
    );
};

export default Stocks;
