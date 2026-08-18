import filamentReducer from "@redux/features/filaments/filamentSlice";
import machineReducer from "@redux/features/machines/machineSlice";
import productReducer from "@redux/features/products/productSlice";
import settingsReducer from "@redux/features/settings/settingsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		machines: machineReducer,
		filaments: filamentReducer,
		products: productReducer,
		settings: settingsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
