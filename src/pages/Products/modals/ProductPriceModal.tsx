import { MARGIN_TIERS } from "@constants/marginTiers";
import type { Product } from "@redux/features/products/productTypes";
import { formatMinutesToHours } from "@utils/formatTime";
import { useState } from "react";

type PriceModalProps = {
	open: boolean;
	onClose: () => void;
	product: Product | null;
};

const ProductPriceModal = ({ open, onClose, product }: PriceModalProps) => {
	const [tierIndex, setTierIndex] = useState(2);

	if (!open || !product?.cost) return null;

	const { materialCost, energyCost, machineCost, total } = product.cost;
	const tier = MARGIN_TIERS[tierIndex];
	const suggestedPrice = total * tier.multiplicador;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4">
			<div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-xl">
				<div className="flex items-center justify-between">
					<h2 className="font-display text-lg font-semibold text-white">
						{product.name}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="cursor-pointer text-muted hover:text-white"
					>
						✕
					</button>
				</div>
				<p className="text-sm text-muted">
					{product.weight}g · {formatMinutesToHours(product.timeToPrint)}
				</p>

				<div className="mt-4 space-y-2 rounded-lg border border-border bg-ink p-4 font-mono text-sm">
					<div className="flex justify-between text-muted">
						<span>Material</span>
						<span className="text-white">
							${materialCost.toLocaleString("es-AR")}
						</span>
					</div>
					<div className="flex justify-between text-muted">
						<span>Electricidad</span>
						<span className="text-white">
							${energyCost.toLocaleString("es-AR")}
						</span>
					</div>
					<div className="flex justify-between text-muted">
						<span>Amortización</span>
						<span className="text-white">
							${machineCost.toLocaleString("es-AR")}
						</span>
					</div>
					<div className="flex justify-between text-muted">
						<span>Mano de obra</span>
						<span className="text-white">
							${Number(product.laborCost).toLocaleString("es-AR")}
						</span>
					</div>
					<div className="flex justify-between text-muted">
						<span>Extras</span>
						<span className="text-white">
							${Number(product.extras).toLocaleString("es-AR")}
						</span>
					</div>
					<div className="flex justify-between border-t border-border pt-2 font-semibold">
						<span className="text-muted">Costo total</span>
						<span className="text-white">${total.toLocaleString("es-AR")}</span>
					</div>
				</div>

				<div className="mt-4">
					<p className="mb-2 text-sm text-muted">Margen de ganacia</p>
					<div className="grid grid-cols-3 gap-2">
						{MARGIN_TIERS.map((t, index) => (
							<button
								type="button"
								key={t.label}
								onClick={() => setTierIndex(index)}
								className={`cursor-pointer rounded-lg border py-2 text-sm transition-colors ${
									index === tierIndex
										? "border-brand bg-brand text-white"
										: "border-border text-muted hover:border-brand-light/50"
								}`}
							>
								{t.label}
								<span className="block font-mono text-xs opacity-80">
									x{t.multiplicador}
								</span>
							</button>
						))}
					</div>
				</div>

				<div className="mt-4 rounded-lg bg-brand p-4 text-center">
					<p className="text-xs text-white/70">Venta sugerida</p>
					<p className="font-display text-2xl font-bold text-white">
						${suggestedPrice.toLocaleString("es-AR")}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProductPriceModal;
