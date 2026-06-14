import { render, screen } from "@testing-library/react";
import { Pillars } from "@/components/pillars";

describe("Pillars", () => {
  it("renders the section heading", () => {
    render(<Pillars />);
    expect(screen.getByText("Core Engineering Pillars")).toBeInTheDocument();
  });

  it("renders the section subheading", () => {
    render(<Pillars />);
    expect(screen.getByText("The Archetype")).toBeInTheDocument();
  });

  it("renders all three pillar titles", () => {
    render(<Pillars />);
    expect(screen.getByText("Compute & Performance")).toBeInTheDocument();
    expect(screen.getByText("Absolute Data Integrity")).toBeInTheDocument();
    expect(screen.getByText("Self-Service Culture")).toBeInTheDocument();
  });

  it("renders all three pillar descriptions", () => {
    render(<Pillars />);
    expect(
      screen.getByText(/Dropping cloud overhead/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Version-controlled pipelines/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Building unified semantic models/i)
    ).toBeInTheDocument();
  });

  it("renders the section with correct id for navigation", () => {
    const { container } = render(<Pillars />);
    const section = container.querySelector("#pillars");
    expect(section).toBeInTheDocument();
  });
});
