import useCrudDispatch from "@hooks/useCrudDispatch";
import {
	fetchSettings,
	updateSettings,
} from "@redux/features/settings/settingsThunks";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { CircleQuestionMark, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function KwhChip() {
	const dispatch = useAppDispatch();
	const { run } = useCrudDispatch();
	const { data: settings } = useAppSelector((state) => state.settings);

	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState("");
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		dispatch(fetchSettings());
	}, [dispatch]);

	function startEdit() {
		setValue(settings ? String(settings.kwhPrice) : "");
		setEditing(true);
	}

	async function handleSave() {
		const raw = value.replace(",", ".");
		const parsed = Number(raw);

		if (raw === "" || Number.isNaN(parsed)) {
			toast.error("Ingresá un valor válido");
			return;
		}

		setSaving(true);
		await run(updateSettings, parsed);
		setSaving(false);
		setEditing(false);
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter") handleSave();
		if (e.key === "Escape") setEditing(false);
	}

	return (
		<div className="flex items-center gap-1.5">
			<span
				title="Valor que pagás por kilowatt hora de electricidad"
				className="flex h-4 w-4 cursor-help items-center justify-center text-white/70 hover:border-white/60 hover:text-white/80"
			>
				<CircleQuestionMark size={15} />
			</span>
			{editing ? (
				<div className="flex items-center gap-1 rounded-lg bg-brand-dark px-2 py-1">
					<Zap size={14} className="shrink-0 text-white/70" />
					<span className="text-sm text-white/70">$</span>
					<input
						type="text"
						inputMode="decimal"
						value={value}
						onChange={(e) => {
							const raw = e.target.value.replace(",", ".");
							if (!/^\d*\.?\d*$/.test(raw)) return;
							setValue(e.target.value);
						}}
						onKeyDown={handleKeyDown}
						onBlur={handleSave}
						disabled={saving}
						className="w-16 bg-transparent font-mono text-sm text-white outline-none"
					/>
				</div>
			) : (
				<button
					type="button"
					onClick={startEdit}
					title="Editar precio del kWh"
					className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-white/80 hover:bg-brand-dark hover:text-white"
				>
					<Zap size={14} />
					<span className="font-mono">${settings?.kwhPrice ?? "..."}/kWh</span>
				</button>
			)}
		</div>
	);
}
