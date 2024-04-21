import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Table from './Table';
import { DEFAULT_TOGGLES } from '@/utils/storage.ts';

describe("Table", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  });

  it("renders without crashing", () => {
    render(<Table
      items={[]}
      toggles={{}}
      setToggles={() =>{}}
      toggleTrigger={() => {}}
    />);

    const domain = screen.getAllByText("Domain");
    const triggers = screen.getAllByText("Triggers");

    expect(domain.length).toEqual(1);
    expect(triggers.length).toEqual(1);
  });

  it("renders correct number of TableEntry components", async () => {
    const items = [{ domain: 'test1', toggles: DEFAULT_TOGGLES }, { domain: 'test2', toggles:DEFAULT_TOGGLES }];
    const toggles = { 'test1': DEFAULT_TOGGLES, 'test2': DEFAULT_TOGGLES };

    render(<Table items={items} toggles={toggles} setToggles={() => {}} toggleTrigger={() => {}} />);

    const tableEntries = await screen.findAllByTestId('table-entry');
    expect(tableEntries.length).toEqual(items.length);
  });
});
