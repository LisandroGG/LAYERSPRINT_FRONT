import Button from "@components/Common/Button";
import type { Filament } from "@redux/features/filaments/filamentTypes";
import { getColorHex } from "../../utils/colorSwatch";

export type FilamentRowValue = {
	filamentId: number;
	gramsUsed: number;
};

type FilamentRowProps = {
	value: FilamentRowValue;
	filaments: Filament[];
	onChange: (value: FilamentRowValue) => void;
	onRemove: () => void;
};

const FilamentRow = ({
	value,
	filaments,
	onChange,
	onRemove,
}: FilamentRowProps) => {
	const selected = filaments.find((f) => f.id === value.filamentId);

	return (
		<div className="flex items-center gap-2">
			<span
				className="h-8 w-8 shrink-0 rounded-lg border border-white/20"
				style={{
					backgroundColor: selected
						? getColorHex(selected.color)
						: "transparent",
				}}
			/>

			<select
				value={value.filamentId || ""}
				onChange={(e) =>
					onChange({ ...value, filamentId: Number(e.target.value) })
				}
				className="flex-1 rounded-lg border border-border bg-ink px-3 py-2 text-sm text-white outline-none focus:border-brand"
			>
				<option value="" disabled>
					Elegí filamento
				</option>
				{filaments.map((f) => (
					<option key={f.id} value={f.id}>
						{f.brand} - {f.color} (${f.pricePerKg}/kg)
					</option>
				))}
			</select>

			<input
				type="number"
				value={value.gramsUsed || ""}
				onChange={(e) =>
					onChange({ ...value, gramsUsed: Number(e.target.value) })
				}
				placeholder="gramos"
				className="w-24 rounded-lg border border-border bg-ink px-3 py-2 text-sm font-mono text-white outline-none focus:border-brand"
			/>

			<Button type="button" onClick={onRemove} variant="danger">
				✕
			</Button>
		</div>
	);
};

export default FilamentRow;
