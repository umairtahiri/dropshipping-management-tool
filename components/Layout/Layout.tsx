import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DropShippingSideBar,
  DropShippingSideBarMobileView,
  MiniNavBar,
  SearchDrawer,
  TopHeader,
} from "@/components";
import {
  getMenuCategories,
  getRetailerBankInfo,
  getStoreInfo,
  getStripeAccountDetails,
  whoAmI,
} from "@/lib/api/requests";
import { B2B_SHOP_URL } from "@/lib/const";
import { useAuth } from "@/lib/hooks";
import { setMenusCategories } from "@/lib/redux/categories";
import { fetchMyProductsCount } from "@/lib/redux/my-products";
import { fetchOrdersCount } from "@/lib/redux/order";
import {
  setAccountId,
  setOnboardingCompleted,
  setRetailerShop,
  setStoreFront,
} from "@/lib/redux/retailer";
import type { RootState } from "@/lib/redux/store";
import { setIsAuthenticated, setUser } from "@/lib/redux/user";
import { LayoutPropTyes } from "@/lib/types";
import { getFieldValues } from "@/lib/util";

import { DropshippingLayout } from "./Layout.style";

/**
 * Main layout of the whole application
 * @param children HTML elements
 */

export function Layout({ children }: LayoutPropTyes) {
  const router = useRouter();

  const { getUser } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const retailerShopId = useSelector(
    (state: RootState) => state?.retailer?.retailerShop?.id
  );

  const storeFrontId = useSelector(
    (state: RootState) => state?.retailer?.storeFront?.id
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state?.user?.isAuthenticated
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const [verifyingIdentity, setVerifyingIdentity] = useState(true);
  const [token, setToken] = useState<string>("");

  axios.interceptors.request.use(
    (config) => {
      config.headers = {
        Authorization: `Bearer ${token}`,
        ...config.headers,
      };
      config.params = {
        ...config.params,
      };
      return config;
    },
    (error) => Promise.reject(error)
  );

  const getCategories = async () => {
    const response: any = await getMenuCategories();
    const { status, data } = response || {};
    if (status) {
      dispatch(setMenusCategories(data?.data));
    }
  };

  const getShopBankDetails = async () => {
    const response: any = await getRetailerBankInfo(retailerShopId);
    if (response?.status) {
      const accountId = response?.data?.data?.accReferId;
      if (accountId) {
        checkIfOnboardingCompleted(accountId);
        dispatch(setAccountId(accountId));
      }
    }
  };

  const getStoreFrontDetails = async (storeFrontId) => {
    const response: any = await getStoreInfo(storeFrontId);
    if (response?.status) {
      dispatch(setStoreFront({ ...response?.data?.data, id: storeFrontId }));
    } else {
      enqueueSnackbar(response?.message, {
        variant: "error",
      });
    }
  };

  const getRetailerDetails = async (shopDetails) => {
    dispatch(setRetailerShop(shopDetails));
    const storeFrontId = getFieldValues(shopDetails?.fields, "storefrontids");
    if (storeFrontId) {
      getStoreFrontDetails(storeFrontId);
    }
  };

  const checkIfOnboardingCompleted = async (accountId) => {
    const response: any = await getStripeAccountDetails(accountId);
    if (response?.status) {
      dispatch(setOnboardingCompleted(response?.data?.details_submitted));
    }
  };

  const redirectBack = () => {
    router.push(`${B2B_SHOP_URL}/default-channel/en-US/`);
  };

  const getUserInfo = () => {
    setVerifyingIdentity(true);
    getUser(String(token))
      .then((user) => {
        if (user && user?.sub) {
          dispatch(setIsAuthenticated(true));
          dispatch(setUser(user));
        } else {
          redirectBack();
        }
        setVerifyingIdentity(false);
      })
      .catch(() => {
        dispatch(setIsAuthenticated(false));
        setVerifyingIdentity(false);
        redirectBack();
      });
  };

  const getWhoAmI = async () => {
    const response: any = await whoAmI(token);
    const { shopDetails } = response?.data?.data || {};
    const { data: shopData } = shopDetails;
    if (shopData?.id) {
      getUserInfo();
      getRetailerDetails(shopData);
    } else {
      enqueueSnackbar("Failed to recieve user info", {
        variant: "error",
      });
      dispatch(setIsAuthenticated(false));
      setVerifyingIdentity(false);
    }
  };

  useEffect(() => {
    if (router?.isReady) {
      const TOKEN_FROM_ROUTE = router?.query?.token;
      if (TOKEN_FROM_ROUTE) {
        setToken(String(TOKEN_FROM_ROUTE));
        setCookie("access_token", TOKEN_FROM_ROUTE);
      } else {
        const ACCESS_TOKEN = getCookie("access_token") || "";
        if (ACCESS_TOKEN) {
          setToken(String(ACCESS_TOKEN));
          setCookie("access_token", ACCESS_TOKEN);
        } else {
          setVerifyingIdentity(false);
        }
      }
    }
  }, [router?.isReady]);

  useEffect(() => {
    if (token) {
      getWhoAmI();
      getCategories();
    }
  }, [token]);

  useEffect(() => {
    if (retailerShopId && isAuthenticated) {
      dispatch(fetchMyProductsCount(retailerShopId));
      getShopBankDetails();
    }
  }, [retailerShopId, isAuthenticated]);

  useEffect(() => {
    if (storeFrontId) {
      dispatch(fetchOrdersCount(storeFrontId));
    }
  }, [storeFrontId]);

  // Handles opening and closing of menu drawer in mobile view
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Handles opening and closing of saerch drawer in mobile view
  const toggleSearchDrawer = () => {
    setOpenSearchDrawer(!openSearchDrawer);
  };

  const LOGGING_IN = !isAuthenticated && verifyingIdentity;
  const LOGGED_IN = isAuthenticated && Boolean(retailerShopId);
  const NOT_LOGGED_IN = !isAuthenticated && !verifyingIdentity;

  if (!LOGGED_IN) {
    return (
      <DropshippingLayout>
        <TopHeader
          toggleDrawer={toggleDrawer}
          toggleSearchDrawer={toggleSearchDrawer}
        />
        <div className="min-h-screen flex">
          <DropShippingSideBar />
          <DropShippingSideBarMobileView
            showSideBar={isDrawerOpen}
            toggleDrawer={toggleDrawer}
          />
          <div className="w-full pt-0 pb-28 min-h-full max-h-screen overflow-auto md:pt-8">
            {children}
          </div>
        </div>
        <MiniNavBar />
        <SearchDrawer
          showSideBar={openSearchDrawer}
          toggleDrawer={toggleSearchDrawer}
        />
      </DropshippingLayout>
    );
  }

  if (LOGGING_IN) {
    return (
      <Box className="w-screen h-screen">
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: "rgba(244, 244, 244, 1)",
          }}
          open={LOGGING_IN}
        >
          <Box className="flex flex-col items-center">
            <CircularProgress size={100} />
            <Box className="text-center mt-9">
              <Typography variant="h4" className="font-normal mb-2.5">
                We are authenticating the user...
              </Typography>
              <Typography variant="h4" className="font-normal">
                It will just take a moment
              </Typography>
            </Box>
          </Box>
        </Backdrop>
      </Box>
    );
  }

  if (!NOT_LOGGED_IN) {
    return (
      <Box className="w-screen h-screen">
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: "rgba(244, 244, 244, 1)",
          }}
          open={!NOT_LOGGED_IN}
        >
          <Box className="flex flex-col items-center">
            <Box className="text-center mt-9">
              <Typography variant="h4" className="font-normal mb-2.5">
                You are not Signed in
              </Typography>
              <Button variant="contained" onClick={redirectBack}>
                Sign In
              </Button>
            </Box>
          </Box>
        </Backdrop>
      </Box>
    );
  }
  return <Box></Box>;
}

export default Layout;
