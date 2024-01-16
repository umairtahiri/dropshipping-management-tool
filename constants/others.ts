export const ORDER_STATUS_LIST = [
  {
    labal: "Ready to Fulfill",
    value: "READY_TO_FULFILL",
  },
  {
    labal: "Ready to Capture",
    value: "READY_TO_CAPTURE",
  },
  {
    labal: "Unfulfilled",
    value: "UNFULFILLED",
  },
  {
    labal: "Unconfirmed",
    value: "UNCONFIRMED",
  },
  {
    labal: "Partially Fulfilled",
    value: "PARTIALLY_FULFILLED",
  },
  {
    labal: "Partially Returned",
    value: "PARTIALLY_RETURNED",
  },
  {
    labal: "Fulfilled",
    value: "FULFILLED",
  },
  {
    labal: "Returned",
    value: "RETURNED",
  },
  {
    labal: "Cancelled",
    value: "CANCELED",
  },
];
export const DEFAULT_PAGINATION = {
  endCursor: "",
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor: "",
};

export const DESCRIPTION =
  '{"time": 16629, "blocks": [{"id": "cqWmV3MIPH", "data": {"text": "dummyDescription"}, "type": "paragraph"}], "version": "2.24.3"}';

export const DEFAULT_SALES_REPORT = {
  payout: {
    price: "0.0",
    formated: "$0.0",
  },
  totalPrice: {
    price: "0.0",
    formated: "$0.0",
  },
  pendingPayout: {
    price: "0.0",
    formated: "$0.0",
  },
};
