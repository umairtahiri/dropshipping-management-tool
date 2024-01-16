import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AccountInformation,
  FullPageLoader,
  Layout,
  PaymentsTable,
  PurchasedHistory,
  SalesSummary,
} from "@/components";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { DEFAULT_SALES_REPORT } from "@/constants/others";
import {
  createStripeAccount,
  getAccountStripeLoginLink,
  getPurchaseHistory,
  getSalesReport,
  getStripeOnboardingLoginLink,
  getTransactionHistory,
  saveStoreBankInfo,
} from "@/lib/api/requests";
import { HOST_NAME, LOCAL_API_URL } from "@/lib/const";
import { setAccountId } from "@/lib/redux/retailer";
import type { RootState } from "@/lib/redux/store";

interface SalesSummaryPropTypes {
  payout: {
    formated: string;
    price: string;
  };
  pendingPayout: {
    formated: string;
    price: string;
  };
  totalPrice: {
    formated: string;
    price: string;
  };
}

interface TransactionTypes {
  date: number;
  amount: number;
  transactionId: number;
}

interface PurchasedHistoryTypes {
  profit: number;
  productName: number;
  sold: number;
}

function MyPayments() {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const router = useRouter();

  const accountId = useSelector(
    (state: RootState) => state?.retailer?.accountId
  );

  const storeFrontId = useSelector(
    (state: RootState) => state?.retailer?.storeFront?.id
  );

  const retailerShopId = useSelector(
    (state: RootState) => state?.retailer?.retailerShop?.id
  );

  const onboardingCompleted = useSelector(
    (state: RootState) => state?.retailer?.onboardingCompleted
  );

  const [backdrop, setBackdrop] = useState({ open: false, message: "" });
  const [salesReport, setSalesReport] =
    useState<SalesSummaryPropTypes>(DEFAULT_SALES_REPORT);
  const [purchaseHistory, setPurchaseHistory] = useState<
    PurchasedHistoryTypes[]
  >([]);
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionTypes[]
  >([]);

  const generateAccountLink = async () => {
    const response: any = await getAccountStripeLoginLink(accountId);
    if (response?.status) {
      window.open(response?.data?.url);
    } else {
      enqueueSnackbar(response?.message, {
        variant: "error",
      });
    }
    setBackdrop({
      open: true,
      message: "Creating account link for your account",
    });
  };

  const createStripeOnboardingLink = async (id) => {
    const LOCALHOST_URL = `http://${HOST_NAME}:3030`;
    const REDIRECT_HOST =
      HOST_NAME === "localhost" ? LOCALHOST_URL : LOCAL_API_URL;
    setBackdrop({
      open: true,
      message: "Creating onboarding link for your new account",
    });
    const payload = {
      account: id,
      refreshUrl: `${REDIRECT_HOST}/default-channel/en-US/my-payments`,
      returnUrl: `${REDIRECT_HOST}/default-channel/en-US/my-payments`,
      type: "account_onboarding",
    };
    const response: any = await getStripeOnboardingLoginLink(id, payload);
    if (response?.status && response?.data?.url) {
      router.push(response?.data?.url);
    } else {
      enqueueSnackbar(response?.message, {
        variant: "error",
      });
    }
    setBackdrop({
      open: false,
      message: "",
    });
  };

  const saveAccountReferenceId = async (accountId) => {
    const payload = {
      accountId,
    };
    await saveStoreBankInfo(retailerShopId, payload);
  };

  const handleCreateStripeAccount = async () => {
    setBackdrop({
      open: true,
      message: "Your Stripe account is being created",
    });
    const response: any = await createStripeAccount();
    const accountId = response?.data?.id;
    if (response?.status && accountId) {
      dispatch(setAccountId(accountId));
      createStripeOnboardingLink(accountId);
      saveAccountReferenceId(accountId);
    } else {
      setBackdrop({
        open: false,
        message: "",
      });
      enqueueSnackbar(response?.message, {
        variant: "error",
      });
    }
  };

  const fetchSalesReport = async () => {
    const response: any = await getSalesReport(storeFrontId);
    if (response?.status) {
      if (response?.data?.data?.totalPayouts) {
        setSalesReport(response?.data?.data?.totalPayouts);
      } else {
        setSalesReport(DEFAULT_SALES_REPORT);
      }
    }
  };

  const fetchPurchaseHistory = async () => {
    const response: any = await getPurchaseHistory(storeFrontId);
    if (response?.status) {
      if (Array.isArray(response?.data?.data)) {
        setPurchaseHistory(response?.data?.data);
      } else {
        setPurchaseHistory([]);
      }
    }
  };

  const fetchTransactionHistory = async () => {
    const response: any = await getTransactionHistory(storeFrontId);
    if (response?.status) {
      if (Array.isArray(response?.data?.data)) {
        setTransactionHistory(response?.data?.data);
      } else {
        setTransactionHistory([]);
      }
    }
  };

  useEffect(() => {
    if (storeFrontId) {
      fetchSalesReport();
      fetchPurchaseHistory();
      fetchTransactionHistory();
    }
  }, [storeFrontId]);

  return (
    <div className="w-full">
      <BaseSeo />
      <div className="h-full px-4 pb-20 pt-10 md:pb-0 md:pt-0 lg:px-14">
        <Stack direction="column" spacing={3}>
          <Box className="flex flex-col xl:flex-row gap-x-7">
            <SalesSummary salesReport={salesReport} />
            <AccountInformation
              accountId={accountId}
              onboardingCompleted={onboardingCompleted}
              createStripeAccount={handleCreateStripeAccount}
              generateAccountLink={generateAccountLink}
              createStripeOnboardingLink={createStripeOnboardingLink}
            />
          </Box>
          <Box className="flex gap-x-7">
            <PaymentsTable transactionHistory={transactionHistory} />
            <PurchasedHistory purchaseHistory={purchaseHistory} />
          </Box>
        </Stack>
      </div>
      <FullPageLoader backdrop={backdrop} />
    </div>
  );
}

export default MyPayments;
MyPayments.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
