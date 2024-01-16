import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { StoreBanner } from "../components/MyStore/StoreBanner/StoreBanner";

describe("My Store Banner Section", () => {
  it("renders store banner", () => {
    render(<StoreBanner />);
    const title = screen.findByText("Store Banner");
    expect(title).toBeDefined();
  });
});
