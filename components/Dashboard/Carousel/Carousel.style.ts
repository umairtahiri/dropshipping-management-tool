import { styled } from "@mui/material/styles";

import * as media from "@/constants/breakpoints";
import customStyle from "@/constants/StyleConstants";

export const SliderWrapper = styled("div")({
  maxWidth: `${customStyle.containerMaxWidth}px`,
  width: "100%",
  margin: "0 auto",
  padding: 0,
  "@media (min-width: 1050px)": {
    maxWidth: "640px",
  },
  "@media (min-width: 1080px)": {
    maxWidth: "665px",
  },
  "@media (min-width: 1280px)": {
    maxWidth: "865px",
  },
  "@media (min-width: 1366px)": {
    maxWidth: "951px",
  },
  "@media (min-width: 1440px)": {
    maxWidth: "1025px",
  },
  "@media (min-width: 1536px)": {
    maxWidth: "1120px",
  },
  "@media (min-width: 1680px)": {
    maxWidth: "1265px",
  },
  "@media (min-width: 1920px)": {
    maxWidth: "1440px",
  },
  [`@media (min-width: ${media.SCREEN_M})`]: {
    ".MuiContainer-root": {
      maxWidth: "100%",
    },
  },
  ".MuiContainer-root": {
    paddingLeft: "24px",
    paddingRight: "24px",
  },
  [`@media (max-width: ${media.SCREEN_M})`]: {
    ".MuiContainer-root": {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
  },
  ".sliderImageList": {
    display: "flex",
    flexWrap: "wrap",
  },
  ".sliderImageList .MuiGrid-item:first-child": {
    marginLeft: 0,
  },
  ".mainBanner": {
    minWidth: "100%",
    maxHeight: "300px",

    img: {
      width: "100%",
    },
  },
  ".sliderImageList .MuiGrid-root": {
    width: "14.28%",
    marginLeft: "10px",
  },
  ".sliderImageList img": {
    transition: "all 1250ms cubic-bezier(0.19, 1, 0.22, 1)",
    width: "180px",
    maxHeight: "270px",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  ".MuiTabPanel-root": {
    display: "flex",
    width: "100%",
    padding: 0,
  },
  ".MuiBox-root": {
    width: "100%",
    border: "none",
  },
  ".MuiTabs-flexContainer .Mui-selected": {
    color: `${customStyle.SharoveTeal}`,
  },
  ".MuiTabs-indicator": {
    display: "none",
  },
  "button.MuiButtonBase-root": {
    fontSize: "13px",
  },
});

export const ProductListWrap = styled("div")({
  overflowX: "scroll",
  overflowY: "hidden",
  "::-webkit-scrollbar": {
    width: "0px",
    height: "0px",
    background: "transparent",
  },
  ".MuiTabs-flexContainer": {
    position: "fixed",
  },
});
