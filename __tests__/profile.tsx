import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Profile } from "../components/MyStore/Profile/Profile";
import { FileUpload } from "../components/FileUpload/FileUpload";

describe("My Store Profile Section", () => {
  it("renders profile tab", () => {
    render(<Profile logo="https://store.com" storefrontUrl="testshop.com" />);
    const storeNameField = screen.getByPlaceholderText("Store Name");
    const storeURLField = screen.findByText("Store URL");
    const aboutStoreField = screen.getByPlaceholderText("About Store");
    expect(storeNameField).toBeDefined();
    expect(storeURLField).toBeDefined();
    expect(aboutStoreField).toBeDefined();
  });

  it("renders file upload component", () => {
    render(
      <FileUpload
        url="https://store.com"
        height="125px"
        sizeDetails="177 x 28 recommended size"
        title="Upload Store Logo"
      />
    );
    const sizeDetails = screen.findByText("177 x 28 recommended size");
    const title = screen.findByText("Upload Store Logo");
    expect(sizeDetails).toBeDefined();
    expect(title).toBeDefined();
  });
});
