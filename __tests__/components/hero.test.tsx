import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/hero";

describe("Hero", () => {
  it("renders the certification badge", () => {
    render(<Hero />);
    expect(
      screen.getByText("Microsoft Certified: Fabric Analytics Engineer Associate")
    ).toBeInTheDocument();
  });

  it("renders the headline text", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Architecting Enterprise Data Ecosystems/i)
    ).toBeInTheDocument();
  });

  it("renders the italic subheadline", () => {
    render(<Hero />);
    expect(
      screen.getByText("Optimizing Modern Lakehouses.")
    ).toBeInTheDocument();
  });

  it("renders the description paragraph", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Lead Software Engineer with 9 years/i)
    ).toBeInTheDocument();
  });

  it("renders the case studies CTA link", () => {
    render(<Hero />);
    const cta = screen.getByText("Run Case Studies");
    expect(cta.closest("a")).toHaveAttribute("href", "#case-studies");
  });

  it("renders the download resume link", () => {
    render(<Hero />);
    const link = screen.getByText("Download Resume");
    expect(link.closest("a")).toHaveAttribute("href", "/resume.pdf");
  });

  it("renders the NodeGraph component", () => {
    render(<Hero />);
    expect(screen.getByText("OneLake Core")).toBeInTheDocument();
  });
});
