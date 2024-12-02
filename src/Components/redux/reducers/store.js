// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'; // Import from Redux Toolkit
import { persistStore, persistReducer } from 'redux-persist'; // Correct imports
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for React Native
import rootReducer from './rootReducer'; // Make sure rootReducer is properly set up
import { FLUSH, REGISTER, REHYDRATE, PAUSE, PURGE, PERSIST } from 'redux-persist'; // Import these constants correctly
import gameSlice from './gameSlice'; // Import the gameSlice reducer


// Configure redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage in React Native
  whitelist: ['game'], // Specify which reducers you want to persist
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PURGE, PERSIST],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);
