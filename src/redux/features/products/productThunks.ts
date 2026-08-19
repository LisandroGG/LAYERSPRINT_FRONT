import axios from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product, ProductInput } from "./productTypes";

function buildProductFormData(payload: ProductInput) {
	const formData = new FormData();
	formData.append("name", payload.name);
	formData.append("timeToPrint", String(payload.timeToPrint));
	formData.append("laborCost", String(payload.laborCost));
	formData.append("extras", String(payload.extras));
	formData.append("machineId", String(payload.machineId));
	formData.append("filaments", JSON.stringify(payload.filaments));

	if (payload.image) {
		formData.append("image", payload.image);
	}

	return formData;
}

export const fetchProducts = createAsyncThunk(
	"products/fetchAll",
	async (page: number = 1) => {
		const { data } = await axios.get(`/products?page=${page}`);
		return data;
	},
);

export const fetchProductsNoPaginated = createAsyncThunk(
	"products/fetchAllNoPaginated",
	async () => {
		const { data } = await axios.get<Product[]>("/products/not-paginated");
		return data;
	},
);

export const fetchProductById = createAsyncThunk(
	"products/fetchOne",
	async (id: number) => {
		const { data } = await axios.get<Product>(`/products/${id}`);
		return data;
	},
);

export const createProduct = createAsyncThunk(
	"products/create",
	async (payload: ProductInput) => {
		const formData = buildProductFormData(payload);
		const { data } = await axios.post("/products", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return data as { product: Product; message: string };
	},
);

export const updateProduct = createAsyncThunk(
	"products/update",
	async ({ id, payload }: { id: number; payload: ProductInput }) => {
		const formData = buildProductFormData(payload);
		const { data } = await axios.put(`/products/${id}`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return data as { product: Product; message: string };
	},
);

export const deleteProduct = createAsyncThunk(
	"products/delete",
	async (id: number) => {
		const { data } = await axios.delete(`/products/${id}`);
		return { id, message: data.message as string };
	},
);
