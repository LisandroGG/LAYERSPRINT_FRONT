import Button from "@components/Common/Button";
import useCrudDispatch from "@hooks/useCrudDispatch";
import {
	createMachine,
	updateMachine,
} from "@redux/features/machines/machineThunks";
import type {
	Machine,
	MachineInput,
} from "@redux/features/machines/machineTypes";
import {
	type MachineErrors,
	validateMachine,
} from "@utils/validations/machineValidations";
import { useEffect, useState } from "react";

type MachineModalProps = {
	open: boolean;
	onClose: () => void;
	machineToEdit: Machine | null;
	onSaved: () => void;
};

const emptyForm: MachineInput = { name: "", watts: 0, depreciationPerHour: 0 };

const MachineModal = ({
	open,
	onClose,
	machineToEdit,
	onSaved,
}: MachineModalProps) => {
	const { run } = useCrudDispatch();
	const [form, setForm] = useState<MachineInput>(emptyForm);
	const [wattsInput, setWattsInput] = useState("");
	const [depreciationInput, setDepreciationInput] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [errors, setErrors] = useState<MachineErrors>({});

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		if (machineToEdit) {
			const { name, watts, depreciationPerHour } = machineToEdit;
			setForm({ name, watts, depreciationPerHour });
			setWattsInput(String(watts));
			setDepreciationInput(String(depreciationPerHour));
		} else {
			setForm(emptyForm);
			setWattsInput("");
			setDepreciationInput("");
		}
		setErrors({});
	}, [machineToEdit, open]);

	if (!open) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validationErrors = validateMachine(form);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) return;

		setSubmitting(true);
		try {
			if (machineToEdit) {
				await run(updateMachine, { id: machineToEdit.id, payload: form });
			} else {
				await run(createMachine, form);
			}
			onSaved();
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
					{machineToEdit ? "Editar máquina" : "Nueva máquina"}
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="Name" className="mb-1 block text-sm text-muted">
							Nombre
						</label>
						<input
							type="text"
							id="Name"
							value={form.name}
							onChange={(e) => setForm({ ...form, name: e.target.value })}
							placeholder="Bambu Lab A1"
							className={`w-full rounded-lg border bg-ink px-3 py-2 text-white outline-none focus:border-brand ${
								errors.name ? "border-danger" : "border-border"
							}`}
						/>
						{errors.name && (
							<p className="mt-1 text-xs text-danger">{errors.name}</p>
						)}
					</div>

					<div>
						<label htmlFor="Watts" className="mb-1 block text-sm text-muted">
							Watts
						</label>
						<input
							type="text"
							inputMode="numeric"
							id="Watts"
							value={wattsInput}
							onChange={(e) => {
								const raw = e.target.value;
								if (!/^\d*$/.test(raw)) return;
								setWattsInput(raw);
								setForm({ ...form, watts: raw === "" ? 0 : Number(raw) });
							}}
							className={`w-full rounded-lg border bg-ink px-3 py-2 text-white outline-none focus:border-brand ${
								errors.watts ? "border-danger" : "border-border"
							}`}
						/>
						{errors.watts && (
							<p className="mt-1 text-xs text-danger">{errors.watts}</p>
						)}
					</div>

					<div>
						<label
							htmlFor="DepreciationPerHour"
							className="mb-1 block text-sm text-muted"
						>
							Desgaste por hora ($)
						</label>
						<input
							type="text"
							inputMode="decimal"
							id="DepreciationPerHour"
							value={depreciationInput}
							onChange={(e) => {
								const raw = e.target.value.replace(",", ".");
								if (!/^\d*\.?\d*$/.test(raw)) return;
								setDepreciationInput(e.target.value);
								setForm({
									...form,
									depreciationPerHour:
										raw === "" || raw === "." ? 0 : Number(raw),
								});
							}}
							className={`w-full rounded-lg border bg-ink px-3 py-2 text-white outline-none focus:border-brand ${
								errors.depreciationPerHour ? "border-danger" : "border-border"
							}`}
						/>
						{errors.depreciationPerHour && (
							<p className="mt-1 text-xs text-danger">
								{errors.depreciationPerHour}
							</p>
						)}
					</div>

					<div className="flex justify-end gap-2 pt-2">
						<Button type="button" onClick={onClose} variant="ghost">
							Cancelar
						</Button>
						<Button type="submit" disabled={submitting}>
							{submitting
								? "Guardando..."
								: machineToEdit
									? "Guardar cambios"
									: "Crear máquina"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default MachineModal;
