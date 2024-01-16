import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

import { IOSSwitch } from "../../Common/Switch/Switch";

export function OrdersSettings() {
  return (
    <Paper elevation={0} className="w-full p-8 rounded-t">
      <Typography variant="h4" gutterBottom className="mb-8" component="div">
        Orders
      </Typography>
      <FormControl>
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
          className="mr-2"
          label={
            <Box className="ml-3">
              <Typography variant="h5" gutterBottom component="div">
                Automatic order cancellation
              </Typography>
              <Typography variant="body1" gutterBottom component="div">
                When your customer cancels an order in your store, and you have
                not paid for the order on Sharove.com, the system will cancel it
                automatically.
              </Typography>
            </Box>
          }
        />
      </FormControl>
      <Divider className="my-7" />
      <FormControl>
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
          label={
            <Box className="ml-3">
              <Typography variant="h5" gutterBottom component="div">
                Automatic logistics synchronization
              </Typography>
              <Typography variant="body1" gutterBottom component="div">
                When your supplier modifies the tracking number, the system will
                synchronize it to your store automatically.
              </Typography>
            </Box>
          }
          style={{ marginRight: "8px" }}
        />
      </FormControl>
    </Paper>
  );
}
