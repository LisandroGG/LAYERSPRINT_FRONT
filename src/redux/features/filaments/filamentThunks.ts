import axios from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Filament, FilamentInput } from "./filamentTypes";

export const fetchFilaments = createAsyncThunk(
	"filaments/fetchAll",
	async (params: Record<string, unknown> = {}) => {
		const query = new URLSearchParams(params as Record<string, string>).toString();
		const { data } = await axios.get(`/filaments?${query}`);
		return data;
	},
);

export const fetchFilamentsNoPaginated = createAsyncThunk(
	"filaments/fetchAllNoPaginated",
	async () => {
		const { data } = await axios.get<Filament[]>("/filaments/not-paginated");
		return data;
	},
);

export const createFilament = createAsyncThunk(
	"filaments/create",
	async (payload: FilamentInput) => {
		const { data } = await axios.post("/filaments", payload);
		return data as { filament: Filament; message: string };
	},
);

export const updateFilament = createAsyncThunk(
	"filaments/update",
	async ({ id, payload }: { id: number; payload: FilamentInput }) => {
		const { data } = await axios.put(`/filaments/${id}`, payload);
		return data as { filament: Filament; message: string };
	},
);

export const deleteFilament = createAsyncThunk(
	"filaments/delete",
	async (id: number) => {
		const { data } = await axios.delete(`/filaments/${id}`);
		return { id, message: data.message as string };
	},
);
