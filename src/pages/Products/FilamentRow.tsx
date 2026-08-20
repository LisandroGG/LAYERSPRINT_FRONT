import Button from "@components/Common/Button";
import FilamentPickerTrigger from "@components/FilamentPicker/FilamentPickerTrigger";
import type { Filament } from "@redux/features/filaments/filamentTypes";

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
	return (
		<div className="flex items-center gap-2">
			<FilamentPickerTrigger
				filaments={filaments}
				value={value.filamentId}
				onChange={(filamentId) => onChange({ ...value, filamentId })}
			/>

			<input
				type="text"
				inputMode="numeric"
				value={value.gramsUsed || ""}
				onChange={(e) => {
					const raw = e.target.value;
					if (!/^\d*$/.test(raw)) return;
					onChange({ ...value, gramsUsed: raw === "" ? 0 : Number(raw) });
				}}
				placeholder="gramos"
				className="w-20 rounded-lg border border-border bg-ink px-3 py-2 text-sm font-mono text-white outline-none focus:border-brand"
			/>

			<Button onClick={onRemove} variant="danger">
				✕
			</Button>
		</div>
	);
};

export default FilamentRow;
