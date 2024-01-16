import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface PopoverConfirmPropTypes {
  anchorEl: any;
  handleClose: () => void;
  handleDelete: () => void;
  id: string;
  open: boolean;
}

export function PopoverConfirm({
  anchorEl,
  handleClose,
  handleDelete,
  id,
  open,
}: PopoverConfirmPropTypes) {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box className="px-6 py-4">
        <Typography variant="h5" className="mb-4">
          Are you sure to delete this product?
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disableElevation
          >
            Delete
          </Button>
          <Button variant="contained" onClick={handleClose} disableElevation>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Popover>
  );
}
