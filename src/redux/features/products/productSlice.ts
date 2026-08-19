import { createSlice } from "@reduxjs/toolkit";
import {
	createProduct,
	deleteProduct,
	fetchProductById,
	fetchProducts,
	fetchProductsNoPaginated,
	updateProduct,
} from "./productThunks";
import type { ProductState } from "./productTypes";

const initialState: ProductState = {
	items: [],
	selected: null,
	total: 0,
	page: 1,
	loading: false,
	error: null,
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		selectProduct: (state, action) => {
			state.selected = action.payload;
		},
		clearSelectedProduct: (state) => {
			state.selected = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.data;
				state.total = action.payload.total;
				state.page = action.payload.page;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Error al obtener productos";
			})
			.addCase(fetchProductsNoPaginated.fulfilled, (state, action) => {
				state.items = action.payload;
			})
			.addCase(fetchProductById.fulfilled, (state, action) => {
				state.selected = action.payload;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.items.push(action.payload.product);
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				const index = state.items.findIndex(
					(p) => p.id === action.payload.product.id,
				);
				if (index !== -1) state.items[index] = action.payload.product;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.items = state.items.filter((p) => p.id !== action.payload.id);
			});
	},
});

export const { selectProduct, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
