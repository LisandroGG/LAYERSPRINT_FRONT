import type { Machine } from "@redux/features/machines/machineTypes";

type MachineCardProps = {
	machine: Machine;
	onEdit: (machine: Machine) => void;
	onDelete: (machine: Machine) => void;
};

export default function MachineCard({
	machine,
	onEdit,
	onDelete,
}: MachineCardProps) {
	return (
		<div className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-brand-light/50">
			<h3 className="font-display text-base font-semibold text-white">
				{machine.name}
			</h3>

			<div className="mt-3 space-y-1 font-mono text-sm text-muted">
				<p>
					Consumo: <span className="text-white">{machine.watts}W</span>
				</p>
				<p>
					Desgaste:{" "}
					<span className="text-white">${machine.depreciationPerHour}/h</span>
				</p>
			</div>

			<div className="mt-4 flex gap-2">
				<button
					type="button"
					onClick={() => onEdit(machine)}
					className="flex-1 rounded-lg border border-border py-1.5 text-sm text-white hover:bg-surface-hover"
				>
					Editar
				</button>
				<button
					type="button"
					onClick={() => onDelete(machine)}
					className="flex-1 rounded-lg border border-danger/40 py-1.5 text-sm text-danger hover:bg-danger/10"
				>
					Eliminar
				</button>
			</div>
		</div>
	);
}
