import { MARGIN_TIERS } from "@constants/marginTiers";
import type { Product } from "@redux/features/products/productTypes";
import { getColorHex } from "@utils/colorSwatch";
import { formatMinutesToHours } from "@utils/formatTime";
import shareProduct from "@utils/shareProducts";
import { ChevronDown, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type PriceModalProps = {
	open: boolean;
	onClose: () => void;
	product: Product | null;
};

const ProductPriceModal = ({ open, onClose, product }: PriceModalProps) => {
	const [tierIndex, setTierIndex] = useState(2);
	const [filamentsOpen, setFilamentsOpen] = useState(false);
	const [costOpen, setCostOpen] = useState(false);
	const [sharing, setSharing] = useState(false);

	if (!open || !product?.cost) return null;

	const { materialCost, energyCost, machineCost, total } = product.cost;
	const tier = MARGIN_TIERS[tierIndex];
	const suggestedPrice = total * tier.multiplicador;

	const handleClose = () => {
		setFilamentsOpen(false);
		setCostOpen(false);
		onClose();
	};

	const handleShare = async () => {
		setSharing(true);
		const result = await shareProduct(product, suggestedPrice);
		setSharing(false);

		if (result.copied) toast.success("Copiado al portapapeles");
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4">
			<div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-xl">
				<div className="flex items-center justify-between">
					<h2 className="font-display text-lg font-semibold text-white">
						{product.name}
					</h2>
					<button
						type="button"
						onClick={handleClose}
						className="cursor-pointer text-muted hover:text-white"
					>
						✕
					</button>
				</div>
				<p className="text-sm text-muted">
					{product.weight}g · {formatMinutesToHours(product.timeToPrint)}
				</p>

				{product.ProductFilaments && product.ProductFilaments.length > 0 && (
					<div className="mt-3 rounded-lg border border-border bg-ink">
						<button
							type="button"
							onClick={() => setFilamentsOpen((v) => !v)}
							className="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-xs text-muted hover:text-white"
						>
							<span>{product.ProductFilaments.length} filamento(s) usados</span>
							<ChevronDown
								size={14}
								className={`transition-transform ${filamentsOpen ? "rotate-180" : ""}`}
							/>
						</button>

						<div
							className={`grid transition-all duration-300 ease-in-out ${
								filamentsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
							}`}
						>
							<div className="overflow-hidden">
								<div className="space-y-1.5 border-t border-border p-3">
									{product.ProductFilaments.map((pf) => (
										<div
											key={pf.id}
											className="flex items-center justify-between text-xs"
										>
											<div className="flex items-center gap-1.5 text-muted">
												<span
													className="h-2.5 w-2.5 shrink-0 rounded-full border border-white/20"
													style={{
														backgroundColor: getColorHex(pf.Filament.color),
													}}
												/>
												<span>
													{pf.Filament.brand} - {pf.Filament.color}
												</span>
											</div>
											<span className="font-mono text-white">
												{pf.gramsUsed}g
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				<div className="mt-4 rounded-lg border border-border bg-ink">
					<button
						type="button"
						onClick={() => setCostOpen((v) => !v)}
						className="flex w-full cursor-pointer items-center justify-between px-4 py-3"
					>
						<span className="text-sm text-muted">Costo total</span>
						<div className="flex items-center gap-2">
							<span className="font-mono text-lg font-semibold text-white">
								$
								{total.toLocaleString("es-AR", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</span>
							<ChevronDown
								size={14}
								className={`text-muted transition-transform ${costOpen ? "rotate-180" : ""}`}
							/>
						</div>
					</button>

					<div
						className={`grid transition-all duration-300 ease-in-out ${
							costOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
						}`}
					>
						<div className="overflow-hidden">
							<div className="space-y-2 border-t border-border p-4 font-mono text-sm">
								<div className="flex justify-between text-muted">
									<span>Material</span>
									<span className="text-white">
										$
										{materialCost.toLocaleString("es-AR", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</span>
								</div>
								<div className="flex justify-between text-muted">
									<span>Electricidad</span>
									<span className="text-white">
										$
										{energyCost.toLocaleString("es-AR", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</span>
								</div>
								<div className="flex justify-between text-muted">
									<span>Amortización</span>
									<span className="text-white">
										$
										{machineCost.toLocaleString("es-AR", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</span>
								</div>
								<div className="flex justify-between text-muted">
									<span>Mano de obra</span>
									<span className="text-white">
										$
										{Number(product.laborCost).toLocaleString("es-AR", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</span>
								</div>
								<div className="flex justify-between text-muted">
									<span>Extras</span>
									<span className="text-white">
										$
										{Number(product.extras).toLocaleString("es-AR", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</span>
								</div>
							</div>
						</div>
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

				<div className="mt-4 rounded-lg bg-brand p-4">
					<div className="text-center">
						<p className="text-xs text-white/70">Venta sugerida</p>
						<p className="font-display text-2xl font-bold text-white">
							$
							{suggestedPrice.toLocaleString("es-AR", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</p>
					</div>
					<button
						type="button"
						onClick={handleShare}
						disabled={sharing}
						className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white/10 py-2 text-sm font-medium text-white hover:bg-white/20 disabled:opacity-50"
					>
						<Share2 size={14} />
						{sharing ? "Compartiendo" : "Compartir"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductPriceModal;
