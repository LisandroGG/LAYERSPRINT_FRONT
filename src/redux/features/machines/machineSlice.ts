import { createSlice } from "@reduxjs/toolkit";
import {
	deleteMachine,
	fetchMachines,
	fetchMachinesNoPaginated,
} from "./machineThunks";
import type { MachineState } from "./machineTypes";

const initialState: MachineState = {
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

const machineSlice = createSlice({
	name: "machines",
	initialState,
	reducers: {
		selectMachine: (state, action) => {
			state.selected = action.payload;
		},
		clearSelectedMachine: (state) => {
			state.selected = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMachines.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchMachines.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.data;
				state.total = action.payload.total;
				state.page = action.payload.page;
				state.limit = action.payload.limit;
				state.totalPages = action.payload.totalPages;
				state.hasNext = action.payload.hasNext;
				state.hasPrev = action.payload.hasPrev;
			})
			.addCase(fetchMachines.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Error al obtener máquinas";
			})
			.addCase(fetchMachinesNoPaginated.fulfilled, (state, action) => {
				state.items = action.payload;
			})
			.addCase(deleteMachine.fulfilled, (state, action) => {
				state.items = state.items.filter((m) => m.id !== action.payload.id);
			});
	},
});

export const { selectMachine, clearSelectedMachine } = machineSlice.actions;
export default machineSlice.reducer;
