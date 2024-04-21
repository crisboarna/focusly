import { renderHook, act } from '@testing-library/react-hooks';
import { expect, vi, describe, afterEach, it } from 'vitest';
import { useDomainsEnabled } from '@/utils/hooks/useDomainsEnabled';
import { domainsEnabled } from '@/utils/storage';

describe('useDomainsEnabled', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize the state with the value from storage', async () => {
    const mockDomains = [{ domain: 'example.com', toggles: DEFAULT_TOGGLES }];
    const getValueSpy = vi.spyOn(domainsEnabled, 'getValue');
    getValueSpy.mockReturnValueOnce(Promise.resolve(mockDomains));

    const { result, waitForNextUpdate } = renderHook(() => useDomainsEnabled());

    await waitForNextUpdate();

    expect(result.current[0]).toEqual(mockDomains);
  });

  it('should update the storage when the state changes', async () => {
    const mockDomains = [{ domain: 'example.com', toggles: DEFAULT_TOGGLES }];
    const setValueSpy = vi.spyOn(domainsEnabled, 'setValue');
    setValueSpy.mockReturnValueOnce(Promise.resolve());

    const { result, waitForNextUpdate } = renderHook(() => useDomainsEnabled());

    await waitForNextUpdate();

    act(() => {
      result.current[1](mockDomains);
    });

    expect(domainsEnabled.setValue).toHaveBeenCalledWith(mockDomains);
  });
});
