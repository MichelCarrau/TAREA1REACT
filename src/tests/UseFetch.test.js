import { renderHook, waitFor } from '@testing-library/react';
import useFetch from '../hooks/UseFetch';

global.fetch = jest.fn();

describe('useFetch', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('inicia con loading true y data null', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ test: 'ok' }),
    });

    const { result } = renderHook(() => useFetch('https://example.com'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('carga datos correctamente', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ test: 'ok' }),
    });

    const { result } = renderHook(() => useFetch('https://example.com'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual({ test: 'ok' });
    expect(result.current.error).toBeNull();
  });

  test('maneja errores de red', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFetch('https://example.com'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
  });

  test('no hace fetch si la URL es null', () => {
    const { result } = renderHook(() => useFetch(null));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
  });
});