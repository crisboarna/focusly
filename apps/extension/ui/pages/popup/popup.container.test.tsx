import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PopupContainer from './popup.container';
import userEvent from '@testing-library/user-event';

describe("Popup Container", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  });

  it("renders without crashing", () => {
    render(<PopupContainer
      currentDomains={[]}
      configuredDomains={[]}
      setDomains={() => {}}
    />);
    expect(screen.getByTestId("popup-empty")).toBeDefined();
  });

  it("renders a Table when there are current domains", () => {
    render(<PopupContainer
      currentDomains={['domain1']}
      configuredDomains={[{domain: 'domain1', toggles: DEFAULT_TOGGLES}]}
      setDomains={() => {}}
    />);
    expect(screen.getByTestId("table")).toBeDefined();
  });

  it("toggleTrigger function toggles the trigger state", async () => {
    const setDomains = vi.fn();
    render(<PopupContainer
      currentDomains={['domain1']}
      configuredDomains={[{domain: 'domain1', toggles: DEFAULT_TOGGLES}]}
      setDomains={setDomains}
    />);
    await userEvent.click(screen.getAllByRole("checkbox")[0]);
    await waitFor(() => expect(setDomains).toHaveBeenCalled());
  });

  it("setDomains function is called with the correct arguments when trigger state changes", async () => {
    const setDomains = vi.fn();
    const toggles: any = Object.fromEntries(
      Object.entries(DEFAULT_TOGGLES).map(([key, value]) => [key, !value])
    );

    render(<PopupContainer
      currentDomains={['domain1']}
      configuredDomains={[{domain: 'domain1', toggles: DEFAULT_TOGGLES}]}
      setDomains={setDomains}
    />);
    await userEvent.click(screen.getAllByRole("checkbox")[0]);
    await waitFor(() => expect(setDomains).toHaveBeenCalled());
    await waitFor(() => expect(setDomains).toHaveBeenCalledWith([{domain: 'domain1', toggles}]));
  });
});
