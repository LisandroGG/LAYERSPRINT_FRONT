import type { Filament } from "@redux/features/filaments/filamentTypes";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getColorHex } from "../../utils/colorSwatch";

type FilamentPickerModalProps = {
	open: boolean;
	filaments: Filament[];
	value: number;
	onSelect: (filamentId: number) => void;
	onClose: () => void;
};

const FilamentPickerModal = ({
	open,
	filaments,
	value,
	onSelect,
	onClose,
}: FilamentPickerModalProps) => {
	const [query, setQuery] = useState("");

	useEffect(() => {
		if (open) setQuery("");
	}, [open]);

	if (!open) return null;

	const filtered = filaments.filter((f) => {
		const term = query.trim().toLowerCase();
		if (!term) return true;
		return (
			f.brand.toLowerCase().includes(term) ||
			f.color.toLowerCase().includes(term) ||
			f.material.toLowerCase().includes(term)
		);
	});

	function handleSelect(filamentId: number) {
		onSelect(filamentId);
		onClose();
	}

	return (
		<div className="fixed inset-0 z-70 flex items-center justify-center bg-ink/80 p-4">
			<div className="flex max-h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
				<div className="flex items-center justify-between border-b border-border p-4">
					<h2 className="font-display text-base font-semibold text-white">
						Elegí un filamento
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="cursor-pointer text-muted hover:text-white"
					>
						✕
					</button>
				</div>

				<div className="flex items-center gap-2 border-b border-border px-4 py-3">
					<Search size={16} className="shrink-0 text-muted" />
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Buscar por marca, color o material..."
						className="w-full bg-transparent text-sm text-white outline-none placeholder:text-muted"
					/>
				</div>

				<div className="flex-1 overflow-y-auto styled-scroll">
					{filtered.length === 0 && (
						<p className="px-4 py-8 text-center text-sm text-muted">
							Sin resultados
						</p>
					)}

					{filtered.map((f) => (
						<button
							key={f.id}
							type="button"
							onClick={() => handleSelect(f.id)}
							className={`flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left hover:bg-surface-hover ${
								f.id === value ? "bg-brand/10" : ""
							}`}
						>
							<span
								className="h-8 w-8 shrink-0 rounded-lg border border-white/20"
								style={{ backgroundColor: getColorHex(f.color) }}
							/>
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm text-white">
									{f.brand} - {f.color}
								</p>
								<p className="text-xs text-muted">{f.material}</p>
							</div>
							<span className="shrink-0 font-mono text-sm text-muted">
								${f.pricePerKg}/kg
							</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default FilamentPickerModal;
