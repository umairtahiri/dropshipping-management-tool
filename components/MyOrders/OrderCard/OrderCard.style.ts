import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const OrderPaper = styled(Paper)(({ theme }) => ({
  padding: "18px",
  border: "none",
  background: theme.palette.background.default,
  borderRadius: "4px 4px 0px 0px",
  boxShadow: "none",
}));

export const Status = styled(Box)(({ theme }) => ({
  padding: "10px 20px",
  border: `1px solid ${theme.palette.grey[500]}`,
  color: theme.palette.grey[800],
  borderRadius: "4px",
  columnGap: "15px",
  display: "flex",
  alignItems: "center",
}));

export const TransitStatusIcon = styled(Paper)({
  width: "13px",
  height: "13px",
  borderRadius: "50%",
  background: "#FFA400",
});

export const DeliveredStatusIcon = styled(Paper)({
  width: "13px",
  height: "13px",
  borderRadius: "50%",
  background: "#4BBCAA",
});

export const DisputedStatusIcon = styled(Paper)({
  width: "13px",
  height: "13px",
  borderRadius: "50%",
  background: "#BC4B4B",
});

export const ProcessingStatusIcon = styled(Paper)({
  width: "13px",
  height: "13px",
  borderRadius: "50%",
  background: "#FFD700",
});
