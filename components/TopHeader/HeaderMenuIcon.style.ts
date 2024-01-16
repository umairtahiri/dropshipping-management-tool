import { styled } from "@mui/material/styles";

export const HeaderRoot = styled("span")(() => ({
  position: "relative",
  "& .menu-box": {
    display: "none",
    position: "absolute",
    left: -180,
    top: 40,
  },
  "&:hover .menu-box": {
    display: "block",
  },

  ".MuiIconButton-root": {
    "&:hover": {
      backgroundColor: "unset",
    },
  },
}));

export const MenuBoxLinkList = styled("ul")(({ theme }) => ({
  "& a": {
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: "0.3px",
    color: theme.palette.grey[700],
    paddingBottom: 5,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  "& li:first-of-type": {
    paddingTop: 8,
  },
  "& li:last-of-type a": {
    paddingBottom: 8,
  },
}));
