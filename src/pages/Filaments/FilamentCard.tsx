import Button from "@components/Common/Button";
import type { Filament } from "@redux/features/filaments/filamentTypes";
import { getColorHex } from "@utils/colorSwatch";

type FilamentCardProps = {
	filament: Filament;
	onEdit: (filament: Filament) => void;
	onDelete: (filament: Filament) => void;
};

const FilamentCard = ({ filament, onEdit, onDelete }: FilamentCardProps) => {
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
					${filament.pricePerKg.toLocaleString("es-AR")}/kg
				</span>
			</div>

			<div className="mt-4 flex gap-2">
				<Button
					type="button"
					onClick={() => onEdit(filament)}
					variant="outline"
					size="sm"
				>
					Editar
				</Button>
				<Button
					type="button"
					onClick={() => onDelete(filament)}
					variant="danger"
					size="sm"
				>
					Eliminar
				</Button>
			</div>
		</div>
	);
};

export default FilamentCard;
