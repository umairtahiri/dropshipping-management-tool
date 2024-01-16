import { styled } from "@mui/material/styles";

export const SearchWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  ".MuiOutlinedInput-root": {
    padding: "0 !important",
  },
  "#controllable-states-demo:focus": {
    "--tw-ring-color": "white !important",
  },
  "#controllable-states-demo": {
    pointerEvents: "none !important",
  },
});

export const SearchIconBtn = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  zIndex: 1,
  borderRadius: "0 4px 4px 0",
  button: {
    color: theme.palette.background.default,
    backgroundColor: theme.palette.primary.main,
    padding: "9px",
  },
  svg: {
    fontSize: "22px",
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));
