import type { Filament } from "@redux/features/filaments/filamentTypes";
import { getColorHex } from "@utils/colorSwatch";

type FilamentCardProps = {
	filament: Filament;
	onEdit: (filament: Filament) => void;
	onDelete: (filament: Filament) => void;
};

export default function FilamentCard({
	filament,
	onEdit,
	onDelete,
}: FilamentCardProps) {
	return (
		<div className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-brand-light/50">
			<div className="flex items-start justify-between">
				<div>
					<h3 className="font-display text-base font-semibold text-white">
						{filament.brand}
					</h3>
					<p className="text-sm text-muted">
						{filament.material} · {filament.diameter}mm
					</p>
				</div>
				<span
					className="mt-1 h-5 w-5 shrink-0 rounded-full border border-white/20"
					style={{ backgroundColor: getColorHex(filament.color) }}
					title={filament.color}
				/>
			</div>

			<div className="mt-3 flex items-center justify-between">
				<span className="text-sm text-muted">{filament.color}</span>
				<span className="font-mono text-sm text-white">
					${filament.pricePerKg}/kg
				</span>
			</div>

			<div className="mt-4 flex gap-2">
				<button
					type="button"
					onClick={() => onEdit(filament)}
					className="flex-1 rounded-lg border border-border py-1.5 text-sm text-white hover:bg-surface-hover"
				>
					Editar
				</button>
				<button
					type="button"
					onClick={() => onDelete(filament)}
					className="flex-1 rounded-lg border border-danger/40 py-1.5 text-sm text-danger hover:bg-danger/10"
				>
					Eliminar
				</button>
			</div>
		</div>
	);
}
