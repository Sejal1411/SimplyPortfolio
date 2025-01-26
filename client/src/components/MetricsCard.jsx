import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const MetricsCard = ({ title, value }) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" color="primary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;

