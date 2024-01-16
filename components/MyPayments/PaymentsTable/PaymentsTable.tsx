import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface TransactionTypes {
  date: number;
  amount: number;
  transactionId: number;
}

interface PaymentsTablePropTypes {
  transactionHistory: TransactionTypes[];
}

export function PaymentsTable({
  transactionHistory = [],
}: PaymentsTablePropTypes) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Box className="pt-5 pl-6 pb-6">
        <Typography variant="h4">TRANSACTION HISTORY</Typography>
      </Box>
      <Table data-testid="paymets-table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography className="px-3 text-sm md:text-lg font-medium">
                PAYOUT DATE
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className="px-3 text-sm md:text-lg font-medium">
                TRANSACTION ID
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className="px-3 text-sm md:text-lg font-medium">
                AMOUNT
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(transactionHistory || []).map((history) => {
            const { date, amount, transactionId } = history || {};
            return (
              <TableRow
                key={transactionId}
                className="border-b border-slate-300"
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="px-12 border-none"
                >
                  <Typography className="text-sm md:text-base">
                    {date}
                  </Typography>
                </TableCell>
                <TableCell align="center" className="px-12 border-none">
                  <Typography className="text-xs md:text-base">
                    {transactionId}
                  </Typography>
                </TableCell>
                <TableCell align="center" className="px-12 border-none">
                  <Typography className="text-sm md:text-base sharove-color">
                    ${amount}
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
