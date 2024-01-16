import {
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";

export function GeneralSettings() {
  return (
    <Paper elevation={0} className="w-full p-8 rounded-t">
      <Typography variant="h4" gutterBottom className="mb-8" component="div">
        Auto Updates
      </Typography>
      <Typography variant="h5" gutterBottom component="div">
        When a product is no longer available
      </Typography>
      <Typography variant="body1" gutterBottom component="div">
        Choose an action when one of your products is no longer available from
        the supplier. Applies to all existing products.
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="set_qty_to_zero"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="unpublish_product"
            control={<Radio />}
            label="Unpublish product"
          />
          <FormControlLabel
            value="set_qty_to_zero"
            control={<Radio />}
            label="Set quantity to zero"
          />
          <FormControlLabel
            value="do_nothing"
            control={<Radio />}
            label="Do nothing"
          />
        </RadioGroup>
      </FormControl>
      <Divider className="my-10" />
      <Typography variant="h5" gutterBottom component="div">
        When the cost changes
      </Typography>
      <Typography variant="body1" gutterBottom component="div">
        Choose an action when the cost of your product changes.
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="update_price"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="do_nothing"
            control={<Radio />}
            label="Do nothing"
          />
          <FormControlLabel
            value="update_price"
            control={<Radio />}
            label="Update price and compare-at price"
          />
          <FormControlLabel
            value="update_price_only"
            control={<Radio />}
            label="Update price only"
          />
        </RadioGroup>
      </FormControl>
      <Divider className="my-10" />
      <Typography variant="h5" gutterBottom component="div">
        When inventory changes
      </Typography>
      <Typography variant="body1" gutterBottom component="div">
        Choose an action when the inventory level of a particular product
        changes.
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="auto_updates"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="do_nothing"
            control={<Radio />}
            label="Do nothing"
          />
          <FormControlLabel
            value="auto_updates"
            control={<Radio />}
            label="Auto updates"
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
}
