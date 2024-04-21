import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import OptionsContainer from './options.container';
import userEvent from '@testing-library/user-event';

describe("Options Container", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  });

  it("renders without crashing", () => {
    render(<OptionsContainer
      domains={[]}
      setDomains={() => {}}
    />);
    expect(screen.getByTestId("table")).toBeDefined();
  });

  it("updates domains", async () => {
    const setDomains = vi.fn();

    render(<OptionsContainer
      domains={[{domain: "test", toggles: DEFAULT_TOGGLES}]}
      setDomains={setDomains}
    />);

    await userEvent.click(screen.getAllByRole("checkbox")[0]);
    await waitFor(() =>expect(setDomains).toHaveBeenCalledTimes(1));
  });
});
