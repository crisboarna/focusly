import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { browser } from "wxt/browser";
import { useCurrentTab } from './useCurrentTab';

describe('useCurrentTab', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize the state with the current tab from the browser', async () => {
    const mockTab = {
      index: 1,
      highlighted: true,
      active: true,
      pinned: false,
      incognito: false,
      url: 'https://example.com',
      title: 'Example',
    };

    const getValueSpy = vi.spyOn(browser.tabs, 'query');
    getValueSpy.mockReturnValueOnce(Promise.resolve([mockTab]));

    const { result, waitForNextUpdate } = renderHook(() => useCurrentTab());

    await waitForNextUpdate();

    expect(result.current[0]).toEqual(mockTab);
  });
});
