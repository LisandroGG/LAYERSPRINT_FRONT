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
	limit: 9,
	totalPages: 0,
	hasNext: false,
	hasPrev: false,
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
				state.limit = action.payload.limit;
				state.totalPages = action.payload.totalPages;
				state.hasNext = action.payload.hasNext;
				state.hasPrev = action.payload.hasPrev;
			})
			.addCase(fetchFilaments.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Error al obtener filamentos";
			})
			.addCase(fetchFilamentsNoPaginated.fulfilled, (state, action) => {
				state.items = action.payload;
			})
			.addCase(createFilament.fulfilled, (state, action) => {
				state.items.push(action.payload.filament);
			})
			.addCase(updateFilament.fulfilled, (state, action) => {
				const index = state.items.findIndex(
					(f) => f.id === action.payload.filament.id,
				);
				if (index !== -1) state.items[index] = action.payload.filament;
			})
			.addCase(deleteFilament.fulfilled, (state, action) => {
				state.items = state.items.filter((f) => f.id !== action.payload.id);
			});
	},
});

export const { selectFilament, clearSelectedFilament } = filamentSlice.actions;
export default filamentSlice.reducer;
