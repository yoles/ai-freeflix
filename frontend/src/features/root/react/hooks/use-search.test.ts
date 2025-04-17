import { act } from "@testing-library/react";

import { renderHook } from '@testing-library/react';
import { test, expect } from 'vitest';
import { useSearch } from './use-search';

/**
 * We dont want to test the focus effect on the input,
 * Because it's an implementation detail.
 * The test would be fragile (testing the DOM)
 * The benefit would be limited compared to the effort
 */

test('useSearch hook manages state correctly', () => {
  const { result } = renderHook(() => useSearch());
  
  // Check initial state
  expect(result.current.isSearchOpen).toBe(false);
  expect(result.current.searchQuery).toBe('');
  
  // Test toggleSearch
  act(() => {
    result.current.toggleSearch();
  });
  expect(result.current.isSearchOpen).toBe(true);
  
  // Test handleSearch
  act(() => {
    result.current.handleSearch('test query');
  });
  expect(result.current.searchQuery).toBe('test query');
}); 