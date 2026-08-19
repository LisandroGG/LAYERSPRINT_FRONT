import axios from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Machine, MachineInput } from "./machineTypes";

export const fetchMachines = createAsyncThunk(
	"machines/fetchAll",
	async (page: number = 1) => {
		const { data } = await axios.get(`/machines?page=${page}`);
		return data;
	},
);

export const fetchMachinesNoPaginated = createAsyncThunk(
	"machines/fetchAllNoPaginated",
	async () => {
		const { data } = await axios.get<Machine[]>("/machines/not-paginated");
		return data;
	},
);

export const createMachine = createAsyncThunk(
	"machines/create",
	async (payload: MachineInput) => {
		const { data } = await axios.post("/machines", payload);
		return data as { machine: Machine; message: string };
	},
);

export const updateMachine = createAsyncThunk(
	"machines/update",
	async ({ id, payload }: { id: number; payload: MachineInput }) => {
		const { data } = await axios.put(`/machines/${id}`, payload);
		return data as { machine: Machine; message: string };
	},
);

export const deleteMachine = createAsyncThunk(
	"machines/delete",
	async (id: number) => {
		const { data } = await axios.delete(`/machines/${id}`);
		return { id, message: data.message as string };
	},
);
