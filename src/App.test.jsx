import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";
import { featuredLenses, projects } from "./data";

describe("portfolio", () => {
  it("keeps every featured path connected to a real project", () => {
    expect(new Set(featuredLenses.map((lens) => lens.id)).size).toBe(featuredLenses.length);
    for (const lens of featuredLenses) {
      expect(projects.some((project) => project.title === lens.projectTitle)).toBe(true);
      expect(lens.stages).toHaveLength(4);
    }
  });

  it("shows all featured projects and their source links by default", () => {
    render(<App />);

    expect(screen.getByText("Showing 12 projects")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Chronicle LSM Store" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mini Raft Store" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Luma Journal" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "ScopeLedger" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "HarFlow Studio" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "RelayForge" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /source code on GitHub/ })).toHaveLength(12);
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

  it("lets visitors explore project paths from either interactive control", async () => {
    const user = userEvent.setup();
    render(<App />);

    const map = screen.getByRole("group", { name: "Interactive project map" });
    await user.click(within(map).getByRole("button", { name: "Explore Full stack projects" }));

    expect(within(map).getByRole("button", { name: "Explore Full stack projects" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "Turn ambiguity into a decision." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore ScopeLedger/ })).toHaveAttribute("href", "https://github.com/brohum10/scopeledger");

    const choices = screen.getByRole("group", { name: "Featured project category" });
    await user.click(within(choices).getByRole("button", { name: /Frontend/ }));

    expect(screen.getByRole("heading", { name: "Make performance tangible." })).toBeInTheDocument();
    expect(screen.getByText("Import HAR")).toBeInTheDocument();
    expect(within(map).getByRole("button", { name: "Explore Frontend projects" })).toHaveAttribute("aria-pressed", "true");
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
