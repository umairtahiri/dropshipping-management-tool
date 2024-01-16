import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { GeneralSettings } from "../components/Settings/GeneralSettings/GeneralSettings";
import { OrdersSettings } from "../components/Settings/OrdersSettings/OrdersSettings";

describe("Settings Page", () => {
  it("renders a general and order settings tab", () => {
    render(<GeneralSettings />);
    const autoUpdateSettings = screen.findByText("Auto Updates");
    const costSettings = screen.findByText("When the cost changes");
    const inventorSettings = screen.findByText("When inventory changes");
    expect(autoUpdateSettings).toBeDefined();
    expect(costSettings).toBeDefined();
    expect(inventorSettings).toBeDefined();
  });

  it("renders settings", () => {
    render(<OrdersSettings />);
    const orderCancelationSettings = screen.findByText(
      "Automatic order cancellation"
    );
    const logisticsSyncSettings = screen.findByText(
      "Automatic logistics synchronization"
    );
    expect(orderCancelationSettings).toBeDefined();
    expect(logisticsSyncSettings).toBeDefined();
  });
});
