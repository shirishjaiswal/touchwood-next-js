"use client";

import { useState } from "react";

let setGlobalLoadingState: ((loading: boolean) => void) | null = null;

export const useScreenLoading = () => {
  const [isLoading, _setLoading] = useState(false);

  setGlobalLoadingState = _setLoading;

  return { isLoading };
};

export const setScreenLoading = (loading: boolean) => {
  if (setGlobalLoadingState) {
    setGlobalLoadingState(loading);
  }
};
