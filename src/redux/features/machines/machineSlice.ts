import { createSlice } from "@reduxjs/toolkit";
import {
	createMachine,
	deleteMachine,
	fetchMachines,
	fetchMachinesNoPaginated,
	updateMachine,
} from "./machineThunks";
import type { MachineState } from "./machineTypes";

const initialState: MachineState = {
	items: [],
	selected: null,
	total: 0,
	page: 1,
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
			})
			.addCase(fetchMachines.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Error al obtener máquinas";
			})
			.addCase(fetchMachinesNoPaginated.fulfilled, (state, action) => {
				state.items = action.payload;
			})
			.addCase(createMachine.fulfilled, (state, action) => {
				state.items.push(action.payload);
			})
			.addCase(updateMachine.fulfilled, (state, action) => {
				const index = state.items.findIndex((m) => m.id === action.payload.id);
				if (index !== -1) state.items[index] = action.payload;
			})
			.addCase(deleteMachine.fulfilled, (state, action) => {
				state.items = state.items.filter((m) => m.id !== action.payload);
			});
	},
});

export const { selectMachine, clearSelectedMachine } = machineSlice.actions;
export default machineSlice.reducer;
