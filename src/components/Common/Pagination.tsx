import Button from "@components/Common/Button";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

type PaginationProps = {
	page: number;
	totalPages: number;
	hasNext: boolean;
	hasPrev: boolean;
	onPageChange: (page: number) => void;
};

const Pagination = ({
	page,
	totalPages,
	hasNext,
	hasPrev,
	onPageChange,
}: PaginationProps) => {
	return (
		<div className="flex items-center justify-center gap-1">
			<Button
				variant="ghost"
				title="Primera página"
				disabled={!hasPrev}
				onClick={() => onPageChange(1)}
				aria-label="Primera página"
			>
				<ChevronsLeft size={14} />
			</Button>
			<Button
				variant="ghost"
				title="Página anterior"
				disabled={page === 1}
				onClick={() => onPageChange(page - 1)}
				aria-label="Anterior página"
			>
				<ChevronLeft size={14} />
			</Button>
			<span>
				<span>{page}</span> de {totalPages || 1}
			</span>
			<Button
				variant="ghost"
				title="Siguiente página"
				disabled={!hasNext}
				onClick={() => onPageChange(page + 1)}
				aria-label="Siguiente página"
			>
				<ChevronRight size={14} />
			</Button>
			<Button
				variant="ghost"
				title="Última página"
				disabled={page === totalPages}
				onClick={() => onPageChange(totalPages)}
				aria-label="Ultima página"
			>
				<ChevronsRight size={14} />
			</Button>
		</div>
	);
};

export default Pagination;
