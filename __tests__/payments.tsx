import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SalesSummary } from "../components/MyPayments/SalesSummary/SalesSummary";

const salesReport = {
  payout: {
    price: "200",
  },
  totalPrice: {
    price: "200",
  },
  pendingPayout: {
    price: "200",
  },
};

describe("My Payments Page Components", () => {
  it("renders orders summary component", () => {
    render(<SalesSummary salesReport={salesReport} />);
    const netIcome = screen.findByText("Net Income");
    const withdrawn = screen.findByText("Withdrawn");
    const pendingClearance = screen.findByText("Pending Clearance");
    const availableForWithdrawl = screen.findByText("Available for Withdrawal");
    const totalSales = screen.findByText("Total Sales");

    expect(netIcome).toBeDefined();
    expect(withdrawn).toBeDefined();
    expect(pendingClearance).toBeDefined();
    expect(availableForWithdrawl).toBeDefined();
    expect(totalSales).toBeDefined();
  });
});
