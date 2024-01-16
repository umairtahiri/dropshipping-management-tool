import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, Box, Divider, Grid, Stack, Typography } from "@mui/material";
import PopupState, { bindTrigger } from "material-ui-popup-state";
import Image from "next/legacy/image";
import Link from "next/link";
import * as React from "react";

import {
  GlobalSearch,
  HeaderMenuIcon,
  NotificationsPopover,
} from "@/components";
import { TopHeaderPropTypes } from "@/lib/types";

import { HeaderWrapper, IconBox } from "./TopHeader.style";

export function TopHeader({
  toggleDrawer,
  toggleSearchDrawer,
}: TopHeaderPropTypes) {
  return (
    <HeaderWrapper maxWidth="lg">
      <Box className="grow hidden lg:block">
        <Grid container>
          <Grid item xs={4} sm={4} md={4} lg={4} className="flex items-center">
            <Link href="/default-channel/en-US/dashboard" passHref>
              <Image
                src="/Logo.svg"
                alt="SHAROVE LOGO"
                width={177}
                height={28}
              />
            </Link>
            <Divider orientation="vertical" flexItem className="mx-6" />
            <Typography variant="h4" className="font-normal">
              Dropshipping
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <GlobalSearch />
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            className="flex items-center justify-end"
          >
            {/* NOTE: Will be used later */}
            {/* <Typography variant="h5" className="cursor-pointer font-normal">
              Getting Started
            </Typography> */}
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <IconBox {...bindTrigger(popupState)}>
                    <Badge badgeContent={0} color="primary" max={99}>
                      <NotificationsOutlinedIcon fontSize="medium" />
                    </Badge>
                  </IconBox>
                  <NotificationsPopover popupState={popupState} />
                </div>
              )}
            </PopupState>
            <HeaderMenuIcon>
              <Typography variant="h5" className="cursor-pointer font-normal">
                Account
              </Typography>
            </HeaderMenuIcon>
          </Grid>
        </Grid>
      </Box>

      <Box className="block lg:hidden">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <MenuIcon
            className="text-3xl cursor-pointer"
            onClick={toggleDrawer}
          />
          <Link href="/default-channel/en-US/dashboard" passHref>
            <Image src="/Logo.svg" alt="SHAROVE LOGO" width={177} height={28} />
          </Link>
          <SearchIcon
            fontSize="medium"
            className="cursor-pointer"
            onClick={toggleSearchDrawer}
          />
        </Stack>
      </Box>
    </HeaderWrapper>
  );
}
