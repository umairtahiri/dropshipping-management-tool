import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import * as React from "react";

interface RemoveModalPropTypes {
  showModal: boolean;
  onClose: () => void;
  onRemove: () => void;
  title: string;
  message: string;
  products: Array<string>;
}

export function RemoveModal({
  showModal,
  onClose,
  title,
  message,
  onRemove,
  products,
}: RemoveModalPropTypes) {
  return (
    <Dialog
      open={showModal}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-message"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ padding: "25px 52px 10px 52px" }}
      >
        <Typography variant="h4">{title}</Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: "0 52px" }}>
        <DialogContentText id="alert-dialog-message">
          <Typography variant="body2">{message}:</Typography>
          <Box>
            <ul className="list-disc ml-6 mt-4">
              {products.map((product) => (
                <li key={product} className="text-black mb-2">
                  {product}
                </li>
              ))}
            </ul>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: "25px 52px 30px 52px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onRemove}
          disableElevation
        >
          Remove
        </Button>
        <Button variant="text" onClick={onClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
