import { render, screen, fireEvent } from "@testing-library/react";
import { StackMatrix } from "@/components/stack-matrix";

describe("StackMatrix", () => {
  it("renders the section heading", () => {
    render(<StackMatrix />);
    expect(screen.getByText("Tech Stack Matrix")).toBeInTheDocument();
  });

  it("renders the section subheading", () => {
    render(<StackMatrix />);
    expect(screen.getByText("The Semantic Layer")).toBeInTheDocument();
  });

  it("renders all domain buttons", () => {
    render(<StackMatrix />);
    expect(screen.getByText("Fabric Storage")).toBeInTheDocument();
    expect(screen.getByText("Pipelines & Compute")).toBeInTheDocument();
    expect(screen.getByText("BI & Semantics")).toBeInTheDocument();
    expect(screen.getByText("Governance & Ops")).toBeInTheDocument();
  });

  it("shows Fabric Storage items by default", () => {
    render(<StackMatrix />);
    expect(screen.getByText("OneLake")).toBeInTheDocument();
    expect(screen.getByText("Lakehouse")).toBeInTheDocument();
    expect(screen.getByText("Warehouse Design")).toBeInTheDocument();
    expect(screen.getByText("Delta / Parquet Optimization")).toBeInTheDocument();
  });

  it("switches to Pipelines & Compute when clicked", () => {
    render(<StackMatrix />);
    fireEvent.click(screen.getByText("Pipelines & Compute"));

    expect(screen.getByText("PySpark")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("dbt")).toBeInTheDocument();
    expect(screen.getByText("AWS Glue")).toBeInTheDocument();
    expect(screen.getByText("Azure Data Factory")).toBeInTheDocument();
    expect(screen.getByText("Apache Airflow")).toBeInTheDocument();
  });

  it("switches to BI & Semantics when clicked", () => {
    render(<StackMatrix />);
    fireEvent.click(screen.getByText("BI & Semantics"));

    expect(screen.getByText("Power BI")).toBeInTheDocument();
    expect(screen.getByText("DAX")).toBeInTheDocument();
    expect(screen.getByText("Power Query (M)")).toBeInTheDocument();
    expect(screen.getByText("Tabular Editor")).toBeInTheDocument();
    expect(screen.getByText("DAX Studio")).toBeInTheDocument();
  });

  it("switches to Governance & Ops when clicked", () => {
    render(<StackMatrix />);
    fireEvent.click(screen.getByText("Governance & Ops"));

    expect(screen.getByText("RBAC")).toBeInTheDocument();
    expect(screen.getByText("Data Lineage")).toBeInTheDocument();
    expect(screen.getByText("Sensitivity Labels")).toBeInTheDocument();
    expect(screen.getByText("CI/CD Workflows")).toBeInTheDocument();
  });

  it("hides previous domain items when switching", () => {
    render(<StackMatrix />);
    expect(screen.getByText("OneLake")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Pipelines & Compute"));
    expect(screen.queryByText("OneLake")).not.toBeInTheDocument();
  });

  it("renders the section with correct id for navigation", () => {
    const { container } = render(<StackMatrix />);
    const section = container.querySelector("#stack");
    expect(section).toBeInTheDocument();
  });
});
