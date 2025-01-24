import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";

function LineChart() {
  const [lineChartData, setLineChartData] = useState({
    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Stock Price",
        data: [],
      },
    ],
  });

  const fetchStockData = async () => {
    try {
      const response = await axios.get('/api/stock-data'); // Replace with your actual API endpoint
      const data = response.data;

      const categories = data.map(item => item.date);
      const seriesData = data.map(item => item.price);

      setLineChartData({
        options: {
          ...lineChartData.options,
          xaxis: {
            categories: categories,
          },
        },
        series: [
          {
            name: "Stock Price",
            data: seriesData,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Stock Price Over Time
      </Typography>
      <ReactApexChart
        options={lineChartData.options}
        series={lineChartData.series}
        type="area"
        height={350}
      />
    </Box>
  );
}

export default LineChart;