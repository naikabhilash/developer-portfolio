import { render, screen } from "@testing-library/react";
import { CaseStudies } from "@/components/case-studies";

describe("CaseStudies", () => {
  it("renders the section heading", () => {
    render(<CaseStudies />);
    expect(screen.getByText("Enterprise Case Studies")).toBeInTheDocument();
  });

  it("renders the section subheading", () => {
    render(<CaseStudies />);
    expect(screen.getByText("The Production Logs")).toBeInTheDocument();
  });

  it("renders all case study titles", () => {
    render(<CaseStudies />);
    expect(
      screen.getByText("Fabric Capacity Optimization & Campaign Analytics")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Secure Multi-Source Clinical Trial Integration Platform")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Automated Modernization of 500+ Cloud Workloads")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Low-Latency Telemetry & Operational Alerting Engine")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Automated Predictive Features Engine")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Enterprise Workspace Isolation & Lineage Tracking")
    ).toBeInTheDocument();
  });

  it("renders sector tags", () => {
    render(<CaseStudies />);
    expect(screen.getByText("Automotive Sector")).toBeInTheDocument();
    expect(screen.getByText("Pharma Sector")).toBeInTheDocument();
    expect(screen.getByText("AWS to Databricks")).toBeInTheDocument();
    expect(screen.getByText("Streaming")).toBeInTheDocument();
    expect(screen.getByText("MLOps")).toBeInTheDocument();
    expect(screen.getByText("Governance")).toBeInTheDocument();
  });

  it("renders metrics for case studies", () => {
    render(<CaseStudies />);
    expect(
      screen.getByText("30% Reduction in Fabric Capacity Overhead")
    ).toBeInTheDocument();
    expect(screen.getByText("200+ Active Self-Service Users")).toBeInTheDocument();
    expect(screen.getByText("Full Pharma Compliance")).toBeInTheDocument();
    expect(screen.getByText("+20% Code Quality Improvement")).toBeInTheDocument();
  });

  it("renders context descriptions", () => {
    render(<CaseStudies />);
    expect(
      screen.getByText(/Migrated legacy Dataflow Gen1 environments/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Designed pipeline architectures/i)
    ).toBeInTheDocument();
  });

  it("renders the section with correct id for navigation", () => {
    const { container } = render(<CaseStudies />);
    const section = container.querySelector("#case-studies");
    expect(section).toBeInTheDocument();
  });

  it("applies span class to the first case study", () => {
    const { container } = render(<CaseStudies />);
    const articles = container.querySelectorAll("article");
    expect(articles[0].className).toContain("lg:col-span-2");
  });
});
