import { useState } from 'react'
import { useAppSelector } from '@redux/hooks'
import useCrudDispatch from '@hooks/useCrudDispatch'
import usePagination from '@hooks/usePagination'
import { fetchFilaments, deleteFilament } from '@redux/features/filaments/filamentThunks'
import type { Filament } from '@redux/features/filaments/filamentTypes'
import PageHeader from '@components/PageHeader/PageHeader'
import Pagination from '../../components/Common/Pagination'
import FilamentCard from './FilamentCard'
import FilamentModal from './modals/FilamentModal'

export default function FilamentsPage() {
	const { run } = useCrudDispatch()
	const { items: filaments } = useAppSelector((state) => state.filaments)
	const { page, totalPages, hasNext, hasPrev, loading, goToPage } = usePagination(
		(state) => state.filaments,
		fetchFilaments,
	)

	const [modalOpen, setModalOpen] = useState(false)
	const [filamentToEdit, setFilamentToEdit] = useState<Filament | null>(null)

	function handleCreate() {
		setFilamentToEdit(null)
		setModalOpen(true)
	}

	function handleEdit(filament: Filament) {
		setFilamentToEdit(filament)
		setModalOpen(true)
	}

	async function handleDelete(filament: Filament) {
		const confirmed = window.confirm(`¿Eliminar "${filament.brand} - ${filament.color}"?`)
		if (!confirmed) return
		await run(deleteFilament, filament.id)
	}

	return (
		<div>
			<PageHeader
				title="Filamentos"
				action={
					<button
						onClick={handleCreate}
						className="cursor-pointer rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
					>
						+ Nuevo filamento
					</button>
				}
			/>

			<div className="p-6">
				{loading && <p className="font-mono text-sm text-muted">Cargando...</p>}

				{!loading && filaments.length === 0 && (
					<div className="rounded-xl border border-dashed border-border bg-surface/50 p-10 text-center">
						<p className="font-display text-muted">Todavía no cargaste ningún filamento.</p>
						<button
							onClick={handleCreate}
							className="mt-4 cursor-pointer rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
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

				{!loading && filaments.length > 0 && (
					<div className="mt-6">
						<Pagination
							page={page}
							totalPages={totalPages}
							hasNext={hasNext}
							hasPrev={hasPrev}
							onPageChange={goToPage}
						/>
					</div>
				)}
			</div>

			<FilamentModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				filamentToEdit={filamentToEdit}
			/>
		</div>
	)
}