import Button from "@components/Common/Button";
import ConfirmModal from "@components/Common/ConfirmModal";
import Loading from "@components/Common/Loading";
import NotFind from "@components/Common/NotFind";
import Pagination from "@components/Common/Pagination";
import SearchInput from "@components/Common/SearchInput";
import PageHeader from "@components/PageHeader/PageHeader";
import useCrudDispatch from "@hooks/useCrudDispatch";
import usePagination from "@hooks/usePagination";
import {
	deleteProduct,
	fetchProducts,
} from "@redux/features/products/productThunks";
import type { Product } from "@redux/features/products/productTypes";
import { useAppSelector } from "@redux/hooks";
import { useState } from "react";
import ProductModal from "./modals/ProductModal";
import ProductPriceModal from "./modals/ProductPriceModal";
import ProductCard from "./ProductCard";

const ProductsPage = () => {
	const { run } = useCrudDispatch();
	const { items: products } = useAppSelector((state) => state.products);
	const {
		page,
		totalPages,
		hasNext,
		hasPrev,
		loading,
		goToPage,
		applyFilters,
	} = usePagination((state) => state.products, fetchProducts);

	const [modalOpen, setModalOpen] = useState(false);
	const [productToEdit, setProductToEdit] = useState<Product | null>(null);
	const [productToDelete, setProductToDelete] = useState<Product | null>(null);
	const [deleting, setDeleting] = useState(false);

	const [priceModalOpen, setPriceModalOpen] = useState(false);
	const [productToPrice, setProductToPrice] = useState<Product | null>(null);

	const handleSearch = (value: string) => {
		applyFilters(value ? { search: value } : {});
	};

	const handleCreate = () => {
		setProductToEdit(null);
		setModalOpen(true);
	};

	const handleEdit = (product: Product) => {
		setProductToEdit(product);
		setModalOpen(true);
	};

	const handleViewPrice = (product: Product) => {
		setProductToPrice(product);
		setPriceModalOpen(true);
	};

	const handleDelete = (product: Product) => {
		setProductToDelete(product);
	};

	const confirmDelete = async () => {
		if (!productToDelete) return;
		setDeleting(true);
		await run(deleteProduct, productToDelete.id);
		setDeleting(false);
		setProductToDelete(null);
	};

	return (
		<div className="flex h-full flex-col">
			<PageHeader title="Productos">
				<SearchInput placeholder="Buscar producto..." onSearch={handleSearch} />
				<Button onClick={handleCreate}>+ Nuevo producto</Button>
			</PageHeader>

			<div className="flex-1 overflow-y-auto p-6">
				{loading && products.length === 0 && <Loading />}

				{!loading && products.length === 0 && <NotFind entity="producto" />}

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onEdit={handleEdit}
							onDelete={handleDelete}
							onViewPrice={handleViewPrice}
						/>
					))}
				</div>
			</div>

			{!loading && products.length > 0 && (
				<div className="border-t border-border px-6 py-4">
					<Pagination
						page={page}
						totalPages={totalPages}
						hasNext={hasNext}
						hasPrev={hasPrev}
						onPageChange={goToPage}
					/>
				</div>
			)}

			<ProductModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				productToEdit={productToEdit}
			/>
			<ProductPriceModal
				open={priceModalOpen}
				onClose={() => setPriceModalOpen(false)}
				product={productToPrice}
			/>
			<ConfirmModal
				open={!!productToDelete}
				title="Eliminar producto"
				message={`¿Eliminar "${productToDelete?.name}"? Esta acción no se puede deshacer.`}
				onConfirm={confirmDelete}
				onCancel={() => setProductToDelete(null)}
				loading={deleting}
			/>
		</div>
	);
};

export default ProductsPage;
