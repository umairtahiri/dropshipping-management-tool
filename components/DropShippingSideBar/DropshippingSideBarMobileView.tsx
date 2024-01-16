import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

import { B2B_SHOP_URL } from "@/lib/const";
import { useAuth } from "@/lib/hooks";
import type { RootState } from "@/lib/redux/store";
import {
  DropShippingSideBarMobileViewPropTypes,
  RetailerShopTypes,
} from "@/lib/types";

import BoxIcon from "../../public/box.svg";
import BoxGreenIcon from "../../public/box-green.svg";
import PaymentIcon from "../../public/payment.svg";
import PaymentGreenIcon from "../../public/payment-green.svg";
import { Option } from "./DropShippingSideBar.style";

export function DropShippingSideBarMobileView({
  showSideBar,
  toggleDrawer,
}: DropShippingSideBarMobileViewPropTypes) {
  const router = useRouter();
  const { logout } = useAuth();

  const { pathname } = router;

  const isActiveRoute = (key: string) => pathname?.includes(key);

  const ordersCount = useSelector(
    (state: RootState) => state?.order?.ordersCount
  );

  const myProductsCount = useSelector(
    (state: RootState) => state?.myProducts?.myProductsCount
  );

  const retailerShop: RetailerShopTypes = useSelector(
    (state: RootState) => state?.retailer?.retailerShop
  );
  const logoField = (retailerShop?.fields || []).find(
    (field) => field?.name === "logo"
  );

  const logo = (logoField?.values || {})[0];

  const getClassName = (key: string) => {
    const isActive = isActiveRoute(key);
    let className = "";

    if (isActive) {
      className = "is-active";
    }
    return className;
  };

  const redirectBack = () => {
    router.push(`${B2B_SHOP_URL}/default-channel/en-US/`);
  };

  const handleSignOut = () => {
    toggleDrawer();
    logout();
    redirectBack();
  };

  const upperOptions = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      key: "dashboard",
      path: "/default-channel/en-US/dashboard",
    },
    {
      label: "My Products",
      icon: isActiveRoute("my-products") ? (
        <Image src={BoxGreenIcon} alt="box" />
      ) : (
        <Image src={BoxIcon} alt="box" />
      ),
      key: "my-products",
      path: "/default-channel/en-US/my-products",
    },
    {
      label: "My Orders",
      icon: <AssignmentOutlinedIcon />,
      key: "my-orders",
      path: "/default-channel/en-US/my-orders",
    },
    {
      label: "My Vendors",
      icon: <PersonOutlinedIcon />,
      key: "my-vendors",
      path: "/default-channel/en-US/my-vendors",
    },
    {
      label: "Auto Sync",
      icon: <SyncIcon />,
      key: "auto-sync",
      path: "/default-channel/en-US/auto-sync",
    },
    {
      label: "Notifications",
      icon: <NotificationsOutlinedIcon />,
      key: "notifications",
      path: "/default-channel/en-US/notifications",
    },
  ];

  const lowerOptions = [
    {
      label: "My Payments",
      icon: isActiveRoute("my-payments") ? (
        <Image src={PaymentGreenIcon} alt="payment" />
      ) : (
        <Image src={PaymentIcon} alt="payment" />
      ),
      key: "my-payments",
      path: "/default-channel/en-US/my-payments",
    },
    {
      label: "Help Center",
      icon: <HelpOutlineOutlinedIcon />,
      key: "help-center",
      path: "/default-channel/en-US/help-center",
    },
    {
      label: "My Store",
      icon: <StoreOutlinedIcon />,
      key: "my-store",
      path: "/default-channel/en-US/my-store",
    },
  ];

  const getCount = (key) => {
    if (key === "my-products") {
      return myProductsCount;
    }
    if (key === "my-orders") {
      return ordersCount;
    }
    return "";
  };

  return (
    <Drawer
      open={showSideBar}
      onClose={toggleDrawer}
      className="block lg:hidden"
      sx={{
        width: 330,
        height: "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 330,
          height: "100%",
          boxSizing: "border-box",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          className="ml-6 text-[22px] w-full border-b border-[#ececec]"
        >
          <Box>
            {logo ? (
              <Image
                src={logo}
                width={68}
                height={68}
                className="border border-[#ececec] rounded-full"
              />
            ) : (
              <Image
                src="/Logo.svg"
                width={68}
                height={68}
                className="border border-[#ececec] rounded-full"
              />
            )}
          </Box>
          <Box>
            <Typography variant="h5">{retailerShop?.name}</Typography>
            <Typography className="text-sm light-grey">
              {retailerShop?.url}
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack
        direction="column"
        justifyContent="space-between"
        className="h-full"
      >
        <div>
          {upperOptions.map((option) => {
            const count = getCount(option?.key);
            return (
              <Link key={option?.key} href={option?.path} passHref>
                <Option
                  className={getClassName(option?.key)}
                  onClick={toggleDrawer}
                >
                  <Box className="flex items-center gap-x-4">
                    {option?.icon}
                    <Typography variant="body1">{option?.label}</Typography>
                  </Box>
                  {Boolean(count) && (
                    <Box className="pr-4">
                      <Typography variant="body1">{count}</Typography>
                    </Box>
                  )}
                </Option>
              </Link>
            );
          })}
        </div>
        <div className="lower-options">
          {lowerOptions.map((option) => (
            <Link key={option?.key} href={option?.path} passHref>
              <Option
                className={getClassName(option?.key)}
                onClick={toggleDrawer}
              >
                <Box className="flex items-center gap-x-4">
                  {option?.icon}
                  <Typography variant="body1">{option?.label}</Typography>
                </Box>
              </Option>
            </Link>
          ))}
          <Option className={getClassName("logout")} onClick={handleSignOut}>
            <Box className="flex items-center gap-x-4">
              <LogoutOutlinedIcon />
              <Typography variant="body1">Sign Out</Typography>
            </Box>
          </Option>
        </div>
      </Stack>
    </Drawer>
  );
}
