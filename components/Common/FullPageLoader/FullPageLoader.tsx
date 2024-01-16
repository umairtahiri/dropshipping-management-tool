import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React from "react";

interface FullPageLoaderPropTypes {
  backdrop: {
    open: boolean;
    message: string;
  };
}

export function FullPageLoader({ backdrop }: FullPageLoaderPropTypes) {
  const { open, message } = backdrop;
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "rgba(244, 244, 244, 0.8)",
      }}
      open={open}
    >
      <Box className="flex flex-col items-center">
        <CircularProgress size={100} />
        <Box className="text-center mt-9">
          <Typography variant="h4" className="font-normal mb-7">
            Please wait
          </Typography>
          <Typography variant="h4" className="font-normal mb-2.5">
            {message}
          </Typography>
          <Typography variant="h4" className="font-normal">
            It will just take a moment
          </Typography>
        </Box>
      </Box>
    </Backdrop>
  );
}
