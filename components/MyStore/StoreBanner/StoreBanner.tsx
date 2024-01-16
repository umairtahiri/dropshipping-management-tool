import { Paper, Typography } from "@mui/material";
import React from "react";

import { FileUpload } from "../../FileUpload/FileUpload";

interface StoreBannerPropTypes {
  handleChangeBanner?: (file: File) => void;
  banner: string;
}

export function StoreBanner({
  banner,
  handleChangeBanner,
}: StoreBannerPropTypes) {
  return (
    <Paper
      elevation={0}
      className="w-full p-8"
      sx={{
        borderRadius: "4px 4px 0px 0px",
      }}
    >
      <Typography variant="h4" gutterBottom component="div" className="mb-3">
        Store Banner
      </Typography>
      <FileUpload
        url={banner}
        height="350px"
        sizeDetails="1440 x 350 recommended size"
        title="Upload Store Banner"
        uploadFile={handleChangeBanner}
      />
    </Paper>
  );
}
