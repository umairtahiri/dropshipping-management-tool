import { styled } from "@mui/material/styles";

import * as media from "@/constants/breakpoints";

export const UsersDashboardContainer = styled("div")({
  width: "100%",
  padding: "24px 0",
  marginTop: "40px",
  background: "#FDFDFD",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  [`@media (max-width: ${media?.SCREEN_M})`]: {
    ".MuiGrid-container": {
      justifyContent: "flex-start",
    },
  },
});

export const TextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginRight: "20px",

  [`@media (max-width: ${media?.SCREEN_M})`]: {
    margin: "0 0 20px 21px",
  },
});

export const WelcomeMsg = styled("div")(({ theme }) => ({
  fontWeight: "500",
  fontSize: theme.typography.pxToRem(16),
  textTransform: "capitalize",
  color: theme.palette.grey[700],
  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
}));

export const Title = styled("div")(({ theme }) => ({
  fontWeight: 400,
  fontSize: theme.typography.pxToRem(16),
  textTransform: "capitalize",
  color: theme.palette.grey[700],
  fontFamily: "Roboto,Helvetica,Arial,sans-serif",

  "& svg": {
    fontSize: theme.typography.pxToRem(14),
  },
}));

export const InfoContainer = styled("div")(({ theme }) => ({
  background: theme.palette.background.default,
  border: "0.5px solid rgba(0, 0, 0, 0.12)",
  borderRight: "none",
  borderRadius: "4px",
  display: "flex",
  flexWrap: "wrap",

  [`@media (max-width: ${media?.SCREEN_M})`]: {
    padding: "0 21px",
    margin: "0 16px",
    width: "100%",
  },
}));

export const InfoItem = styled("div")(({ theme }) => ({
  borderRight: "0.5px solid rgba(0, 0, 0, 0.12)",
  padding: "12px 15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  color: theme.palette.text.secondary,
  fontWeight: 500,
  alignItems: "center",

  ".label": {
    fontSize: theme.typography.pxToRem(13),
    fontWeight: 500,
    color: theme.palette.grey[700],
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
  },

  ".value": {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 500,
    color: theme.palette.grey[700],
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
  },

  ".green-label": {
    fontSize: theme.typography.pxToRem(13),
    fontWeight: 500,
    color: "#4BBCAA",
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
  },

  ".green-value": {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 500,
    color: "#4BBCAA",
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
  },

  [`@media (max-width: ${media?.SCREEN_M})`]: {
    padding: "12px 0",
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    borderRight: "none",
    borderBottom: "1px solid rgba(33, 33, 33, 0.08)",

    "&:last-child": {
      borderBottom: "none",
    },
  },
}));
