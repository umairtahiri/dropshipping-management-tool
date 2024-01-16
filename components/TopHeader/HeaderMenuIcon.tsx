import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

import { useRegions } from "@/components/RegionsProvider";
import { B2B_SHOP_URL_AUTHENTICATED } from "@/lib/const";
import { useAuth } from "@/lib/hooks";

import { HeaderRoot, MenuBoxLinkList } from "./HeaderMenuIcon.style";

export interface HeaderMenuProps {
  children?: React.ReactNode;
}

export function HeaderMenuIcon({ children }: HeaderMenuProps) {
  const { query, currentLocale } = useRegions();
  const { logout } = useAuth();

  return (
    <HeaderRoot>
      <IconButton className="md:block hidden">{children}</IconButton>
      <Paper className="w-[276px] h-[684] shadow-[0_0_15px_rgba(0,0,0,0.15)] z-[1000] menu-box">
        <Box className="px-6 py-3.5">
          <Link
            href={`${B2B_SHOP_URL_AUTHENTICATED}/${query.channel}/${currentLocale}/myaccount`}
            className="flex items-center gap-x-2 text-[15px] text-[#444] font-bold"
          >
            Go To My Account
            <Image width={12} height={16} layout="fixed" src="/my-acc.svg" />
          </Link>
        </Box>
        <Divider className="mb-1" />
        <Box className="px-6 pb-6">
          <MenuBoxLinkList>
            <li>
              <Box className="block text-[15px] text-[#444] mb-1">
                Dropshipping Dashboard
              </Box>
            </li>
            <Divider className="mb-1" />
            <Box className="ml-4">
              <li>
                <Link
                  href={`/${query.channel}/${currentLocale}/dashboard`}
                  passHref
                  className="block"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href={`/${query.channel}/${currentLocale}/import-list`}
                  passHref
                  className="block"
                >
                  Import List
                </Link>
              </li>
              <li>
                <Link
                  href={`/${query.channel}/${currentLocale}/my-products`}
                  passHref
                  className="block"
                >
                  My Products
                </Link>
              </li>
              <li>
                <Link
                  href={`/${query.channel}/${currentLocale}/my-orders`}
                  passHref
                  className="block"
                >
                  My Orders
                </Link>
              </li>
            </Box>
          </MenuBoxLinkList>
          <MenuBoxLinkList>
            <li>
              <Box className="block text-[15px] text-[#444] mb-1">
                My Orders
              </Box>
            </li>
            <Divider className="mb-1" />
            <Box className="ml-4">
              <li>
                <Link
                  className="block"
                  href={`${B2B_SHOP_URL_AUTHENTICATED}/${query.channel}/${currentLocale}/myaccount/order-history`}
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  className="block"
                  href={`${B2B_SHOP_URL_AUTHENTICATED}/${query.channel}/${currentLocale}/myaccount/order-items-history`}
                >
                  Order Items History
                </Link>
              </li>
            </Box>
          </MenuBoxLinkList>
          <MenuBoxLinkList>
            <li>
              <Box className="block text-[15px] text-[#444] mb-1">
                Account Settings
              </Box>
            </li>
            <Divider className="mb-1" />
            <Box className="ml-4">
              <li>
                <Link
                  className="block"
                  href={`${B2B_SHOP_URL_AUTHENTICATED}/${query.channel}/${currentLocale}/myaccount/profile`}
                >
                  Manage My Information
                </Link>
              </li>
              <li>
                <Link
                  className="block"
                  href={`${B2B_SHOP_URL_AUTHENTICATED}/${query.channel}/${currentLocale}/myaccount/payments`}
                >
                  Manage Credit Cards
                </Link>
              </li>
              <li>
                <Link
                  className="block"
                  href={`${B2B_SHOP_URL_AUTHENTICATED}/${query.channel}/${currentLocale}/myaccount/shipping-address`}
                >
                  Manage Shipping Address
                </Link>
              </li>
              <li>
                <Link
                  className="block"
                  href={`${B2B_SHOP_URL_AUTHENTICATED}/${query.channel}/${currentLocale}/myaccount/profile/password`}
                >
                  Change Password
                </Link>
              </li>
              <li>
                <Link
                  className="block"
                  href={`${B2B_SHOP_URL_AUTHENTICATED}/${query.channel}/${currentLocale}/myaccount/profile/email`}
                >
                  Change Sign-in Email
                </Link>
              </li>
            </Box>
            <Divider className="mb-1" />
            <Box className="ml-4">
              <li>
                <Link
                  className="block"
                  onClick={logout}
                  href={`${B2B_SHOP_URL_AUTHENTICATED}/${query.channel}/${currentLocale}`}
                >
                  Sign Out
                </Link>
              </li>
            </Box>
          </MenuBoxLinkList>
          {/* NOTE: Will be used later */}
          {/* <Divider className="mb-0" />
          <span onClick={handleSignOut}>
            <a className="block pt-3 font-medium cursor-pointer text-black">
              Sign Out
            
          </span> */}
        </Box>
      </Paper>
    </HeaderRoot>
  );
}
