import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { NavBarContainer } from "./MiniNavBar.style";

export function MiniNavBar() {
  const router = useRouter();
  const { pathname } = router;

  const isActiveRoute = (key: string) => pathname?.includes(key);

  const getClassName = (key: string) => {
    const isActive = isActiveRoute(key);
    let className = "navbar-option-inactive";

    if (isActive) {
      className = "navbar-option-isactive";
    }
    return className;
  };

  const options = [
    {
      label: "Dashboard",
      icon: <DashboardIcon className="text-lg" />,
      key: "dashboard",
      path: "/default-channel/en-US/dashboard",
    },
    {
      label: "Auto Sync",
      icon: <SyncIcon />,
      key: "auto-sync",
      path: "/default-channel/en-US/auto-sync",
    },
    {
      label: "My Store",
      icon: <StoreOutlinedIcon className="text-lg" />,
      key: "my-store",
      path: "/default-channel/en-US/my-store",
    },
  ];

  return (
    <NavBarContainer className="block md:hidden">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={6}
      >
        {options.map((option) => (
          <Link key={option?.key} href={option?.path} passHref>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <Box className={getClassName(option?.key)}>{option?.icon}</Box>
              <Typography className={`${getClassName(option?.key)} text-xs`}>
                {option?.label}
              </Typography>
            </Stack>
          </Link>
        ))}
      </Stack>
    </NavBarContainer>
  );
}
