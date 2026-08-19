import { useEffect } from "react";

type ImageLightboxProps = {
	src: string;
	alt: string;
	onClose: () => void;
};

export default function ImageLightbox({
	src,
	alt,
	onClose,
}: ImageLightboxProps) {
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: es el backdrop, el cierre por teclado ya está cubierto por el listener de Escape
		// biome-ignore lint/a11y/useKeyWithClickEvents: mismo motivo
		<div
			onClick={onClose}
			className="fixed inset-0 z-60 flex items-center justify-center bg-ink/95 p-6"
		>
			<button
				type="button"
				onClick={onClose}
				className="absolute right-6 top-6 cursor-pointer rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-white hover:bg-surface-hover"
			>
				✕ Cerrar
			</button>

			{/* biome-ignore lint/a11y/useKeyWithClickEvents: solo frena la propagación del click hacia el backdrop, no es una acción en sí misma */}
			<img
				src={src}
				alt={alt}
				onClick={(e) => e.stopPropagation()}
				className="max-h-full max-w-full rounded-lg object-contain"
			/>
		</div>
	);
}
