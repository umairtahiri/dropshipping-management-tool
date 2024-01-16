import { styled } from "@mui/material/styles";

export const Option = styled("div")(({ theme }) => ({
  padding: "14px 20px",
  fontSize: "18px",
  columnGap: "18px",
  borderLeft: `3px solid ${theme.palette.background.default}`,
  color: "#000",
  display: "flex",
  justifyContent: "space-between",
  "&.is-active": {
    background: "rgba(175, 233, 223, 0.2)",
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,

    ".MuiTypography-root": {
      color: theme.palette.primary.main,
    },
  },
  "&.collapsed": {
    padding: "16px 20px",
    borderLeftWidth: "2px",
  },
}));

export const SideBar = styled("aside")(({ theme }) => ({
  transition: "0.25s",
  minHeight: "100%",
  maxHeight: "100vh",
  borderRight: `0.5px solid ${theme.palette.grey[200]}`,
  background: "#fdfdfd",
  cursor: "pointer",
  display: "block",
  flexDirection: "column",
  justifyContent: "space-between",
  whiteSpace: "nowrap",
  position: "relative",

  ".MuiAccordion-root": {
    background: "#fdfdfd",

    "&::before": {
      background: "none",
    },
  },

  ".MuiAccordionSummary-root": {
    background: "#fdfdfd",
    minHeight: "unset !important",

    ".MuiAccordionSummary-content": {
      margin: 0,
    },

    "&.is-active": {
      background: "rgba(175, 233, 223, 0.2)",
    },
  },

  "&.sidebar-collapsed": {
    minWidth: "70px",
    maxWidth: "70px",
  },

  "&.sidebar-expanded": {
    minWidth: "341px",
    maxWidth: "341px",
  },

  ".lower-options": {
    position: "absolute",
    width: "100%",
    bottom: "15%",
  },
}));

export const Title = styled("div")({
  paddingLeft: "22px",
  fontWeight: 400,
  fontSize: "26px",
  marginBottom: "40px",
  marginTop: "44px",
  display: "flex",
  alignItems: "center",
  columnGap: "14px",
});

export const CollapseButton = styled("div")({
  background: "#fff",
  borderRadius: "50%",
  position: "absolute",
  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
  color: "#898A8D",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "30px",
  padding: "2px",
  right: -12,
  top: 35,
  zIndex: 1,
});
