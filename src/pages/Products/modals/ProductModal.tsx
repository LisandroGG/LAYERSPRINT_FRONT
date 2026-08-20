import Button from "@components/Common/Button";
import TimeInput from "@components/Common/TimeInput";
import useCrudDispatch from "@hooks/useCrudDispatch";
import { fetchFilamentsNoPaginated } from "@redux/features/filaments/filamentThunks";
import { fetchMachinesNoPaginated } from "@redux/features/machines/machineThunks";
import {
	createProduct,
	updateProduct,
} from "@redux/features/products/productThunks";
import type {
	Product,
	ProductInput,
} from "@redux/features/products/productTypes";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FilamentRow, { type FilamentRowValue } from "../FilamentRow";

type ProductModalProps = {
	open: boolean;
	onClose: () => void;
	productToEdit: Product | null;
};

const ProductModal = ({ open, onClose, productToEdit }: ProductModalProps) => {
	const dispatch = useAppDispatch();
	const { run } = useCrudDispatch();
	const { items: machines } = useAppSelector((state) => state.machines);
	const { items: filaments } = useAppSelector((state) => state.filaments);

	const [name, setName] = useState("");
	const [machineId, setMachineId] = useState<number | "">("");
	const [timeToPrint, setTimeToPrint] = useState(0);
	const [laborCost, setLaborCost] = useState(0);
	const [extras, setExtras] = useState(0);
	const [filamentRows, setFilamentRows] = useState<
		(FilamentRowValue & { rowId: string })[]
	>([{ rowId: crypto.randomUUID(), filamentId: 0, gramsUsed: 0 }]);
	const [image, setImage] = useState<File | undefined>(undefined);
	const [preview, setPreview] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (!machines.length) dispatch(fetchMachinesNoPaginated());
		if (!filaments.length) dispatch(fetchFilamentsNoPaginated());
	}, [dispatch, machines.length, filaments.length]);

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		if (productToEdit) {
			setName(productToEdit.name);
			setMachineId(productToEdit.machineId);
			setTimeToPrint(productToEdit.timeToPrint);
			setLaborCost(productToEdit.laborCost);
			setExtras(productToEdit.extras);
			setPreview(productToEdit.imageUrl);
			setImage(undefined);
		} else {
			setName("");
			setMachineId("");
			setTimeToPrint(0);
			setLaborCost(0);
			setExtras(0);
			setFilamentRows([
				{ rowId: crypto.randomUUID(), filamentId: 0, gramsUsed: 0 },
			]);
			setPreview(null);
			setImage(undefined);
		}
	}, [productToEdit, open]);

	if (!open) return null;

	const totalWeight = filamentRows.reduce(
		(total, row) => total + (Number(row.gramsUsed) || 0),
		0,
	);

	const updateRow = (index: number, value: FilamentRowValue) => {
		setFilamentRows((rows) =>
			rows.map((r, i) => (i === index ? { ...r, ...value } : r)),
		);
	};

	const removeRow = (index: number) => {
		setFilamentRows((rows) => rows.filter((_, i) => i !== index));
	};

	const addRow = () => {
		setFilamentRows((rows) => [
			...rows,
			{ rowId: crypto.randomUUID(), filamentId: 0, gramsUsed: 0 },
		]);
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setImage(file);
		setPreview(URL.createObjectURL(file));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validRows = filamentRows
			.filter((r) => r.filamentId && r.gramsUsed > 0)
			.map(({ filamentId, gramsUsed }) => ({ filamentId, gramsUsed }));

		if (!name.trim() || !machineId || !validRows.length) {
			toast.error("Nombre, máquina y al menos un filamento son obligatorios");
			return;
		}

		const payload: ProductInput = {
			name,
			machineId: Number(machineId),
			timeToPrint,
			laborCost,
			extras,
			filaments: validRows,
			image,
		};

		setSubmitting(true);
		try {
			if (productToEdit) {
				await run(updateProduct, { id: productToEdit.id, payload });
			} else {
				await run(createProduct, payload);
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
			<div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-surface p-6 shadow-xl">
				<h2 className="mb-4 font-display text-lg font-semibold text-white">
					{productToEdit ? "Editar producto" : "Nuevo producto"}
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="flex items-center gap-4">
						<label className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-ink text-xs text-muted hover:border-brand">
							{preview ? (
								<img
									src={preview}
									alt="preview"
									className="h-full w-full object-cover"
								/>
							) : (
								"+ Foto"
							)}
							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								className="hidden"
							/>
						</label>

						<div className="flex-1">
							<label htmlFor="name" className="mb-1 block text-sm text-muted">
								Nombre
							</label>
							<input
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Panda"
								className="w-full rounded-lg border border-border bg-ink px-3 py-2 text-white outline-none focus:border-brand"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<label
								htmlFor="machineId"
								className="mb-1 block text-sm text-muted"
							>
								Máquina
							</label>
							<select
								id="machineId"
								value={machineId}
								onChange={(e) => setMachineId(Number(e.target.value))}
								className="w-full rounded-lg border border-border bg-ink px-3 py-2 text-white outline-none focus:border-brand"
							>
								<option value="" disabled>
									Elegí máquina
								</option>
								{machines.map((m) => (
									<option key={m.id} value={m.id}>
										{m.name}
									</option>
								))}
							</select>
						</div>
						<div>
							<label
								htmlFor="timeToPrint"
								className="mb-1 block text-sm text-muted"
							>
								Tiempo de impresión
							</label>
							<TimeInput
								valueInMinutes={timeToPrint}
								onChange={setTimeToPrint}
							/>
						</div>
					</div>

					<div>
						<div className="mb-2 flex items-center justify-between">
							<label htmlFor="filaments" className="text-sm text-muted">
								Filamentos usados
							</label>
							<span className="font-mono text-xs text-brand-light">
								{totalWeight}g total
							</span>
						</div>

						<div className="space-y-2">
							{filamentRows.map((row, index) => (
								<FilamentRow
									key={row.rowId}
									value={row}
									filaments={filaments}
									onChange={(value) => updateRow(index, value)}
									onRemove={() => removeRow(index)}
								/>
							))}
						</div>

						<button
							type="button"
							onClick={addRow}
							className="mt-2 text-sm text-brand-light hover:text-white cursor-pointer"
						>
							+ agregar filamento
						</button>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<label
								htmlFor="laborCost"
								className="mb-1 block text-sm text-muted"
							>
								Mano de obra ($)
							</label>
							<input
								type="number"
								id="laborCost"
								value={laborCost}
								onChange={(e) => setLaborCost(Number(e.target.value))}
								className="w-full rounded-lg border border-border bg-ink px-3 py-2 font-mono text-white outline-none focus:border-brand"
							/>
						</div>
						<div>
							<label htmlFor="extras" className="mb-1 block text-sm text-muted">
								Extras ($)
							</label>
							<input
								type="number"
								id="extras"
								value={extras}
								onChange={(e) => setExtras(Number(e.target.value))}
								className="w-full rounded-lg border border-border bg-ink px-3 py-2 font-mono text-white outline-none focus:border-brand"
							/>
						</div>
					</div>

					<div className="flex justify-end gap-2 pt-2">
						<Button type="button" onClick={onClose} variant="ghost">
							Cancelar
						</Button>
						<Button type="submit" disabled={submitting}>
							{submitting
								? "Guardando..."
								: productToEdit
									? "Guardar cambios"
									: "Crear producto"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProductModal;
