import { render, screen } from "@testing-library/react";
import { NodeGraph } from "@/components/node-graph";

describe("NodeGraph", () => {
  it("renders the Data Flow label", () => {
    render(<NodeGraph />);
    expect(screen.getByText("Data Flow")).toBeInTheDocument();
  });

  it("renders all source nodes", () => {
    render(<NodeGraph />);
    expect(screen.getByText("SQL / EDC")).toBeInTheDocument();
    expect(screen.getByText("APIs / Files")).toBeInTheDocument();
    expect(screen.getByText("AWS / Azure")).toBeInTheDocument();
  });

  it("renders all output nodes", () => {
    render(<NodeGraph />);
    expect(screen.getByText("Power BI")).toBeInTheDocument();
    expect(screen.getByText("ML Features")).toBeInTheDocument();
    expect(screen.getByText("Warehouse")).toBeInTheDocument();
  });

  it("renders the OneLake Core label", () => {
    render(<NodeGraph />);
    expect(screen.getByText("OneLake Core")).toBeInTheDocument();
  });

  it("renders the pipeline description", () => {
    render(<NodeGraph />);
    const description = screen.getByText(
      /raw ingest/i
    );
    expect(description).toBeInTheDocument();
  });

  it("renders the SVG connector", () => {
    const { container } = render(<NodeGraph />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
