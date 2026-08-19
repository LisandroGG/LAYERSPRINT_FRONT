import useCrudDispatch from "@hooks/useCrudDispatch";
import {
	deleteProduct,
	fetchProductsNoPaginated,
} from "@redux/features/products/productThunks";
import type { Product } from "@redux/features/products/productTypes";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import ProductModal from "../Products/modals/ProductModal";
import ProductCard from "./ProductCard";

export default function ProductsPage() {
	const dispatch = useAppDispatch();
	const { run } = useCrudDispatch();
	const { items: products, loading } = useAppSelector(
		(state) => state.products,
	);

	const [modalOpen, setModalOpen] = useState(false);
	const [productToEdit, setProductToEdit] = useState<Product | null>(null);

	useEffect(() => {
		dispatch(fetchProductsNoPaginated());
	}, [dispatch]);

	function handleCreate() {
		setProductToEdit(null);
		setModalOpen(true);
	}

	function handleEdit(product: Product) {
		setProductToEdit(product);
		setModalOpen(true);
	}

	async function handleDelete(product: Product) {
		const confirmed = window.confirm(`¿Eliminar "${product.name}"?`);
		if (!confirmed) return;
		await run(deleteProduct, product.id);
	}

	return (
		<div>
			<PageHeader
				title="Productos"
				action={
					<button
						type="button"
						onClick={handleCreate}
						className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
					>
						+ Nuevo producto
					</button>
				}
			/>

			<div className="p-6">
				{loading && <p className="font-mono text-sm text-muted">Cargando...</p>}

				{!loading && products.length === 0 && (
					<div className="rounded-xl border border-dashed border-border bg-surface/50 p-10 text-center">
						<p className="font-display text-muted">
							Todavía no cargaste ningún producto.
						</p>
						<button
							type="button"
							onClick={handleCreate}
							className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
						>
							Cargar el primero
						</button>
					</div>
				)}

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					))}
				</div>
			</div>

			<ProductModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				productToEdit={productToEdit}
			/>
		</div>
	);
}
