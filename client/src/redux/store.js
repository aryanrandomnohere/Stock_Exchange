// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import walletReducer from './wallet/walletSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const rootReducer = combineReducers({
    user: userReducer,
    wallet: walletReducer,
});


const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
