import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Social } from "../components/MyStore/Social/Social";

const socialMediaLinks = {
  facebook: "http://facebook.com",
  instagram: "http://instagram.com",
  twitter: "http://twitter.com",
  pinterest: "http://pinterest.com",
};

describe("My Store Social Section", () => {
  it("renders social tab", () => {
    render(<Social socialMediaLinks={socialMediaLinks} />);
    const facebookField = screen.getByPlaceholderText("Facebook");
    const instagramField = screen.getByPlaceholderText("Instagram");
    const twitterField = screen.getByPlaceholderText("Twitter");
    const pinterestField = screen.getByPlaceholderText("Pinterest");
    expect(facebookField).toBeDefined();
    expect(instagramField).toBeDefined();
    expect(twitterField).toBeDefined();
    expect(pinterestField).toBeDefined();
  });
});
