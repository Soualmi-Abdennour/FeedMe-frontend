import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import userReducer from "@/features/user/store/user.slice";
import authReducer from "@/features/auth/store/auth.slice";
import onboardingReducer from "@/features/onboarding/store/onboarding.slice";
import { qaApi } from "@/features/Q&A/store/qa.api"; // 👈 إضافة جديدة
import { useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// RTK QUERY SETUP
export const fetchAPI = createApi({
  reducerPath: "api",
  tagTypes: ["Products", "User", "Onboarding", "Questions", "Answers"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.authentication.authentication?.jwtToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "authentication"],
};

const rootReducer = combineReducers({
  [fetchAPI.reducerPath]: fetchAPI.reducer,
  [qaApi.reducerPath]: qaApi.reducer, // 👈 إضافة جديدة
  user: userReducer,
  authentication: authReducer,
  onboarding: onboardingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(fetchAPI.middleware, qaApi.middleware), // 👈 إضافة جديدة
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
