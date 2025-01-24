import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";

const AddStockForm = () => {
  const [stock, setStock] = useState({
    name: "",
    ticker: "",
    quantity: "",
    buyPrice: "",
  });

  const handleChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Stock Added:", stock);
    // Clear the form
    setStock({ name: "", ticker: "", quantity: "", buyPrice: "" });
  };

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Add New Stock
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Stock Name"
          name="name"
          value={stock.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ticker"
          name="ticker"
          value={stock.ticker}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={stock.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Buy Price"
          name="buyPrice"
          type="number"
          value={stock.buyPrice}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Add Stock
        </Button>
      </form>
    </Paper>
  );
};

export default AddStockForm;

