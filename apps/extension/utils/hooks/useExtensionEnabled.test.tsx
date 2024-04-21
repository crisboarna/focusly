import { renderHook, act } from '@testing-library/react-hooks';
import { expect, vi, describe, afterEach, it } from 'vitest';
import { useExtensionEnabled } from '@/utils/hooks/useExtensionEnabled';
import { extensionEnabled } from '@/utils/storage';

describe('useExtensionEnabled', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize the state with the value from storage', async () => {
    const getValueSpy = vi.spyOn(extensionEnabled, 'getValue');
    getValueSpy.mockReturnValueOnce(Promise.resolve(true));

    const { result, waitForNextUpdate } = renderHook(() => useExtensionEnabled());

    await waitForNextUpdate();

    expect(result.current[0]).toBe(true);
  });

  it('should update the storage when the state changes', async () => {
    const getValueSpy = vi.spyOn(extensionEnabled, 'getValue');
    getValueSpy.mockReturnValueOnce(Promise.resolve(true));
    const setValueSpy = vi.spyOn(extensionEnabled, 'setValue');
    setValueSpy.mockReturnValueOnce(Promise.resolve());

    const { result, waitForNextUpdate } = renderHook(() => useExtensionEnabled());

    await waitForNextUpdate();

    act(() => {
      result.current[1](false);
    });

    expect(extensionEnabled.setValue).toHaveBeenCalledWith(false);
  });

  it('should set up and clean up the watch listener', async () => {
    const getValueSpy = vi.spyOn(extensionEnabled, 'getValue');
    getValueSpy.mockReturnValueOnce(Promise.resolve(true));

    const unwatchMock = vi.fn();
    const watchSpy = vi.spyOn(extensionEnabled, 'watch');
    watchSpy.mockReturnValueOnce(unwatchMock);

    const { unmount } = renderHook(() => useExtensionEnabled());

    expect(extensionEnabled.watch).toHaveBeenCalled();

    unmount();

    expect(unwatchMock).toHaveBeenCalled();
  });
});
