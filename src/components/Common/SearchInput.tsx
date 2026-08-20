import { Search, X } from "lucide-react";
import { useState } from "react";

type SearchInputProps = {
	placeholder?: string;
	onSearch: (value: string) => void;
};

export default function SearchInput({
	placeholder = "Buscar...",
	onSearch,
}: SearchInputProps) {
	const [value, setValue] = useState("");

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onSearch(value.trim());
		}
	};

	const handleClear = () => {
		setValue("");
		onSearch("");
	};

	return (
		<div className="relative">
			<Search
				size={16}
				className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
			/>

			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				className="w-full rounded-lg border border-border bg-ink py-2 pl-9 pr-9 text-sm text-white outline-none focus:border-brand"
			/>

			{value && (
				<button
					type="button"
					onClick={handleClear}
					className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted transition-colors hover:text-white"
					aria-label="Limpiar búsqueda"
				>
					<X size={16} />
				</button>
			)}
		</div>
	);
}
