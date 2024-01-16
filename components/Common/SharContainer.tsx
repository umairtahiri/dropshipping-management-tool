import { styled } from "@mui/material/styles";

import * as media from "@/constants/breakpoints";
import customStyle from "@/constants/StyleConstants";

export const SharContainer = styled("div")({
  maxWidth: `${customStyle.containerMaxWidth}px`,
  width: "100%",
  margin: "0 auto",

  [`@media (min-width: ${media.SCREEN_M})`]: {
    ".MuiContainer-root": {
      maxWidth: "100%",
    },
  },
});
