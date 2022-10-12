import { act, renderHook } from '@testing-library/react-hooks';
import { UseInputFormat, useInputFormat } from '../useInputFormat';

describe('useInputFormat tests', () => {
  it('should have active index based on position of _ for initial render', () => {
    const { result } = renderHook(() => useInputFormat('/-__-_/', '213'));
    expect(result.current.activeIndex).toEqual(2);
    const { result: result2 } = renderHook(() =>
      useInputFormat('__-_/', '213')
    );
    expect(result2.current.activeIndex).toEqual(0);
  });

  it('should have correct formatted input value', () => {
    const { result } = renderHook(() => useInputFormat('/-__-_/', '213'));
    expect(result.current.inputFormattedValue).toEqual('/-21-3/');
    expect(result.current.inputFormat).toEqual('/-__-_/'.split(''));
  });

  it('should change active index to find next input based on the symbols', () => {
    const { result } = renderHook(() => useInputFormat('/-__-_/', '213'));
    expect(result.current.activeIndex).toEqual(2);
    act(() => {
      result.current.nextActiveInputIndex(+1);
    });
    expect(result.current.activeIndex).toEqual(3);
    act(() => {
      result.current.nextActiveInputIndex(+1);
    });
    expect(result.current.activeIndex).toEqual(5);
    act(() => {
      result.current.nextActiveInputIndex(-1);
      result.current.nextActiveInputIndex(-1);
    });
    expect(result.current.activeIndex).toEqual(2);
  });

  it('should change value at active index and return new value', () => {
    const { result } = renderHook(() => useInputFormat('/-__-_/', ''));
    expect(result.current.activeIndex).toEqual(2);
    expect(result.current.changeValueAtActiveIndex('3')).toEqual('/-3_-_/');
    act(() => {
      result.current.nextActiveInputIndex(+1);
      result.current.nextActiveInputIndex(+1);
    });
    expect(result.current.changeValueAtActiveIndex('3')).toEqual('/-__-3/');

    const { result: result2 } = renderHook(() =>
      useInputFormat('/-__-_/', '098')
    );

    expect(result2.current.activeIndex).toEqual(2);
    expect(result2.current.changeValueAtActiveIndex('3')).toEqual('/-39-8/');
    act(() => {
      result2.current.nextActiveInputIndex(+1);
      result2.current.nextActiveInputIndex(+1);
    });
    expect(result2.current.changeValueAtActiveIndex('3')).toEqual('/-09-3/');
  });

  it('should change active index based on the input focus', () => {
    const mockFocusEvent = { target: { select: () => {} } } as React.FocusEvent<
      HTMLInputElement
    >;
    const { result } = renderHook(() => useInputFormat('____', ''));
    expect(result.current.activeIndex).toEqual(0);
    act(() => {
      result.current.onInputFocus(mockFocusEvent, 2);
    });
    expect(result.current.activeIndex).toEqual(2);
    act(() => {
      result.current.onInputFocus(mockFocusEvent, 3);
    });
    expect(result.current.activeIndex).toEqual(3);
  });

  it('should test functionality of useInputFormat based on hooks props change', () => {
    const mockFocusEvent = { target: { select: () => {} } } as React.FocusEvent<
      HTMLInputElement
    >;
    const { result, rerender } = renderHook<{ value?: string }, UseInputFormat>(
      ({ value }) => useInputFormat('_-_-_-_', value ?? ''), {
        initialProps: {}
      }
    );
    expect(result.error).toBeUndefined();
    expect(result.current.activeIndex).toEqual(0);
    expect(result.current.inputFormat).toEqual('_-_-_-_'.split(''));
    expect;
    act(() => {
      result.current.nextActiveInputIndex(+1);
    });
    expect(result.current.activeIndex).toEqual(2);
    act(() => {
      result.current.onInputFocus(mockFocusEvent, 6);
      rerender({ value: '1234' });
    });
    expect(result.current.activeIndex).toEqual(6);
    expect(result.current.inputFormattedValue).toEqual('1-2-3-4');
    expect(result.current.changeValueAtActiveIndex('0')).toEqual('1-2-3-0');
  });

  it('should throw error for invalid input format', () => {
    const { result } = renderHook(() => useInputFormat('-----', ''));
    expect(result.error).toEqual(Error('Format must contain "_" because it represents an input field, e.g. "__/__/____"'))
    const { result: result2 } = renderHook(() => useInputFormat('-/--/--', ''));
    expect(result2.error).toEqual(Error('Format must contain "_" because it represents an input field, e.g. "__/__/____"'))
  })
});
