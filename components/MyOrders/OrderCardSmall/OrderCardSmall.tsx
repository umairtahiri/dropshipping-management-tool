import { Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import Image from "next/legacy/image";
import React from "react";

import { getStatusLabel } from "../../../lib/util";
import { orderType } from "../order.type";
import {
  DeliveredStatusIcon,
  DisputedStatusIcon,
  ProcessingStatusIcon,
  Status,
  TransitStatusIcon,
} from "../OrderCard/OrderCard.style";
import { CardFooter, ImageWarpper, OrderPaper } from "./OrderCardSmall.style";

interface OrderCardSmallPropTypes {
  order: orderType;
}

export function OrderCardSmall({ order }: OrderCardSmallPropTypes) {
  const {
    number,
    shippingAddress,
    deliveryMethod,
    created,
    status,
    user,
    lines,
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
    <OrderPaper className="block w-full md:hidden">
      <Box>
        <Stack direction="row" spacing={2} className="px-3 py-3.5">
          <ImageWarpper>
            <Image
              src="/vendor.png"
              layout="intrinsic"
              alt="SHAROVE LOGO"
              width={91}
              height={134}
            />
          </ImageWarpper>
          <Box>
            <Stack direction="column" spacing={1}>
              <Box>
                <Typography className="grey-color-12 uppercase">
                  {firstName} {lastName} | {streetAddress1}, {streetAddress2}
                </Typography>
              </Box>

              <Box>
                <Typography className="grey-color-10">ORDER ID</Typography>
                <Typography className="black-color-11 uppercase">
                  {number}
                </Typography>
              </Box>

              <Box>
                <Typography className="grey-color-10">ORDER TIME</Typography>
                <Typography className="black-color-11 uppercase">
                  {moment(created, "YYYYMMDD").fromNow()} |{" "}
                  {moment(created).format("lll")}
                </Typography>
              </Box>

              <Box>
                <Typography className="grey-color-10">DELIVERY</Typography>
                <Typography className="black-color-11 uppercase">
                  {name} | {minimumDeliveryDays || 0} TO{" "}
                  {maximumDeliveryDays || 0} DAYS
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>

        <CardFooter>
          <Box>
            <Box className="flex">
              <Typography className="grey-color-12 w-36">Quantity</Typography>
              <Typography className="grey-color-12">
                {lines?.length || 0}
              </Typography>
            </Box>
          </Box>
          <Status className="text-sx capitalize">
            {getStatusIcon()}
            {getStatusLabel(status)}
          </Status>
        </CardFooter>
      </Box>
    </OrderPaper>
  );
}
