import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

interface PageInfoTypes {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}
interface PaginationPropTypes {
  totalPages: number;
  currentPage: number;
  handlePageChange?: (change: string) => void;
  pageInfo: PageInfoTypes;
}

export function Pagination({
  pageInfo,
  totalPages,
  currentPage,
  handlePageChange,
}: PaginationPropTypes) {
  const { hasNextPage, hasPreviousPage } = pageInfo;
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        className="py-2 px-3.5 hidden md:flex"
        startIcon={
          <ArrowBackIosNewOutlinedIcon className="text-xs md:text-sm" />
        }
        disabled={!hasPreviousPage}
        onClick={() => {
          if (handlePageChange) {
            handlePageChange("prev");
          }
        }}
      >
        Previous
      </Button>
      <IconButton
        className="block md:hidden"
        size="small"
        disabled={currentPage < 2}
        onClick={() => {
          if (handlePageChange) {
            handlePageChange("prev");
          }
        }}
      >
        <ArrowBackIosNewOutlinedIcon />
      </IconButton>
      <Box>
        <Typography component="span" variant="body1" className="sharove-color">
          {currentPage}
        </Typography>
        /
        <Typography variant="body1" component="span">
          {totalPages}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        className="py-2 px-3.5 hidden md:flex"
        endIcon={<ArrowForwardIosOutlinedIcon className="text-xs md:text-sm" />}
        disabled={!hasNextPage}
        onClick={() => {
          if (handlePageChange) {
            handlePageChange("next");
          }
        }}
      >
        Next
      </Button>
      <IconButton
        className="block md:hidden"
        size="small"
        disabled={currentPage === totalPages}
        onClick={() => {
          if (handlePageChange) {
            handlePageChange("next");
          }
        }}
      >
        <ArrowForwardIosOutlinedIcon />
      </IconButton>
    </Stack>
  );
}
