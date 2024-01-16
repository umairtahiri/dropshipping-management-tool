import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const OrderPaper = styled(Paper)(({ theme }) => ({
  border: "none",
  background: theme.palette.background.default,
  borderRadius: "4px 4px 0px 0px",
  boxShadow: "none",
}));

export const CardFooter = styled(Box)({
  padding: "14px 12px",
  background: "#fbfbfb",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const ImageWarpper = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: "4px",
  width: "91px",
  height: "134px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
