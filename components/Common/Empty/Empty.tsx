import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

interface EmptyPropTypes {
  link?: string;
  message: string;
  buttonText?: string;
  onClick?: () => void;
}

export function Empty({ link, message, buttonText }: EmptyPropTypes) {
  return (
    <Box className="w-full h-full flex items-center justify-center flex-col">
      <Typography variant="h4" className="mb-6 text-center">
        {message}
      </Typography>
      {buttonText && link && (
        <Link href={link} passHref target="_blank">
          <Button color="primary" variant="contained" disableElevation>
            {buttonText}
          </Button>
        </Link>
      )}
    </Box>
  );
}
