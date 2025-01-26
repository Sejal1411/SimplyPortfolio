import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const StockTable = ({ stocks, stockOwnership }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Stock Symbol</TableCell>
            <TableCell>Current Price</TableCell>
            <TableCell>No. of Shares Owned</TableCell>
            <TableCell>Total Investment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((stock, index) => {
            const sharesOwned = stockOwnership?.[stock.symbol] || 0; // Default to 0 if shares owned is not found
            const totalInvestment = (stock.price * sharesOwned).toFixed(2); // Calculate total investment for the stock
            return (
              <TableRow key={index}>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>${stock.price.toFixed(2)}</TableCell>
                <TableCell>{sharesOwned}</TableCell>
                <TableCell>${totalInvestment}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;
