import { createSlice } from "@reduxjs/toolkit";
import { fetchSettings, updateSettings } from "./settingsThunks";
import type { SettingsState } from "./settingsTypes";

const initialState: SettingsState = {
	data: null,
	loading: false,
	error: null,
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSettings.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchSettings.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchSettings.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Error al obtener configuración";
			})
			.addCase(updateSettings.fulfilled, (state, action) => {
				state.data = action.payload;
			});
	},
});

export default settingsSlice.reducer;
