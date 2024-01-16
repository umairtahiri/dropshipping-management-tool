import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NotificationCard } from "../components/NotificationCard/NotificationCard";

const notification = {
  title: "Product status changed",
  message:
    "The product in My Products list is not available anymore. Product: SIPO 2022 3-piece Large Size Muslim Swimwear Navy Ruffled Burkini Bra Padded Swimsuit Maillot De Bain Femme Burkini .",
  date: "2022-10-16 23:46:08",
};

describe("Notifications page Components", () => {
  it("renders notification card", () => {
    render(<NotificationCard notification={notification} />);
    const title = screen.findByText(notification.title);
    const message = screen.findByText(notification.message);
    const date = screen.findByText(notification.date);
    expect(title).toBeDefined();
    expect(message).toBeDefined();
    expect(date).toBeDefined();
  });
});
