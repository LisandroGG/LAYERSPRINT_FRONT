import Button from "@components/Common/Button";

type ConfirmModalProps = {
	open: boolean;
	title: string;
	message: string;
	confirmLabel?: string;
	onConfirm: () => void;
	onCancel: () => void;
	loading?: boolean;
};

export default function ConfirmModal({
	open,
	title,
	message,
	confirmLabel = "Eliminar",
	onConfirm,
	onCancel,
	loading = false,
}: ConfirmModalProps) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-70 flex items-center justify-center bg-ink/80 p-4">
			<div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-xl">
				<h2 className="font-display text-lg font-semibold text-white">
					{title}
				</h2>
				<p className="mt-2 text-sm text-muted">{message}</p>

				<div className="mt-6 flex justify-end gap-2">
					<Button onClick={onCancel} variant="ghost">
						Cancelar
					</Button>
					<Button onClick={onConfirm} variant="danger" disabled={loading}>
						{loading ? "Eliminando..." : confirmLabel}
					</Button>
				</div>
			</div>
		</div>
	);
}
