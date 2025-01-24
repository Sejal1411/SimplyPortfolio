import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);

  const fetchStockData = async () => {
    try {
      const response = await axios.get('/api/stocks'); // Replace with your actual API endpoint
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Stock Name</TableCell>
            <TableCell>Ticker</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Buy Price</TableCell>
            <TableCell>Current Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((stock, index) => (
            <TableRow key={index}>
              <TableCell>{stock.name}</TableCell>
              <TableCell>{stock.ticker}</TableCell>
              <TableCell>{stock.quantity}</TableCell>
              <TableCell>${stock.buyPrice}</TableCell>
              <TableCell>${stock.currentPrice}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" size="small" style={{ marginRight: '10px' }}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" size="small">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;