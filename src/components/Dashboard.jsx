import React from "react";
import { Container, Grid2, Typography } from "@mui/material";
import StockTable from "./StockTable";
import AddStockForm from "./AddStockForm";
import MetricsCard from "./MetricsCard";
import LineChart from "./LineChart";

const Dashboard = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Stocks Portfolio Dashboard
      </Typography>

      {/* Metrics Section */}
      <Grid2 container spacing={3} style={{ marginBottom: "20px" }}>
        <Grid2 item xs={12} sm={4}>
          <MetricsCard title="Total Investment" value="$25,000" />
        </Grid2>
        <Grid2 item xs={12} sm={4}>
          <MetricsCard title="Portfolio Value" value="$30,500" />
        </Grid2>
        <Grid2 item xs={12} sm={4}>
          <MetricsCard title="Profit/Loss" value="+22%" />
        </Grid2>
        <Grid2 item xs={12} sm={3}>
          <MetricsCard title="Total Returns" value="$5,500" />
        </Grid2>
      </Grid2>

      {/* Stock Table & Add Form */}
      <Grid2 container spacing={3}>
      <Grid2 item xs={12} md={8}>
          <LineChart />
        </Grid2>
        <Grid2 item xs={12} md={8}>
          <StockTable />
        </Grid2>
        {/* <Grid2 item xs={12} md={4}>
          <AddStockForm />
        </Grid2> */}
      </Grid2>
    </Container>
  );
};

export default Dashboard;
