'use client';

import { useState } from 'react';

let setGlobalLoadingState: ((loading: boolean) => void) | null = null;

export const useGlobalLoading = () => {
  const [isLoading, _setLoading] = useState(false);

  // Store setter globally for external access
  setGlobalLoadingState = _setLoading;

  return { isLoading };
};

export const setGlobalLoading = (loading: boolean) => {
  if (setGlobalLoadingState) {
    setGlobalLoadingState(loading);
  } else {
    console.warn('Global loading state is not ready yet.');
  }
};
