import type { Product } from "@redux/features/products/productTypes";
import { formatMinutesToHours } from "@utils/formatTime";

type ProductCardProps = {
	product: Product;
	onEdit: (product: Product) => void;
	onDelete: (product: Product) => void;
};

export default function ProductCard({
	product,
	onEdit,
	onDelete,
}: ProductCardProps) {
	return (
		<div className="overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-brand-light/50">
			<div className="flex h-36 items-center justify-center bg-ink">
				{product.imageUrl ? (
					<img
						src={product.imageUrl}
						alt={product.name}
						className="h-full w-full object-cover"
					/>
				) : (
					<span className="text-xs text-muted">Sin imagen</span>
				)}
			</div>

			<div className="p-4">
				<h3 className="font-display text-base font-semibold text-white">
					{product.name}
				</h3>
				<p className="text-sm text-muted">
					{product.weight}g · {formatMinutesToHours(product.timeToPrint)}
				</p>

				{product.cost && (
					<div className="mt-3 flex items-baseline justify-between">
						<span className="text-xs text-muted">Costo</span>
						<span className="font-mono text-lg font-semibold text-accent">
							${product.cost.total.toLocaleString("es-AR")}
						</span>
					</div>
				)}

				<div className="mt-4 flex gap-2">
					<button
						type="button"
						onClick={() => onEdit(product)}
						className="flex-1 rounded-lg border border-border py-1.5 text-sm text-white hover:bg-surface-hover"
					>
						Editar
					</button>
					<button
						type="button"
						onClick={() => onDelete(product)}
						className="flex-1 rounded-lg border border-danger/40 py-1.5 text-sm text-danger hover:bg-danger/10"
					>
						Eliminar
					</button>
				</div>
			</div>
		</div>
	);
}
