import { configureStore } from '@reduxjs/toolkit';

import { housesReducer } from './houses-slice';
import { authReducer } from './auth-slice';
const store = configureStore({
  reducer: { houses: housesReducer, auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
