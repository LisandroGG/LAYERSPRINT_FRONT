import Button from "@components/Common/Button";
import ConfirmModal from "@components/Common/ConfirmModal";
import Loading from "@components/Common/Loading";
import NotFind from "@components/Common/NotFind";
import Pagination from "@components/Common/Pagination";
import SearchInput from "@components/Common/SearchInput";
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
	const {
		page,
		totalPages,
		hasNext,
		hasPrev,
		loading,
		goToPage,
		applyFilters,
		refresh,
	} = usePagination((state) => state.machines, fetchMachines);

	const [modalOpen, setModalOpen] = useState(false);
	const [machineToEdit, setMachineToEdit] = useState<Machine | null>(null);
	const [machineToDelete, setMachineToDelete] = useState<Machine | null>(null);
	const [deleting, setDeleting] = useState(false);

	const handleSearch = (value: string) => {
		applyFilters(value ? { search: value } : {});
	};

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
		refresh();
	};

	return (
		<div className="flex h-full flex-col">
			<PageHeader title="Máquinas">
				<SearchInput placeholder="Buscar máquina..." onSearch={handleSearch} />
				<Button onClick={handleCreate}>+ Nueva máquina</Button>
			</PageHeader>

			<div className="flex-1 overflow-y-auto p-6">
				{loading && machines.length === 0 && <Loading />}

				{!loading && machines.length === 0 && (
					<NotFind entity="máquina" gender="feminine" />
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
				onSaved={refresh}
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
