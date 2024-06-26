// walletSelector.js
import { createSelector } from '@reduxjs/toolkit';

const selectWalletState = (state) => state.wallet;

export const selectWallet = createSelector(
  [selectWalletState],
  (walletState) => walletState.wallet
);

export const selectWalletLoading = createSelector(
  [selectWalletState],
  (walletState) => walletState.loading
);

export const selectWalletError = createSelector(
  [selectWalletState],
  (walletState) => walletState.error
);
