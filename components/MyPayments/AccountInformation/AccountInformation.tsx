import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

interface AccountInformationPropTypes {
  accountId: string;
  onboardingCompleted: boolean;
  createStripeAccount: () => void;
  generateAccountLink: () => void;
  createStripeOnboardingLink: (id: string) => void;
}

export function AccountInformation({
  accountId,
  createStripeAccount,
  onboardingCompleted,
  generateAccountLink,
  createStripeOnboardingLink,
}: AccountInformationPropTypes) {
  const accountCreated = !!accountId;
  return (
    <>
      <Paper elevation={0} className="flex-1 mt-7 rounded-t hidden lg:block">
        <Box className="w-full pt-5 px-6 pb-6">
          <Typography variant="h4">ACCOUNT INFORMATION</Typography>
        </Box>
        <Box className="pb-6 px-6">
          <Box>
            <Typography
              variant="body1"
              className="mb-1 light-grey whitespace-nowrap"
              onClick={() => createStripeOnboardingLink(accountId)}
            >
              STRIPE ACCOUNT
            </Typography>
          </Box>
          <Box>
            {accountCreated && onboardingCompleted ? (
              <Typography
                variant="subtitle1"
                className="mb-1 font-normal cursor-pointer underline"
                onClick={generateAccountLink}
              >
                View Stripe Account
              </Typography>
            ) : (
              <Typography
                variant="subtitle1"
                className="mb-1 font-normal cursor-pointer underline"
                onClick={() =>
                  accountCreated
                    ? createStripeOnboardingLink(accountId)
                    : createStripeAccount()
                }
              >
                Sign up for Stripe Account
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
      <Paper elevation={0} className="p-6 mt-7 rounded-t block lg:hidden">
        <Box className="w-full pb-5">
          <Typography variant="h4">ACCOUNT INFORMATION</Typography>
        </Box>
        <Box className="pt-4 pb-5 px-6 rounded border border-slate-300">
          <Box>
            <Typography
              variant="body1"
              className="mb-1 light-grey whitespace-nowrap"
              onClick={() => createStripeOnboardingLink(accountId)}
            >
              STRIPE ACCOUNT
            </Typography>
          </Box>
          <Box>
            {accountCreated && onboardingCompleted ? (
              <Typography
                variant="subtitle1"
                className="mb-1 font-normal cursor-pointer underline"
                onClick={generateAccountLink}
              >
                View Stripe Account
              </Typography>
            ) : (
              <Typography
                variant="subtitle1"
                className="mb-1 font-normal cursor-pointer underline"
                onClick={() =>
                  onboardingCompleted
                    ? createStripeOnboardingLink(accountId)
                    : createStripeAccount()
                }
              >
                Sign up for Stripe Account
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </>
  );
}
