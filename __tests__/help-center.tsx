import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FaqCard } from "../components/FaqCard/FaqCard";

const faq = {
  title: "Lorem ipsum dolor sit amet",
  id: "1",
  questions: [
    {
      id: "1a",
      query: "Lorem ipsum dolor sit amet",
      answer:
        "onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "1b",
      query: "Lorem ipsum dolor sit amet",
      answer:
        "onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "1c",
      query: "Lorem ipsum dolor sit amet",
      answer:
        "onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "1d",
      query: "Lorem ipsum dolor sit amet",
      answer:
        "onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ],
};

describe("Help Center Components", () => {
  it("renders faq card", () => {
    render(<FaqCard faq={faq} />);
    const title = screen.findByText(faq.title);
    const query = screen.findByText(faq.questions[0].query);
    const answer = screen.findByText(faq.questions[0].answer);
    expect(title).toBeDefined();
    expect(query).toBeDefined();
    expect(answer).toBeDefined();
  });
});
