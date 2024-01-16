import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Image from "next/legacy/image";
import React from "react";

import { getStatusLabel } from "../../../lib/util";
import { orderType } from "../order.type";
import {
  DeliveredStatusIcon,
  DisputedStatusIcon,
  OrderPaper,
  ProcessingStatusIcon,
  Status,
  TransitStatusIcon,
} from "./OrderCard.style";

interface OrderCardPropTypes {
  order: orderType;
}

export function OrderCard({ order }: OrderCardPropTypes) {
  const {
    number,
    shippingAddress,
    deliveryMethod,
    created,
    status,
    user,
    profit,
  } = order;
  const { streetAddress1, streetAddress2 } = shippingAddress || {};
  const { maximumDeliveryDays, minimumDeliveryDays, name } =
    deliveryMethod || {};
  const { firstName, lastName } = user || {};

  const getStatusIcon = () => {
    switch (status) {
      case "RETURNED":
      case "PARTIALLY_RETURNED":
      case "UNFULFILLED":
        return <TransitStatusIcon elevation={0} />;
      case "READY_TO_FULFILL":
      case "READY_TO_CAPTURE":
      case "PARTIALLY_FULFILLED":
        return <ProcessingStatusIcon elevation={0} />;
      case "UNCONFIRMED":
      case "CANCELED":
        return <DisputedStatusIcon elevation={0} />;
      default:
        return <DeliveredStatusIcon elevation={0} />;
    }
  };

  return (
    <OrderPaper className="w-full hidden md:block">
      <Box className="pb-3">
        <Grid container columns={12}>
          <Grid item xs={3}>
            <Typography variant="h6">Order ID</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Shipping Address</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6">Profit</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Delivery</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Order Time</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Order Status</Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box className="pt-5">
        <Grid container columns={12}>
          <Grid item xs={3} className="flex items-center">
            <Box className="max-w-[230px]">
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                className="text-sm break-words cursor-pointer"
              >
                {number}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2} className="flex flex-col flex-col justify-center">
            <Typography variant="h6" component="div" gutterBottom>
              {firstName} {lastName}
            </Typography>
            <Typography component="div" gutterBottom className="grey-color-14">
              {streetAddress1}, {streetAddress2}
            </Typography>
          </Grid>
          <Grid item xs={1} className="flex items-center">
            <Typography variant="h6">${profit || ""}</Typography>
          </Grid>
          <Grid item xs={2} className="flex gap-x-4">
            <Image src="/deliveryIcon.svg" width={50} height={50} />
            <Box className="flex flex-col justify-center">
              <Typography variant="h6" component="div" gutterBottom>
                {name}
              </Typography>
              <Typography
                component="div"
                gutterBottom
                className="grey-color-12"
              >
                <LocalShippingOutlinedIcon className="mr-2 text-xs" />
                {minimumDeliveryDays || 0} TO {maximumDeliveryDays || 0} DAYS
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2} className="flex flex-col justify-center">
            <Typography variant="h6" component="div" gutterBottom>
              {moment(created, "YYYYMMDD").fromNow()}
            </Typography>
            <Typography component="div" gutterBottom className="grey-color-12">
              {moment(created).format("lll")}
            </Typography>
          </Grid>
          <Grid item xs={2} className="flex items-center">
            <Status className="text-sm capitalize">
              {getStatusIcon()}
              {getStatusLabel(status)}
            </Status>
          </Grid>
        </Grid>
      </Box>
    </OrderPaper>
  );
}
