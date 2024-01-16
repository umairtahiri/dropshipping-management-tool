import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
} from "@mui/material";
import * as React from "react";

interface RemoveVendorPropTypes {
  toggleRemoveModal: () => void;
  handleSelectAll: (checked: boolean) => void;
  allSelected: boolean;
  disabled: boolean;
}

export function RemoveVendor({
  toggleRemoveModal,
  handleSelectAll,
  allSelected,
  disabled,
}: RemoveVendorPropTypes) {
  return (
    <Stack direction="row">
      <Box>
        <FormControl className="ml-5">
          <FormControlLabel
            label=""
            control={
              <Checkbox
                checked={allSelected}
                onChange={(event) => handleSelectAll(event.target.checked)}
              />
            }
          />
        </FormControl>
      </Box>
      <Button
        variant="contained"
        color="primary"
        className="px-10"
        onClick={toggleRemoveModal}
        disableElevation
        disabled={disabled}
      >
        Remove Vendor
      </Button>
    </Stack>
  );
}
