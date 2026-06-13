import { render, screen } from "@testing-library/react";
import { Button, buttonVariants } from "@/components/ui/button";

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Button className="my-custom-class">Test</Button>);
    const button = screen.getByRole("button", { name: "Test" });
    expect(button.className).toContain("my-custom-class");
  });

  it("renders children correctly", () => {
    render(
      <Button>
        <span>Icon</span> Label
      </Button>
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText(/Label/)).toBeInTheDocument();
  });

  it("passes through additional props", () => {
    render(<Button data-testid="custom-btn">Test</Button>);
    expect(screen.getByTestId("custom-btn")).toBeInTheDocument();
  });
});

describe("buttonVariants", () => {
  it("generates default variant classes", () => {
    const classes = buttonVariants({ variant: "default", size: "default" });
    expect(classes).toContain("bg-primary");
  });

  it("generates outline variant classes", () => {
    const classes = buttonVariants({ variant: "outline" });
    expect(classes).toContain("border-border");
  });

  it("generates secondary variant classes", () => {
    const classes = buttonVariants({ variant: "secondary" });
    expect(classes).toContain("bg-secondary");
  });

  it("generates ghost variant classes", () => {
    const classes = buttonVariants({ variant: "ghost" });
    expect(classes).toContain("hover:bg-muted");
  });

  it("generates destructive variant classes", () => {
    const classes = buttonVariants({ variant: "destructive" });
    expect(classes).toContain("bg-destructive/10");
  });

  it("generates link variant classes", () => {
    const classes = buttonVariants({ variant: "link" });
    expect(classes).toContain("underline-offset-4");
  });

  it("generates lg size classes", () => {
    const classes = buttonVariants({ size: "lg" });
    expect(classes).toContain("h-9");
  });

  it("generates sm size classes", () => {
    const classes = buttonVariants({ size: "sm" });
    expect(classes).toContain("h-7");
  });

  it("generates xs size classes", () => {
    const classes = buttonVariants({ size: "xs" });
    expect(classes).toContain("h-6");
  });

  it("generates icon size classes", () => {
    const classes = buttonVariants({ size: "icon" });
    expect(classes).toContain("size-8");
  });
});
