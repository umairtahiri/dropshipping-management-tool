import { Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BorderLessSelect = styled(Select)({
  fontSize: "14px",
  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  ".MuiSelect-select": {
    textTransform: "capitalize",
  },
});

export const BorderLessInput = styled(TextField)({
  width: "100%",
  fontSize: "14px",
  ".MuiInputBase-input": {
    backgroundColor: "#F2F2F2",
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});
