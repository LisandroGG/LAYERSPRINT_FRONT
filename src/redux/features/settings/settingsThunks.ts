import axios from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Settings } from "./settingsTypes";

export const fetchSettings = createAsyncThunk("settings/fetch", async () => {
	const { data } = await axios.get<Settings>("/settings");
	return data;
});

export const updateSettings = createAsyncThunk(
	"settings/update",
	async (kwhPrice: number) => {
		const { data } = await axios.put<Settings>("/settings", { kwhPrice });
		return data;
	},
);
