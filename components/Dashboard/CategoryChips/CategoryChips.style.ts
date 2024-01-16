import { styled } from "@mui/material/styles";

export const Chips = styled("div")(({ theme }) => ({
  padding: "10px 13px",
  fontSize: "15px",
  borderRadius: "4px",
  background: theme.palette.background.default,
  color: theme.palette.grey[700],
  cursor: "pointer",

  "&.active": {
    color: "#fff",
    background: theme.palette.primary.main,
  },

  "@media (max-width: 768px)": {
    fontSize: "13px",
  },
}));
