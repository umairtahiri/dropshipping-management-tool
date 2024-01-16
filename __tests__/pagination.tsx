import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Pagination } from "../components/Common/Pagination/Pagination";

const pageInfo = {
  endCursor: "",
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor: "",
};

describe("Pagination component", () => {
  it("renders next button", () => {
    render(<Pagination pageInfo={pageInfo} totalPages={50} currentPage={2} />);
    const nextButton = screen.findByText("Next");
    expect(nextButton).toBeDefined();
  });

  it("renders previous button", () => {
    render(<Pagination pageInfo={pageInfo} totalPages={50} currentPage={2} />);
    const prevButton = screen.findByText("Previous");
    expect(prevButton).toBeDefined();
  });
});
