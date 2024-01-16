import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";

interface PurchasedHistoryTypes {
  profit: number;
  productName: number;
  sold: number;
}

interface PurchasedHistoryPropTypes {
  purchaseHistory: PurchasedHistoryTypes[];
}

export function PurchasedHistory({
  purchaseHistory = [],
}: PurchasedHistoryPropTypes) {
  return (
    <TableContainer component={Paper} elevation={0} className="hidden lg:block">
      <Box className="pt-5 pl-6 pb-6">
        <Typography variant="h4">PURCHASED HISTORY</Typography>
      </Box>
      <Table data-testid="paymets-table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography className="px-3 text-sm md:text-lg font-medium">
                PRODUCT NAME
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className="px-3 text-sm md:text-lg font-medium">
                SOLD
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className="px-3 text-sm md:text-lg font-medium">
                PROFIT
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(purchaseHistory || []).map((history) => {
            const { profit, productName, sold } = history || {};
            return (
              <TableRow key={productName} className="border-b border-slate-300">
                <TableCell
                  component="th"
                  scope="row"
                  className="px-12 border-none"
                >
                  <Link href="#">
                    <Typography className="cursor-pointer underline text-sm sharove-color md:text-base">
                      {productName}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell align="center" className="px-12 border-none">
                  <Typography className="text-xs md:text-base">
                    {sold}
                  </Typography>
                </TableCell>
                <TableCell align="center" className="px-12 border-none">
                  <Typography className="text-sm md:text-base sharove-color">
                    ${profit}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
