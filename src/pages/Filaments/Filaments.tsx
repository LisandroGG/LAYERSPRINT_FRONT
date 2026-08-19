import useCrudDispatch from "@hooks/useCrudDispatch";
import {
	deleteFilament,
	fetchFilamentsNoPaginated,
} from "@redux/features/filaments/filamentThunks";
import type { Filament } from "@redux/features/filaments/filamentTypes";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import FilamentCard from "./FilamentCard";
import FilamentModal from "./modals/FilamentModal";

export default function FilamentsPage() {
	const dispatch = useAppDispatch();
	const { run } = useCrudDispatch();
	const { items: filaments, loading } = useAppSelector(
		(state) => state.filaments,
	);

	const [modalOpen, setModalOpen] = useState(false);
	const [filamentToEdit, setFilamentToEdit] = useState<Filament | null>(null);

	useEffect(() => {
		dispatch(fetchFilamentsNoPaginated());
	}, [dispatch]);

	function handleCreate() {
		setFilamentToEdit(null);
		setModalOpen(true);
	}

	function handleEdit(filament: Filament) {
		setFilamentToEdit(filament);
		setModalOpen(true);
	}

	async function handleDelete(filament: Filament) {
		const confirmed = window.confirm(
			`¿Eliminar "${filament.brand} - ${filament.color}"?`,
		);
		if (!confirmed) return;
		await run(deleteFilament, filament.id);
	}

	return (
		<div className="min-h-screen bg-ink">
			<PageHeader
				title="Filamentos"
				action={
					<button
						type="button"
						onClick={handleCreate}
						className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
					>
						+ Nuevo filamento
					</button>
				}
			/>

			<div className="p-6">
				{loading && <p className="font-mono text-sm text-muted">Cargando...</p>}

				{!loading && filaments.length === 0 && (
					<div className="rounded-xl border border-dashed border-border bg-surface/50 p-10 text-center">
						<p className="font-display text-muted">
							Todavía no cargaste ningún filamento.
						</p>
						<button
							type="button"
							onClick={handleCreate}
							className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
						>
							Cargar el primero
						</button>
					</div>
				)}

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

			<FilamentModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				filamentToEdit={filamentToEdit}
			/>
		</div>
	);
}
