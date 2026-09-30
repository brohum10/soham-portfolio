import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom has no media-query implementation. Individual tests can override it.
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });

afterEach(() => cleanup());
