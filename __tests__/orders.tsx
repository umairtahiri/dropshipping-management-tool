import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OrderCard } from "../components/MyOrders/OrderCard/OrderCard";
import { OrderCardSmall } from "../components/MyOrders/OrderCardSmall/OrderCardSmall";

const order = {
  number: "116",
  created: "2022-12-26T14:38:51.614106+00:00",
  status: "PARTIALLY_RETURNED",
  user: {
    id: "VXNlcjo3MTM=",
    firstName: "Azhar",
    lastName: "Iqbal",
    email: "azhar.iqbal@aiworks.ai",
  },
  shippingAddress: {
    streetAddress1: "Gulberg, Tipu Road",
    streetAddress2: "Kickstart",
  },
  deliveryMethod: {
    minimumDeliveryDays: 3,
    maximumDeliveryDays: 5,
    name: "UPS",
  },
  total: {
    net: {
      amount: 0,
    },
  },
};

describe("My Orders Page Components", () => {
  it("renders a order card for desktop view", () => {
    render(<OrderCard order={order} />);
    const orderId = screen.findByText(order.number);
    const userFirstName = screen.findByText(order.user.firstName);
    const orderStatus = screen.findByText(order.status);
    expect(orderId).toBeDefined();
    expect(userFirstName).toBeDefined();
    expect(orderStatus).toBeDefined();
  });

  it("renders a order card for mobile view", () => {
    render(<OrderCardSmall order={order} />);
    const orderId = screen.findByText(order.number);
    const userFirstName = screen.findByText(order.user.firstName);
    const orderStatus = screen.findByText(order.status);
    expect(orderId).toBeDefined();
    expect(userFirstName).toBeDefined();
    expect(orderStatus).toBeDefined();
  });
});
