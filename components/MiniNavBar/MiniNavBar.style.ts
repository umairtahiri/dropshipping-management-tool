import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NavBarContainer = styled(Paper)(({ theme }) => ({
  padding: "15px",
  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
  position: "fixed",
  bottom: 0,
  width: "100%",

  ".navbar-option-isactive": {
    color: theme.palette.primary.main,
  },

  ".navbar-option-inactive": {
    color: theme.palette.grey[800],
  },
}));
