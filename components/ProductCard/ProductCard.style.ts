import { styled } from "@mui/material/styles";

export const Info = styled("div")({
  height: "225px",
  padding: "12px 12px 14px",

  "@media (max-width: 1164px)": {
    height: "210px",
  },

  "@media (max-width: 409px)": {
    height: "200px",
  },
});

export const ProductItem = styled("div")(({ theme }) => ({
  maxWidth: "215px",
  width: "215px",
  borderRadius: 4,
  boxShadow: theme.shadows[0],
  cursor: "pointer",

  "@media (max-width: 1164px)": {
    width: "195px",
  },

  "@media (max-width: 469px)": {
    width: "165px",
  },

  "@media (max-width: 409px)": {
    width: "145px",
  },
}));

export const Card = styled("div")(({ theme }) => ({
  background: theme.palette.background.default,
  height: "545px",
  borderRadius: 4,
  overflow: "hidden",
  border: "0.5px solid #ececec",

  "@media (max-width: 1164px)": {
    height: "440px",
  },

  "@media (max-width: 469px)": {
    height: "400px",
  },

  "@media (max-width: 409px)": {
    height: "370px",
  },
}));

export const ProductImage = styled("img")({
  width: "100%",
  height: 320.62,
  transform: "scale(1)",
  transition: "all 1250ms cubic-bezier(0.19, 1, 0.22, 1)",
  objectFit: "contain",
  borderRadius: "4px 4px 0px 0px",

  "&:hover": {
    transform: "scale(1.05)",
  },

  "@media (max-width: 1164px)": {
    height: "230.49px",
  },

  "@media (max-width: 469px)": {
    height: "190px",
  },

  "@media (max-width: 409px)": {
    height: "170px",
  },
});

export const ColorOptionsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  columnGap: 3,
  rowGap: 3,
  padding: "5px 0",
  borderTop: `0.5px solid ${theme.palette.grey[500]}`,
}));

export const ColorOption = styled("div")((props) => ({
  minHeight: 10,
  minWidth: 12,
  background: props.color,
  borderRadius: 2,
}));

export const BorderedColorOption = styled("div")((props) => ({
  minHeight: 10,
  minWidth: 12,
  background: props.color,
  border: "0.5px solid #ccc",
  borderRadius: 2,
}));

export const ProductName = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 600,
  lineHeight: "160%",
  letterSpacing: "0.02em",
  maxWidth: "180px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

export const ProductDescription = styled("div")(({ theme }) => ({
  display: "flex",
  fontSize: theme.typography.pxToRem(13),
  color: theme.palette.grey[900],
  fontWeight: 400,
  lineHeight: "19px",
  letterSpacing: "0.02em",
  minHeight: "38px",
}));

export const Label = styled("div")(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  fontWeight: 400,
  color: theme.palette.text.secondary,
  lineHeight: "14px",
  letterSpacing: "0.02em",

  "@media (max-width: 1164px)": {
    maxWidth: "110px",
  },

  "@media (max-width: 469px)": {
    maxWidth: "95px",
  },

  "@media (max-width: 409px)": {
    maxWidth: "80px",
  },
}));

export const ProductCost = styled("div")(({ theme }) => ({
  fontSize: theme.typography.pxToRem(13),
  color: theme.palette.primary.main,
  fontWeight: 700,
  letterSpacing: "0.02em",
}));

export const ResalePrice = styled("div")(({ theme }) => ({
  fontSize: theme.typography.pxToRem(13),
  fontWeight: 700,
  color: theme.palette.text.secondary,
  letterSpacing: "0.02em",
}));
