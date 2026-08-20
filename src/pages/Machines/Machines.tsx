import Button from "@components/Common/Button";
import ConfirmModal from "@components/Common/ConfirmModal";
import Pagination from "@components/Common/Pagination";
import PageHeader from "@components/PageHeader/PageHeader";
import useCrudDispatch from "@hooks/useCrudDispatch";
import usePagination from "@hooks/usePagination";
import {
	deleteMachine,
	fetchMachines,
} from "@redux/features/machines/machineThunks";
import type { Machine } from "@redux/features/machines/machineTypes";
import { useAppSelector } from "@redux/hooks";
import { useState } from "react";
import MachineCard from "./MachineCard";
import MachineModal from "./modals/MachineModal";

const MachinesPage = () => {
	const { run } = useCrudDispatch();
	const { items: machines } = useAppSelector((state) => state.machines);
	const { page, totalPages, hasNext, hasPrev, loading, goToPage } =
		usePagination((state) => state.machines, fetchMachines);

	const [modalOpen, setModalOpen] = useState(false);
	const [machineToEdit, setMachineToEdit] = useState<Machine | null>(null);
	const [machineToDelete, setMachineToDelete] = useState<Machine | null>(null);
	const [deleting, setDeleting] = useState(false);

	const handleCreate = () => {
		setMachineToEdit(null);
		setModalOpen(true);
	};

	const handleEdit = (machine: Machine) => {
		setMachineToEdit(machine);
		setModalOpen(true);
	};

	const handleDelete = (machine: Machine) => {
		setMachineToDelete(machine);
	};

	const confirmDelete = async () => {
		if (!machineToDelete) return;
		setDeleting(true);
		await run(deleteMachine, machineToDelete.id);
		setDeleting(false);
		setMachineToDelete(null);
	};

	return (
		<div className="flex h-full flex-col">
			<PageHeader
				title="Máquinas"
				action={<Button onClick={handleCreate}>+ Nueva máquina</Button>}
			/>

			<div className="flex-1 overflow-y-auto p-6">
				{loading && <p className="font-mono text-sm text-muted">Cargando...</p>}

				{!loading && machines.length === 0 && (
					<div className="rounded-xl border border-dashed border-border bg-surface/50 p-10 text-center">
						<p className="font-display text-muted">
							No se ha encontrado ninguna máquina.
						</p>
					</div>
				)}

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{machines.map((machine) => (
						<MachineCard
							key={machine.id}
							machine={machine}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					))}
				</div>
			</div>

			{!loading && machines.length > 0 && (
				<div className="border-t border-border px-6 py-4">
					<Pagination
						page={page}
						totalPages={totalPages}
						hasNext={hasNext}
						hasPrev={hasPrev}
						onPageChange={goToPage}
					/>
				</div>
			)}

			<MachineModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				machineToEdit={machineToEdit}
			/>
			<ConfirmModal
				open={!!machineToDelete}
				title="Eliminar máquina"
				message={`¿Eliminar la máquina "${machineToDelete?.name}"? Esta acción no se puede deshacer.`}
				onConfirm={confirmDelete}
				onCancel={() => setMachineToDelete(null)}
				loading={deleting}
			/>
		</div>
	);
};

export default MachinesPage;
