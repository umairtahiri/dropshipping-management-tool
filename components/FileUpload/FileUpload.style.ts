import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const UploadContainer = styled("label")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: theme.palette.grey[600],
  borderRadius: "4px",
  cursor: "pointer",
}));

export const ImageContainer = styled(Box)({
  width: "100%",
  display: "flex",
  position: "relative",

  img: {
    objectFit: "contain",
  },
});

export const EditIconContainer = styled("label")({
  height: "25px",
  width: "25px",
  background: "rgba(243, 243, 243, 0.6)",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  position: "absolute",
  top: "5px",
  right: "6px",

  svg: {
    fontSize: "16px",
  },
});

export const DeleteIconContainer = styled(Box)({
  height: "25px",
  width: "25px",
  background: "rgba(243, 243, 243, 0.6)",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  position: "absolute",
  top: "40px",
  right: "6px",

  svg: {
    fontSize: "16px",
  },
});
