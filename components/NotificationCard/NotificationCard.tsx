import { Box, Button, Paper, Typography } from "@mui/material";
import * as React from "react";

interface NotificationCardPropTypes {
  notification: {
    title: string;
    message: string;
    date: string;
  };
}

export function NotificationCard({ notification }: NotificationCardPropTypes) {
  const { title, message, date } = notification;
  return (
    <Paper
      elevation={0}
      className="w-full flex items-center justify-between p-7 rounded flex-wrap"
    >
      <Box className="w-full md:w-8/12">
        <Typography variant="h4" className="mb-3">
          {title}
        </Typography>
        <Typography variant="body2" className="mb-5">
          {message}
        </Typography>
        <Typography variant="body2" className="light-grey" gutterBottom>
          {date}
        </Typography>
      </Box>
      <Button variant="contained" className="mt-4 md:mt-0">
        View in My Products
      </Button>
    </Paper>
  );
}
