import Button from "@components/Common/Button";
import type { Machine } from "@redux/features/machines/machineTypes";

type MachineCardProps = {
	machine: Machine;
	onEdit: (machine: Machine) => void;
	onDelete: (machine: Machine) => void;
};

const MachineCard = ({ machine, onEdit, onDelete }: MachineCardProps) => {
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
				<Button
					type="button"
					onClick={() => onEdit(machine)}
					variant="outline"
					size="sm"
				>
					Editar
				</Button>
				<Button
					type="button"
					onClick={() => onDelete(machine)}
					variant="danger"
					size="sm"
				>
					Eliminar
				</Button>
			</div>
		</div>
	);
};

export default MachineCard;
