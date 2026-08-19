import { useState } from 'react'
import { useAppSelector } from '@redux/hooks'
import useCrudDispatch from '@hooks/useCrudDispatch'
import usePagination from '@hooks/usePagination'
import { fetchProducts, deleteProduct } from '@redux/features/products/productThunks'
import type { Product } from '@redux/features/products/productTypes'
import PageHeader from '@components/PageHeader/PageHeader'
import Pagination from '@components/Common/Pagination'
import ProductCard from './ProductCard'
import ProductModal from './modals/ProductModal'
import ProductPriceModal from './modals/ProductPriceModal'

export default function ProductsPage() {
	const { run } = useCrudDispatch()
	const { items: products } = useAppSelector((state) => state.products)
	const { page, totalPages, hasNext, hasPrev, loading, goToPage } = usePagination(
		(state) => state.products,
		fetchProducts,
	)

	const [modalOpen, setModalOpen] = useState(false)
	const [productToEdit, setProductToEdit] = useState<Product | null>(null)

	const [priceModalOpen, setPriceModalOpen] = useState(false)
	const [productToPrice, setProductToPrice] = useState<Product | null>(null)

	function handleCreate() {
		setProductToEdit(null)
		setModalOpen(true)
	}

	function handleEdit(product: Product) {
		setProductToEdit(product)
		setModalOpen(true)
	}

	function handleViewPrice(product: Product) {
		setProductToPrice(product)
		setPriceModalOpen(true)
	}

	async function handleDelete(product: Product) {
		const confirmed = window.confirm(`¿Eliminar "${product.name}"?`)
		if (!confirmed) return
		await run(deleteProduct, product.id)
	}

	return (
		<div>
			<PageHeader
				title="Productos"
				action={
					<button
						onClick={handleCreate}
						className="cursor-pointer rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
					>
						+ Nuevo producto
					</button>
				}
			/>

			<div className="p-6">
				{loading && <p className="font-mono text-sm text-muted">Cargando...</p>}

				{!loading && products.length === 0 && (
					<div className="rounded-xl border border-dashed border-border bg-surface/50 p-10 text-center">
						<p className="font-display text-muted">Todavía no cargaste ningún producto.</p>
						<button
							onClick={handleCreate}
							className="mt-4 cursor-pointer rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
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
							onViewPrice={handleViewPrice}
						/>
					))}
				</div>

				{!loading && products.length > 0 && (
					<div className="mt-6">
						<Pagination
							page={page}
							totalPages={totalPages}
							hasNext={hasNext}
							hasPrev={hasPrev}
							onPageChange={goToPage}
						/>
					</div>
				)}
			</div>

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
		</div>
	)
}
