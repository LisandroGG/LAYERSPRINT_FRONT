import { createSlice } from "@reduxjs/toolkit";
import {
	createFilament,
	deleteFilament,
	fetchFilaments,
	fetchFilamentsNoPaginated,
	updateFilament,
} from "./filamentThunks";
import type { FilamentState } from "./filamentTypes";

const initialState: FilamentState = {
	items: [],
	selected: null,
	total: 0,
	page: 1,
	loading: false,
	error: null,
};

const filamentSlice = createSlice({
	name: "filaments",
	initialState,
	reducers: {
		selectFilament: (state, action) => {
			state.selected = action.payload;
		},
		clearSelectedFilament: (state) => {
			state.selected = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFilaments.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchFilaments.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.data;
				state.total = action.payload.total;
				state.page = action.payload.page;
			})
			.addCase(fetchFilaments.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Error al obtener filamentos";
			})
			.addCase(fetchFilamentsNoPaginated.fulfilled, (state, action) => {
				state.items = action.payload;
			})
			.addCase(createFilament.fulfilled, (state, action) => {
				state.items.push(action.payload);
			})
			.addCase(updateFilament.fulfilled, (state, action) => {
				const index = state.items.findIndex((f) => f.id === action.payload.id);
				if (index !== -1) state.items[index] = action.payload;
			})
			.addCase(deleteFilament.fulfilled, (state, action) => {
				state.items = state.items.filter((f) => f.id !== action.payload);
			});
	},
});

export const { selectFilament, clearSelectedFilament } = filamentSlice.actions;
export default filamentSlice.reducer;
