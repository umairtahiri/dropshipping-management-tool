import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

interface SalesSummaryPropTypes {
  salesReport: {
    payout: {
      price: string;
      formated: string;
    };
    totalPrice: {
      price: string;
      formated: string;
    };
    pendingPayout: {
      price: string;
      formated: string;
    };
  };
}

export function SalesSummary({ salesReport }: SalesSummaryPropTypes) {
  const { payout, totalPrice, pendingPayout } = salesReport;
  return (
    <>
      <Paper elevation={0} className="flex-1 mt-7 rounded-t hidden lg:block">
        <Box className="pt-5 pl-6 pb-6">
          <Typography variant="h4">MY PAYMENTS</Typography>
        </Box>
        <Box className="pb-6 px-6 flex justify-between">
          <Box>
            <Typography
              variant="body1"
              className="mb-1 light-grey whitespace-nowrap"
            >
              TOTAL PAYOUT
            </Typography>
            <Typography variant="h4" className="text-2xl text-center">
              ${payout?.price}
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box className="text-center">
            <Typography
              variant="body1"
              className="mb-1 light-grey whitespace-nowrap"
            >
              PENDING PAYOUT
            </Typography>
            <Typography variant="h4" className="text-2xl">
              ${pendingPayout?.price}
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box className="text-center">
            <Typography
              variant="body1"
              className="mb-1 light-grey whitespace-nowrap"
            >
              TOTAL SALES
            </Typography>
            <Typography variant="h4" className="text-2xl text-center">
              ${totalPrice?.price}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Paper elevation={0} className="p-6 mt-7 rounded-t block lg:hidden">
        <Box className="pb-5">
          <Typography variant="h4">MY PAYMENTS</Typography>
        </Box>
        <Box className="pt-4 pb-5 px-6 rounded border border-slate-300">
          <Box className="flex items-center justify-between">
            <Typography
              variant="body1"
              className="light-grey whitespace-nowrap font-medium uppercase"
            >
              TOTAL PAYOUT
            </Typography>
            <Typography variant="h4" className="text-2xl">
              ${payout?.price}
            </Typography>
          </Box>
          <Divider className="my-4" />
          <Box className="flex items-center justify-between">
            <Typography
              variant="body1"
              className="light-grey whitespace-nowrap font-medium uppercase"
            >
              PENDING PAYOUT
            </Typography>
            <Typography variant="h4" className="text-2xl">
              ${pendingPayout?.price}
            </Typography>
          </Box>
          <Divider className="my-4" />
          <Box className="flex items-center justify-between">
            <Typography
              variant="body1"
              className="light-grey whitespace-nowrap font-medium uppercase"
            >
              TOTAL SALES
            </Typography>
            <Typography variant="h4" className="text-2xl">
              ${totalPrice?.price}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
