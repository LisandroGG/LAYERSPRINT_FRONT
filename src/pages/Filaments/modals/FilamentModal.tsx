import Button from "@components/Common/Button";
import useCrudDispatch from "@hooks/useCrudDispatch";
import {
	createFilament,
	updateFilament,
} from "@redux/features/filaments/filamentThunks";
import type {
	Filament,
	FilamentInput,
} from "@redux/features/filaments/filamentTypes";
import { getColorHex } from "@utils/colorSwatch";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FilamentModalProps = {
	open: boolean;
	onClose: () => void;
	filamentToEdit: Filament | null;
};

const emptyForm: FilamentInput = {
	brand: "",
	material: "PLA",
	diameter: 1.75,
	color: "",
	pricePerKg: 0,
};

const MATERIALS = ["PLA", "PLA Lite", "PETG", "ABS", "TPU", "ASA"];

const FilamentModal = ({
	open,
	onClose,
	filamentToEdit,
}: FilamentModalProps) => {
	const { run } = useCrudDispatch();
	const [form, setForm] = useState<FilamentInput>(emptyForm);
	const [submitting, setSubmitting] = useState(false);

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		if (filamentToEdit) {
			const { brand, material, diameter, color, pricePerKg } = filamentToEdit;
			setForm({ brand, material, diameter, color, pricePerKg });
		} else {
			setForm(emptyForm);
		}
	}, [filamentToEdit, open]);

	if (!open) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!form.brand.trim() || !form.color.trim()) {
			toast.error("Marca y color son obligatorios");
			return;
		}

		setSubmitting(true);
		try {
			if (filamentToEdit) {
				await run(updateFilament, { id: filamentToEdit.id, payload: form });
			} else {
				await run(createFilament, form);
			}
			onClose();
		} catch {
			// el toast de error ya lo maneja useCrudDispatch
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4">
			<div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-xl">
				<h2 className="mb-4 font-display text-lg font-semibold text-white">
					{filamentToEdit ? "Editar filamento" : "Nuevo filamento"}
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="Brand" className="mb-1 block text-sm text-muted">
							Marca
						</label>
						<input
							type="text"
							value={form.brand}
							onChange={(e) => setForm({ ...form, brand: e.target.value })}
							placeholder="BambuLab"
							className="w-full rounded-lg border border-border bg-ink px-3 py-2 text-white outline-none focus:border-brand"
						/>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<label
								htmlFor="Material"
								className="mb-1 block text-sm text-muted"
							>
								Material
							</label>
							<select
								id="Material"
								value={form.material}
								onChange={(e) => setForm({ ...form, material: e.target.value })}
								className="w-full rounded-lg border border-border bg-ink px-3 py-2 text-white outline-none focus:border-brand"
							>
								{MATERIALS.map((m) => (
									<option key={m} value={m}>
										{m}
									</option>
								))}
							</select>
						</div>
						<div>
							<label
								htmlFor="Diameter"
								className="mb-1 block text-sm text-muted"
							>
								Diámetro (mm)
							</label>
							<input
								id="Diameter"
								type="number"
								step="0.05"
								value={form.diameter}
								onChange={(e) =>
									setForm({ ...form, diameter: Number(e.target.value) })
								}
								className="w-full rounded-lg border border-border bg-ink px-3 py-2 font-mono text-white outline-none focus:border-brand"
							/>
						</div>
					</div>

					<div>
						<label htmlFor="Color" className="mb-1 block text-sm text-muted">
							Color
						</label>
						<div className="flex items-center gap-2">
							<span
								className="h-9 w-9 shrink-0 rounded-lg border border-white/20"
								style={{
									backgroundColor: form.color
										? getColorHex(form.color)
										: "transparent",
								}}
							/>
							<input
								type="text"
								value={form.color}
								onChange={(e) => setForm({ ...form, color: e.target.value })}
								placeholder="Negro"
								className="w-full rounded-lg border border-border bg-ink px-3 py-2 text-white outline-none focus:border-brand"
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="pricePerKg"
							className="mb-1 block text-sm text-muted"
						>
							Precio por kg ($)
						</label>
						<input
							type="number"
							step="1"
							value={form.pricePerKg}
							onChange={(e) =>
								setForm({ ...form, pricePerKg: Number(e.target.value) })
							}
							className="w-full rounded-lg border border-border bg-ink px-3 py-2 font-mono text-white outline-none focus:border-brand"
						/>
					</div>

					<div className="flex justify-end gap-2 pt-2">
						<Button type="button" onClick={onClose} variant="ghost">
							Cancelar
						</Button>
						<Button type="submit" disabled={submitting}>
							{submitting
								? "Guardando..."
								: filamentToEdit
									? "Guardar cambios"
									: "Crear filamento"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FilamentModal;
