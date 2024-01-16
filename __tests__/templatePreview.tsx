import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TemplatePreview } from "../components/MyStore/TemplatePreview/TemplatePreview";

describe("My Store template preview Section", () => {
  it("renders template preview", () => {
    render(<TemplatePreview />);
    const title = screen.findByText("Template Preview");
    expect(title).toBeDefined();
  });
});
