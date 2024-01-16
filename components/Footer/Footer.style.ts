import { styled } from "@mui/material/styles";

import customStyle from "@/constants/StyleConstants";

export const IconWrap = styled("div")({
  paddingTop: "15px",
  svg: {
    marginRight: "12px",
    color: `${customStyle.lighGray}`,

    "&:hover": {
      opacity: 0.5,
    },
  },
});

export const FooterWrap = styled("div")({
  maxWidth: "100%",
  padding: "25px 0 25px 0",
  background: `${customStyle.Grayscale600}`,
});

export const FooterSupport = styled("span")({
  paddingBottom: "25px",
  b: {
    fontSize: "16px",
    color: "white",
  },
  ".MuiListItemText-root": {
    fontSize: "14px",
    color: "white",
  },
  a: {
    color: `${customStyle.Grayscale100}`,
    fontSize: "14px",
    "&:hover": {
      color: `${customStyle.SharoveTeal} !important`,
    },
  },
});

export const FooterContact = styled("div")({
  fontSize: "16px",
  color: "white",
  a: {
    fontSize: "14px",
    color: "white",
    cursor: "default",
  },
  "ul .MuiListItemText-root:first-child .MuiTypography-root a": {
    color: `${customStyle.SharoveTeal}`,
  },
});

export const FooterCopywrite = styled("div")({
  paddingTop: "55px",
  paddingBottom: "35px",
  small: {
    color: `${customStyle.gray}`,
  },
});
