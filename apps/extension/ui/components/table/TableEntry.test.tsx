import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TableEntry from './TableEntry';

describe("TableEntry", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  });

  it("renders without crashing", () => {
    render(<TableEntry
      index={0}
      item={{ domain: 'test', toggles: DEFAULT_TOGGLES} }
      toggles={{"test":DEFAULT_TOGGLES}}
      setToggles={() =>{}}
      toggleTrigger={() => {}}
    />);
  });

  it("displays the correct domain", () => {
    render(<TableEntry
      index={0}
      item={{ domain: 'test', toggles: DEFAULT_TOGGLES} }
      toggles={{"test":DEFAULT_TOGGLES}}
      setToggles={() =>{}}
      toggleTrigger={() => {}}
    />);

    const domains = screen.getAllByText('test');
    expect(domains.length).toEqual(1);
  });

  it("displays the correct toggles", () => {
    render(<TableEntry
      index={0}
      item={{ domain: 'test', toggles: DEFAULT_TOGGLES} }
      toggles={{"test":DEFAULT_TOGGLES}}
      setToggles={() =>{}}
      toggleTrigger={() => {}}
    />);

    const checkboxes: HTMLInputElement[]  = screen.getAllByRole('checkbox');

    expect(checkboxes.length).toEqual(9);
    checkboxes.forEach((checkbox) => {
      expect(checkbox.checked).toBe(false);
    });
  });

  it("calls setToggles and toggleTrigger when toggles are clicked from default off",async () => {
    const setToggles = vi.fn();
    const toggleTrigger = vi.fn();

    render(<TableEntry
      index={0}
      item={{ domain: 'test', toggles: DEFAULT_TOGGLES} }
      toggles={{"test": DEFAULT_TOGGLES}}
      setToggles={setToggles}
      toggleTrigger={toggleTrigger}
    />);

    await Promise.all(screen.getAllByRole('checkbox').map(async (checkbox) => {
      await userEvent.click(checkbox);
      await waitFor(() => {
        expect(setToggles).toHaveBeenCalled();
        expect(toggleTrigger).toHaveBeenCalled();
      });
    }));
  });

  it("calls setToggles and toggleTrigger when toggles are clicked from default off with no toggles",async () => {
    const setToggles = vi.fn();
    const toggleTrigger = vi.fn();

    render(<TableEntry
      index={0}
      item={{ domain: 'test', toggles: DEFAULT_TOGGLES} }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toggles={{"test":{}}}
      setToggles={setToggles}
      toggleTrigger={toggleTrigger}
    />);

    await Promise.all(screen.getAllByRole('checkbox').map(async (checkbox) => {
      await userEvent.click(checkbox);
      await waitFor(() => {
        expect(setToggles).toHaveBeenCalled();
        expect(toggleTrigger).toHaveBeenCalled();
      });
    }));
  });


  it("calls setToggles and toggleTrigger when toggles are clicked from on",async () => {
    const setToggles = vi.fn();
    const toggleTrigger = vi.fn();

    const toggles: any = Object.fromEntries(
      Object.entries(DEFAULT_TOGGLES).map(([key, value]) => [key, !value])
    );

    render(<TableEntry
      index={0}
      item={{ domain: 'test', toggles}}
      toggles={{"test": toggles}}
      setToggles={setToggles}
      toggleTrigger={toggleTrigger}
    />);

    await Promise.all(screen.getAllByRole('checkbox').map(async (checkbox) => {
      await userEvent.click(checkbox);
      await waitFor(() => {
        expect(setToggles).toHaveBeenCalled();
        expect(toggleTrigger).toHaveBeenCalled();
      });
    }));
  });
});
