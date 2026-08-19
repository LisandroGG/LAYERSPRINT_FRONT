import { useState } from 'react'
import { useAppSelector } from '@redux/hooks'
import useCrudDispatch from '@hooks/useCrudDispatch'
import usePagination from '@hooks/usePagination'
import { fetchMachines, deleteMachine } from '@redux/features/machines/machineThunks'
import type { Machine } from '@redux/features/machines/machineTypes'
import PageHeader from '@components/PageHeader/PageHeader'
import Pagination from '../../components/Common/Pagination'
import MachineCard from './MachineCard'
import MachineModal from './modals/MachineModal'

export default function MachinesPage() {
	const { run } = useCrudDispatch()
	const { items: machines } = useAppSelector((state) => state.machines)
	const { page, totalPages, hasNext, hasPrev, loading, goToPage } = usePagination(
		(state) => state.machines,
		fetchMachines,
	)

	const [modalOpen, setModalOpen] = useState(false)
	const [machineToEdit, setMachineToEdit] = useState<Machine | null>(null)

	function handleCreate() {
		setMachineToEdit(null)
		setModalOpen(true)
	}

	function handleEdit(machine: Machine) {
		setMachineToEdit(machine)
		setModalOpen(true)
	}

	async function handleDelete(machine: Machine) {
		const confirmed = window.confirm(`¿Eliminar la máquina "${machine.name}"?`)
		if (!confirmed) return
		await run(deleteMachine, machine.id)
	}

	return (
		<div>
			<PageHeader
				title="Máquinas"
				action={
					<button
						onClick={handleCreate}
						className="cursor-pointer rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
					>
						+ Nueva máquina
					</button>
				}
			/>

			<div className="p-6">
				{loading && <p className="font-mono text-sm text-muted">Cargando...</p>}

				{!loading && machines.length === 0 && (
					<div className="rounded-xl border border-dashed border-border bg-surface/50 p-10 text-center">
						<p className="font-display text-muted">Todavía no cargaste ninguna máquina.</p>
						<button
							onClick={handleCreate}
							className="mt-4 cursor-pointer rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
						>
							Cargar la primera
						</button>
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

				{!loading && machines.length > 0 && (
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

			<MachineModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				machineToEdit={machineToEdit}
			/>
		</div>
	)
}
