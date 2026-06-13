import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Page (app/page.tsx)", () => {
  it("renders without crashing", () => {
    render(<Page />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders the Navbar", () => {
    render(<Page />);
    expect(screen.getAllByText("Abhilash Naik").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the Hero section", () => {
    render(<Page />);
    expect(
      screen.getByText(/Architecting Enterprise Data Ecosystems/i)
    ).toBeInTheDocument();
  });

  it("renders the Pillars section", () => {
    render(<Page />);
    expect(screen.getByText("Core Engineering Pillars")).toBeInTheDocument();
  });

  it("renders the StackMatrix section", () => {
    render(<Page />);
    expect(screen.getByText("Tech Stack Matrix")).toBeInTheDocument();
  });

  it("renders the CaseStudies section", () => {
    render(<Page />);
    expect(screen.getByText("Enterprise Case Studies")).toBeInTheDocument();
  });

  it("renders the Timeline section", () => {
    render(<Page />);
    expect(screen.getByText("Experience Timeline")).toBeInTheDocument();
  });

  it("renders the Footer", () => {
    render(<Page />);
    expect(
      screen.getByText(/build something scalable together/i)
    ).toBeInTheDocument();
  });
});
