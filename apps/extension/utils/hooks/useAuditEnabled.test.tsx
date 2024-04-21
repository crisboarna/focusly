import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuditEnabled } from '@/utils/hooks/useAuditEnabled';
import { auditEnabled } from '@/utils/storage.ts';

describe('useAuditEnabled', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize the state with the value from storage', async () => {
    const getValueSpy = vi.spyOn(auditEnabled, 'getValue');
    getValueSpy.mockReturnValueOnce(Promise.resolve(true));

    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => useAuditEnabled());

    // Wait for the hook to fetch the initial value
    await waitForNextUpdate();

    // Check if the initial state is set correctly
    expect(result.current[0]).toBe(true);
  });

  it('should update the state when the storage value changes', async () => {
    const getValueSpy = vi.spyOn(auditEnabled, 'getValue');
    getValueSpy.mockReturnValueOnce(Promise.resolve(false));

    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => useAuditEnabled());

    // Wait for the hook to fetch the initial value
    await waitForNextUpdate();

    act(() => {
      auditEnabled.watch(() => true);
    })

    expect(result.current[0]).toBe(false);
  });

  it('should update the storage value when the state changes', async () => {
    const getValueSpy = vi.spyOn(auditEnabled, 'setValue');
    getValueSpy.mockReturnValueOnce(Promise.resolve());

    const { result, waitForNextUpdate } = renderHook(() => useAuditEnabled());

    await waitForNextUpdate();

    // Update the state to true
    act(() => {
      result.current[1](true);
    });

    // Check if setValue was called with the correct value
    expect(auditEnabled.setValue).toHaveBeenCalledWith(true);
  });
});
