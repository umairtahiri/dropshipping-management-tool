import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/lib/redux/store";
import { UsersDashboardPropTypes } from "@/lib/types";

import {
  InfoContainer,
  InfoItem,
  TextContainer,
  Title,
  UsersDashboardContainer,
  WelcomeMsg,
} from "./UsersDashboard.style";

export function UsersDashboard({ ordersReport }: UsersDashboardPropTypes) {
  const firstName = useSelector(
    (state: RootState) => state?.user?.user?.given_name
  );

  const storeFrontUrl = useSelector(
    (state: RootState) => state?.retailer?.storeFront?.url
  );

  const {
    ordersCancelled,
    ordersProcessing,
    ordersReturnsRequested,
    ordersShipped,
    totalEarnings,
  } = ordersReport;
  return (
    <UsersDashboardContainer>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <TextContainer>
          <WelcomeMsg>Welcome Back, {firstName}</WelcomeMsg>
          <Title>
            <Link passHref href={`https://${storeFrontUrl}`} target="_blank">
              <Typography variant="body1" className="sharove-color">
                View Store <ArrowForwardIosIcon />
              </Typography>
            </Link>
          </Title>
        </TextContainer>
        <InfoContainer>
          <InfoItem>
            <Typography className="green-value">
              ${totalEarnings || 0}
            </Typography>
            <Typography className="green-label">Total Earnings</Typography>
          </InfoItem>
          <InfoItem>
            <Typography className="value">{ordersProcessing || 0}</Typography>
            <Typography className="label">Orders Processing</Typography>
          </InfoItem>
          <InfoItem>
            <Typography className="value">{ordersShipped || 0}</Typography>
            <Typography className="label">Orders Shipped</Typography>
          </InfoItem>
          <InfoItem>
            <Typography className="value">{ordersCancelled || 0}</Typography>
            <Typography className="label">Orders Cancelled</Typography>
          </InfoItem>
          <InfoItem>
            <Typography className="value">
              {ordersReturnsRequested || 0}
            </Typography>
            <Typography className="label">Requested Returns</Typography>
          </InfoItem>
        </InfoContainer>
      </Grid>
    </UsersDashboardContainer>
  );
}
