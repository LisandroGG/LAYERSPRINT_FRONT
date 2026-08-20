import Button from "@components/Common/Button";
import ImageLightbox from "@components/ImageLightbox/ImageLightbox";
import type { Product } from "@redux/features/products/productTypes";
import { formatMinutesToHours } from "@utils/formatTime";
import { useState } from "react";

type ProductCardProps = {
	product: Product;
	onEdit: (product: Product) => void;
	onDelete: (product: Product) => void;
	onViewPrice: (product: Product) => void;
};

const ProductCard = ({
	product,
	onEdit,
	onDelete,
	onViewPrice,
}: ProductCardProps) => {
	const [lightboxOpen, setLightboxOpen] = useState(false);

	return (
		<div className="overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-brand-light/50">
			<div className="flex h-36 items-center justify-center bg-ink">
				{product.imageUrl ? (
					<button
						type="button"
						onClick={() => setLightboxOpen(true)}
						className="h-full w-full cursor-pointer"
					>
						<img
							src={product.imageUrl}
							alt={product.name}
							className="h-full w-full object-cover"
						/>
					</button>
				) : (
					<span className="text-xs text-muted">Sin imagen</span>
				)}
			</div>

			<div className="p-4">
				<h3 className="font-display text-base font-semibold text-white">
					{product.name}
				</h3>
				<div className="mt-2 flex items-center justify-between">
					<button
						type="button"
						onClick={() => onViewPrice(product)}
						className="cursor-pointer text-xs text-muted underline decoration-dotted hover:text-brand-light"
					>
						{product.weight}gr en {product.ProductFilaments?.length ?? 0}{" "}
						filamento(s)
					</button>
					<p className="text-sm text-muted">
						{formatMinutesToHours(product.timeToPrint)}
					</p>
				</div>

				{product.cost && (
					<div className="mt-3 flex items-baseline justify-between">
						<span className="text-xs text-muted">Costo</span>
						<span className="font-mono text-lg font-semibold text-accent">
							$
							{product.cost.total.toLocaleString("es-AR", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</span>
					</div>
				)}

				<div className="mt-4 flex gap-2">
					<Button
						onClick={() => onViewPrice(product)}
						size="sm"
						className="flex-1"
					>
						Ver precio
					</Button>
					<Button onClick={() => onEdit(product)} variant="outline" size="sm">
						Editar
					</Button>
					<Button onClick={() => onDelete(product)} variant="danger" size="sm">
						Eliminar
					</Button>
				</div>
			</div>

			{lightboxOpen && product.imageUrl && (
				<ImageLightbox
					src={product.imageUrl}
					alt={product.name}
					onClose={() => setLightboxOpen(false)}
				/>
			)}
		</div>
	);
};

export default ProductCard;
