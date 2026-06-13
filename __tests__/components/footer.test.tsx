import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/footer";

describe("Footer", () => {
  it("renders the section heading", () => {
    render(<Footer />);
    expect(
      screen.getByText(/build something scalable together/i)
    ).toBeInTheDocument();
  });

  it("renders the section subheading", () => {
    render(<Footer />);
    expect(screen.getByText("The Callback Function")).toBeInTheDocument();
  });

  it("renders the email link", () => {
    render(<Footer />);
    const emailLink = screen.getByText("Send email").closest("a");
    expect(emailLink).toHaveAttribute("href", "mailto:abhilash29naik@gmail.com");
  });

  it("renders the LinkedIn link", () => {
    render(<Footer />);
    const linkedinLink = screen
      .getByText("linkedin.com/in/abhilash-naik")
      .closest("a");
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://linkedin.com/in/abhilash-naik"
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the copyright notice", () => {
    render(<Footer />);
    expect(
      screen.getByText(/© 2026 Abhilash Naik/i)
    ).toBeInTheDocument();
  });

  it("renders the footer name", () => {
    render(<Footer />);
    expect(screen.getAllByText("Abhilash Naik")[0]).toBeInTheDocument();
  });

  it("renders the contact code block with email", () => {
    render(<Footer />);
    expect(
      screen.getByText('"abhilash29naik@gmail.com"')
    ).toBeInTheDocument();
  });

  it("renders the contact code block with location", () => {
    render(<Footer />);
    expect(
      screen.getByText('"Bengaluru, India // Remote"')
    ).toBeInTheDocument();
  });

  it("renders the section with correct id for navigation", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("#contact");
    expect(footer).toBeInTheDocument();
  });
});
