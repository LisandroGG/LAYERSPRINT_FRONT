import axios from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Filament, FilamentInput } from "./filamentTypes";

export const fetchFilaments = createAsyncThunk(
	"filaments/fetchAll",
	async (page: number = 1) => {
		const { data } = await axios.get(`/filaments?page=${page}`);
		return data;
	},
);

export const fetchFilamentsNoPaginated = createAsyncThunk(
	"filaments/fetchAllNoPaginated",
	async () => {
		const { data } = await axios.get<Filament[]>("/filaments/all");
		return data;
	},
);

export const createFilament = createAsyncThunk(
	"filaments/create",
	async (payload: FilamentInput) => {
		const { data } = await axios.post("/filaments", payload);
		return data.filament as Filament;
	},
);

export const updateFilament = createAsyncThunk(
	"filaments/update",
	async ({ id, payload }: { id: number; payload: FilamentInput }) => {
		const { data } = await axios.put(`/filaments/${id}`, payload);
		return data.filament as Filament;
	},
);

export const deleteFilament = createAsyncThunk(
	"filaments/delete",
	async (id: number) => {
		await axios.delete(`/filaments/${id}`);
		return id;
	},
);
