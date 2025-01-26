import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Grid2, Typography } from "@mui/material";
import StockTable from "./StockTable";
import MetricsCard from "./MetricsCard";

const FINNHUB_API_KEY = "cub091pr01qof06jilg0cub091pr01qof06jilgg"; // Replace with your Finnhub API key
const STOCK_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"]; // Example stock symbols

const Dashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(25000); // Example initial investment value
  const [profitLoss, setProfitLoss] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockDataPromises = STOCK_SYMBOLS.map((symbol) =>
          axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`)
        );

        const stockDataResponses = await Promise.all(stockDataPromises);

        const stockPrices = stockDataResponses.map((response, index) => ({
          symbol: STOCK_SYMBOLS[index],
          price: response.data.c, // Current price
        }));

        setStocks(stockPrices);

        const totalValue = stockPrices.reduce(
          (acc, stock) => acc + (stock.price || 0),
          0
        );
        setPortfolioValue(totalValue);

        const profitLossValue =
          ((totalValue - totalInvestment) / totalInvestment) * 100;
        setProfitLoss(profitLossValue);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Stocks Portfolio Dashboard
      </Typography>

      {/* Metrics Section */}
      <Grid2 container spacing={3} style={{ marginBottom: "20px" }}>
        <Grid2 item xs={12} sm={4}>
          <MetricsCard
            title="Total Investment"
            value={`$${totalInvestment.toFixed(2)}`}
          />
        </Grid2>
        <Grid2 item xs={12} sm={4}>
          <MetricsCard
            title="Portfolio Value"
            value={loading ? "Loading..." : `$${portfolioValue.toFixed(2)}`}
          />
        </Grid2>
        <Grid2 item xs={12} sm={4}>
          <MetricsCard
            title="Profit/Loss"
            value={loading ? "Loading..." : `${profitLoss.toFixed(2)}%`}
          />
        </Grid2>
      </Grid2>

      {/* Stock Table Section */}
      <Grid2 container spacing={3}>
        <Grid2 item xs={12}>
          {loading ? (
            <Typography variant="h6" align="center">
              Loading stock data...
            </Typography>
          ) : (
            <StockTable stocks={stocks} />
          )}
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Dashboard;
