// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'; 
import { persistStore, persistReducer } from 'redux-persist'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import rootReducer from './rootReducer'; 
import { FLUSH, REGISTER, REHYDRATE, PAUSE, PURGE, PERSIST } from 'redux-persist'; 
import gameSlice from './gameSlice'; 

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, 
  whitelist: ['game'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PURGE, PERSIST],
      },
    }),
});

export const persistor = persistStore(store);
