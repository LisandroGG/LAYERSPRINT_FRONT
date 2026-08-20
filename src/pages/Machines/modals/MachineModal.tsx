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
import { useEffect, useState } from "react";
import { toast } from "sonner";

type MachineModalProps = {
	open: boolean;
	onClose: () => void;
	machineToEdit: Machine | null;
};

const emptyForm: MachineInput = { name: "", watts: 0, depreciationPerHour: 0 };

const MachineModal = ({ open, onClose, machineToEdit }: MachineModalProps) => {
	const { run } = useCrudDispatch();
	const [form, setForm] = useState<MachineInput>(emptyForm);
	const [submitting, setSubmitting] = useState(false);

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		if (machineToEdit) {
			const { name, watts, depreciationPerHour } = machineToEdit;
			setForm({ name, watts, depreciationPerHour });
		} else {
			setForm(emptyForm);
		}
	}, [machineToEdit, open]);

	if (!open) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!form.name.trim()) {
			toast.error("El nombre es obligatorio");
			return;
		}

		setSubmitting(true);
		try {
			if (machineToEdit) {
				await run(updateMachine, { id: machineToEdit.id, payload: form });
			} else {
				await run(createMachine, form);
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
							className="w-full rounded-lg border border-border bg-ink px-3 py-2 text-white outline-none focus:border-brand"
						/>
					</div>

					<div>
						<label htmlFor="Watts" className="mb-1 block text-sm text-muted">
							Watts
						</label>
						<input
							type="number"
							id="Watts"
							value={form.watts}
							onChange={(e) =>
								setForm({ ...form, watts: Number(e.target.value) })
							}
							className="w-full rounded-lg border border-border bg-ink px-3 py-2 font-mono text-white outline-none focus:border-brand"
						/>
					</div>

					<div>
						<label
							htmlFor="DepreciationPerHour"
							className="mb-1 block text-sm text-muted"
						>
							Desgaste por hora ($)
						</label>
						<input
							type="number"
							step="0.01"
							id="DepreciationPerHour"
							value={form.depreciationPerHour}
							onChange={(e) =>
								setForm({
									...form,
									depreciationPerHour: Number(e.target.value),
								})
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
