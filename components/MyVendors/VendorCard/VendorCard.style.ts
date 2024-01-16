import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const VendorPaper = styled(Paper)(({ theme }) => ({
  padding: "18px",
  border: "none",
  background: theme.palette.background.default,
  borderRadius: "4px 4px 0px 0px",
  boxShadow: "none",
}));

export const ImageWarpper = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: "4px",
  width: 120,
  height: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
