import Button from "@components/Common/Button";
import ConfirmModal from "@components/Common/ConfirmModal";
import PageHeader from "@components/PageHeader/PageHeader";
import useCrudDispatch from "@hooks/useCrudDispatch";
import usePagination from "@hooks/usePagination";
import {
	deleteFilament,
	fetchFilaments,
} from "@redux/features/filaments/filamentThunks";
import type { Filament } from "@redux/features/filaments/filamentTypes";
import { useAppSelector } from "@redux/hooks";
import { useState } from "react";
import Pagination from "../../components/Common/Pagination";
import FilamentCard from "./FilamentCard";
import FilamentModal from "./modals/FilamentModal";

const FilamentsPage = () => {
	const { run } = useCrudDispatch();
	const { items: filaments } = useAppSelector((state) => state.filaments);
	const { page, totalPages, hasNext, hasPrev, loading, goToPage } =
		usePagination((state) => state.filaments, fetchFilaments);

	const [modalOpen, setModalOpen] = useState(false);
	const [filamentToEdit, setFilamentToEdit] = useState<Filament | null>(null);

	const [filamentToDelete, setFilamentToDelete] = useState<Filament | null>(
		null,
	);
	const [deleting, setDeleting] = useState(false);

	const handleCreate = () => {
		setFilamentToEdit(null);
		setModalOpen(true);
	};

	const handleEdit = (filament: Filament) => {
		setFilamentToEdit(filament);
		setModalOpen(true);
	};

	const handleDelete = (filament: Filament) => {
		setFilamentToDelete(filament);
	};

	const confirmDelete = async () => {
		if (!filamentToDelete) return;
		setDeleting(true);
		await run(deleteFilament, filamentToDelete.id);
		setDeleting(false);
		setFilamentToDelete(null);
	};

	return (
		<div className="flex h-full flex-col">
			<PageHeader
				title="Filamentos"
				action={<Button onClick={handleCreate}>+ Nuevo filamento</Button>}
			/>

			<div className="flex-1 overflow-y-auto p-6">
				{loading && <p className="font-mono text-sm text-muted">Cargando...</p>}

				{!loading && filaments.length === 0 && (
					<div className="rounded-xl border border-dashed border-border bg-surface/50 p-10 text-center">
						<p className="font-display text-muted">
							No se ha encontrado ningún filamento.
						</p>
					</div>
				)}

				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{filaments.map((filament) => (
						<FilamentCard
							key={filament.id}
							filament={filament}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					))}
				</div>
			</div>

			{!loading && filaments.length > 0 && (
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

			<FilamentModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				filamentToEdit={filamentToEdit}
			/>
			<ConfirmModal
				open={!!filamentToDelete}
				title="Eliminar filamento"
				message={`¿Eliminar "${filamentToDelete?.brand} - ${filamentToDelete?.color}"? Esta acción no se puede deshacer.`}
				onConfirm={confirmDelete}
				onCancel={() => setFilamentToDelete(null)}
				loading={deleting}
			/>
		</div>
	);
};

export default FilamentsPage;
