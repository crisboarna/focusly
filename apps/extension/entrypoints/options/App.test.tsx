import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App.tsx';

describe("Options Entrypoint", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  });

  it("renders", () => {
    render(<App/>);
    expect(screen.getByText("On/Off")).toBeDefined();
    expect(screen.getByText("Audit Console On/Off")).toBeDefined();
    expect(screen.getByText("Focusly")).toBeDefined();
  });
  //
  it("enabled extension", () => {
    render(<App/>);

    const count = screen.getByTestId("toggle-extension-src");
    const buttons = screen.getAllByAltText("Focusly Enable/Disable");

    expect(count.getAttribute("src")).toEqual("/assets/toggle-off.png");

    waitFor(() => {
      fireEvent.click(buttons[0]);
    });
    expect(count.getAttribute("src")).toEqual("/assets/toggle-on.png");
  });

  it("enabled audit", () => {
    render(<App/>);

    const count = screen.getByTestId("toggle-audit-src");
    const buttons = screen.getAllByAltText("Audit Enable/Disable");

    expect(count.getAttribute("src")).toEqual("/assets/toggle-off.png");

    waitFor(() => {
      fireEvent.click(buttons[0]);
    });
    expect(count.getAttribute("src")).toEqual("/assets/toggle-on.png");
  });
});
