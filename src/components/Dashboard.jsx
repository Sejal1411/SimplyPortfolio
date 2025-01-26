import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Grid2, Typography, IconButton, List, ListItem, ListItemText } from "@mui/material";
import StockTable from "./StockTable";
import MetricsCard from "./MetricsCard";
import MenuIcon from '@mui/icons-material/Menu';

const FINNHUB_API_KEY = "cub091pr01qof06jilg0cub091pr01qof06jilgg"; // Replace with your Finnhub API key
const STOCK_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"]; // Example stock symbols

// Example: Specify how many shares of each stock you own
const STOCK_OWNERSHIP = {
  AAPL: 10,  // 10 shares of AAPL
  MSFT: 15,  // 15 shares of MSFT
  GOOGL: 5,  // 5 shares of GOOGL
  AMZN: 3,   // 3 shares of AMZN
  TSLA: 7    // 7 shares of TSLA
};

const Dashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0); // Will be updated based on stock prices and quantities
  const [profitLoss, setProfitLoss] = useState(0);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  // Fetch username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("name");
    setUsername(storedUsername || "User");
  }, []);

  // Fetch stock data and calculate total investment based on stock prices
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockDataPromises = STOCK_SYMBOLS.map((symbol) =>
          axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
          )
        );

        const stockDataResponses = await Promise.all(stockDataPromises);

        const stockPrices = stockDataResponses.map((response, index) => {
          const symbol = STOCK_SYMBOLS[index];
          const price = response.data.c; // Current price
          const shares = STOCK_OWNERSHIP[symbol] || 0; // Get the number of shares owned for this stock
          const totalStockInvestment = price * shares; // Calculate the investment in this stock
          return {
            symbol,
            price,
            shares,
            totalStockInvestment
          };
        });

        setStocks(stockPrices);

        // Update the total portfolio investment by summing up each stock's investment
        const totalInvestmentValue = stockPrices.reduce(
          (acc, stock) => acc + stock.totalStockInvestment,
          0
        );
        setTotalInvestment(totalInvestmentValue);

        // Calculate profit/loss percentage (if any)
        const profitLossValue =
          ((totalInvestmentValue - totalInvestment) / totalInvestment) * 100;
        setProfitLoss(profitLossValue);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [totalInvestment]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar (always visible) */}
      {sidebarOpen && (
        <div style={{
          width: "250px", 
          backgroundColor: "#f4f4f4", 
          padding: "20px", 
          position: "fixed", 
          height: "100%",
          top: 0,
          left: 0
        }}>
          <List>
            <ListItem button>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button >
              <ListItemText primary="Add Stock" onClick={() => navigate('/app/add-stock')}/>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </div>
      )}

      {/* Main Content */}
      <Container
        maxWidth="lg"
        style={{
          marginTop: "20px",
          marginLeft: sidebarOpen ? "250px" : "0", // Shift content when sidebar is open
          transition: "margin-left 0.3s"
        }}
      >
        {/* Hamburger Icon */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleSidebar}
          style={{ marginBottom: "20px" }}
        >
          <MenuIcon />
        </IconButton>

        {/* Greeting with username */}
        <Typography variant="h5" style={{ color: "orange", marginBottom: "50px" }} gutterBottom align="center">
          Hello, {username}! 👋
        </Typography>

        {/* Metrics Section */}
        <Grid2 container spacing={3} style={{ marginBottom: "20px" }}>
          <Grid2 item xs={12} sm={4}>
            <MetricsCard
              title="Total Investment"
              value={loading ? "Loading..." : `$${totalInvestment.toFixed(2)}`}
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
    </div>
  );
};

export default Dashboard;
