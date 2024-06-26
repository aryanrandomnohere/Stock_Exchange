import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { selectCurrentUser } from '../user/userSelectors';

export const fetchWallet = createAsyncThunk('wallet/fetchWallet', async (_, { getState }) => {
  const state = getState();
  const currentUser = selectCurrentUser(state);

  if (!currentUser) {
    throw new Error('No current user found');
  }

  const response = await fetch(`http://localhost:3000/users/${currentUser.user._id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch wallet');
  }

  return data.wallet;
});

const initialState = {
  wallet: 0,
  error: null,
  loading: false,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.wallet = action.payload;
        state.loading = false;
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      });
  },
});

export default walletSlice.reducer;
