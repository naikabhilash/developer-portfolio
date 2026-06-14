import { render, screen } from "@testing-library/react";
import { Timeline } from "@/components/timeline";

describe("Timeline", () => {
  it("renders the section heading", () => {
    render(<Timeline />);
    expect(screen.getByText("Experience Timeline")).toBeInTheDocument();
  });

  it("renders the section subheading", () => {
    render(<Timeline />);
    expect(screen.getByText("The Commit History")).toBeInTheDocument();
  });

  it("renders all company names", () => {
    render(<Timeline />);
    expect(screen.getByText("UsefulBI Corporation")).toBeInTheDocument();
    expect(screen.getByText("Benori Knowledge Solutions")).toBeInTheDocument();
    expect(screen.getByText("Times Internet (Taskbucks)")).toBeInTheDocument();
  });

  it("renders all job titles", () => {
    render(<Timeline />);
    expect(screen.getByText("Lead Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Senior Data Analyst")).toBeInTheDocument();
    expect(screen.getByText("Data Analyst")).toBeInTheDocument();
  });

  it("renders all time periods", () => {
    render(<Timeline />);
    expect(screen.getByText("2021 – Present")).toBeInTheDocument();
    expect(screen.getByText("2018 – 2021")).toBeInTheDocument();
    expect(screen.getByText("2016 – 2018")).toBeInTheDocument();
  });

  it("renders role descriptions", () => {
    render(<Timeline />);
    expect(
      screen.getByText(/Architecting ETL pipelines/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Engineering automated web crawlers/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Developing operational dashboards/i)
    ).toBeInTheDocument();
  });

  it("renders the section with correct id for navigation", () => {
    const { container } = render(<Timeline />);
    const section = container.querySelector("#timeline");
    expect(section).toBeInTheDocument();
  });

  it("marks the current role as active (blue dot)", () => {
    const { container } = render(<Timeline />);
    const dots = container.querySelectorAll("span.absolute");
    const activeDot = dots[0];
    expect(activeDot.className).toContain("bg-blue-900");
  });

  it("marks past roles as inactive (gray dot)", () => {
    const { container } = render(<Timeline />);
    const dots = container.querySelectorAll("span.absolute");
    const inactiveDot = dots[1];
    expect(inactiveDot.className).toContain("bg-zinc-300");
  });
});
