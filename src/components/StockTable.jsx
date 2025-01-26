import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const StockTable = ({ stocks }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Stock Symbol</TableCell>
            <TableCell>Current Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((stock, index) => (
            <TableRow key={index}>
              <TableCell>{stock.symbol}</TableCell>
              <TableCell>${stock.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;