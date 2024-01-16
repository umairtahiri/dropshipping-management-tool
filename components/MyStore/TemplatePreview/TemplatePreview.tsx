import { Box, Typography } from "@mui/material";
import Image from "next/legacy/image";
import React from "react";

export function TemplatePreview() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom component="div">
        Template Preview
      </Typography>
      <Box className="flex justify-center py-3 px-16">
        <Image src="/storefront-template-1.png" width={573} height={558} />
      </Box>
    </Box>
  );
}
