import type { Filament } from "@redux/features/filaments/filamentTypes";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { getColorHex } from "../../utils/colorSwatch";
import FilamentPickerModal from "./FilamentPickerModal";

type FilamentPickerTriggerProps = {
	filaments: Filament[];
	value: number;
	onChange: (filamentId: number) => void;
};

const FilamentPickerTrigger = ({
	filaments,
	value,
	onChange,
}: FilamentPickerTriggerProps) => {
	const [modalOpen, setModalOpen] = useState(false);
	const selected = filaments.find((f) => f.id === value);

	return (
		<>
			<button
				type="button"
				onClick={() => setModalOpen(true)}
				className="flex flex-1 cursor-pointer items-center gap-2 rounded-lg border border-border bg-ink px-3 py-2 text-left text-sm text-white outline-none hover:border-brand-light/50 focus:border-brand"
			>
				{selected ? (
					<>
						<span
							className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/20"
							style={{ backgroundColor: getColorHex(selected.color) }}
						/>
						<span className="flex-1 truncate">
							{selected.brand} - {selected.color}
						</span>
					</>
				) : (
					<span className="flex-1 text-muted">Elegí filamento</span>
				)}
				<ChevronDown size={14} className="shrink-0 text-muted" />
			</button>

			<FilamentPickerModal
				open={modalOpen}
				filaments={filaments}
				value={value}
				onSelect={onChange}
				onClose={() => setModalOpen(false)}
			/>
		</>
	);
};

export default FilamentPickerTrigger;
