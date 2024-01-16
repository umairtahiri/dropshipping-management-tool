import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";

export const IconBox = styled("span")(({ theme }) => ({
  background: "rgba(242, 244, 245, 0.5)",
  borderRadius: "50%",
  margin: "0 22px",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  svg: {
    cursor: "pointer",
    color: `${theme.palette.grey[700]}`,
  },
}));

export const HeaderWrapper = styled(Container)(({ theme }) => ({
  background: theme.palette.background.default,
  maxWidth: "100% !important",
  boxShadow: "0 4px 14px -2px #bebcbc",
  width: "100%",
  position: "sticky",
  top: 0,
  zIndex: 1,
  padding: "20px 30px",

  ".MuiBadge-badge": {
    top: "-12px",
    borderRadius: "4px",
    fontWeight: 400,
    color: theme.palette.background.default,
  },
}));
