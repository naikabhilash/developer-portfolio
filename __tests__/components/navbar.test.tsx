import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "@/components/navbar";

describe("Navbar", () => {
  it("renders the site title link", () => {
    render(<Navbar />);
    expect(screen.getByText("Abhilash Naik")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Navbar />);
    expect(screen.getAllByText("Architecture")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Case Studies")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Stack")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Timeline")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Contact")[0]).toBeInTheDocument();
  });

  it("links have correct href attributes", () => {
    render(<Navbar />);
    const archLink = screen.getAllByText("Architecture")[0];
    expect(archLink.closest("a")).toHaveAttribute("href", "#pillars");
  });

  it("toggle button has correct aria-label", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: "Toggle menu" })).toBeInTheDocument();
  });

  it("mobile menu is hidden by default", () => {
    render(<Navbar />);
    // Only desktop nav links should be present initially (no mobile nav)
    const navElements = screen.getAllByRole("navigation");
    expect(navElements).toHaveLength(1);
  });

  it("opens mobile menu when toggle is clicked", () => {
    render(<Navbar />);
    const toggleBtn = screen.getByRole("button", { name: "Toggle menu" });
    fireEvent.click(toggleBtn);

    // Now mobile nav should appear (2 nav elements)
    const navElements = screen.getAllByRole("navigation");
    expect(navElements).toHaveLength(2);
  });

  it("closes mobile menu when a link is clicked", () => {
    render(<Navbar />);
    const toggleBtn = screen.getByRole("button", { name: "Toggle menu" });
    fireEvent.click(toggleBtn);

    // Click a link in the mobile menu
    const mobileLinks = screen.getAllByText("Architecture");
    const mobileLink = mobileLinks[mobileLinks.length - 1];
    fireEvent.click(mobileLink);

    // Mobile nav should close
    const navElements = screen.getAllByRole("navigation");
    expect(navElements).toHaveLength(1);
  });

  it("closes mobile menu when toggle is clicked again", () => {
    render(<Navbar />);
    const toggleBtn = screen.getByRole("button", { name: "Toggle menu" });

    fireEvent.click(toggleBtn);
    expect(screen.getAllByRole("navigation")).toHaveLength(2);

    fireEvent.click(toggleBtn);
    expect(screen.getAllByRole("navigation")).toHaveLength(1);
  });
});
