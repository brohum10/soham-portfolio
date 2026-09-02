import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("portfolio", () => {
  it("shows all featured projects and their source links by default", () => {
    render(<App />);

    expect(screen.getByText("Showing 7 projects")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mini Raft Store" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Luma Journal" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /source code on GitHub/ })).toHaveLength(7);
  });

  it("filters projects without hiding the filter state from assistive technology", async () => {
    const user = userEvent.setup();
    render(<App />);

    const appliedAiFilter = screen.getByRole("button", { name: "Applied AI" });
    await user.click(appliedAiFilter);

    expect(appliedAiFilter).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Showing 3 projects")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Luma Journal" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Mini Raft Store" })).not.toBeInTheDocument();
  });

  it("exposes mobile navigation state and closes the menu with Escape", async () => {
    const user = userEvent.setup();
    render(<App />);

    const menuButton = screen.getByRole("button", { name: "Open navigation" });
    await user.click(menuButton);
    expect(screen.getByRole("button", { name: "Close navigation" })).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
  });
});
