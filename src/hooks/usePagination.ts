import type { AppDispatch, RootState } from "@redux/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type PaginationState = {
	totalPages: number;
	hasNext: boolean;
	hasPrev: boolean;
	loading: boolean;
};
// biome-ignore lint/suspicious/noExplicitAny: necesario para tipado genérico
type FetchAction = (params: Record<string, unknown>) => any;

const usePagination = (
	selector: (state: RootState) => PaginationState,
	fetchAction: FetchAction,
) => {
	const dispatch = useDispatch<AppDispatch>();
	const { totalPages, hasNext, hasPrev, loading } = useSelector(selector);

	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState<Record<string, unknown>>({});

	useEffect(() => {
		dispatch(fetchAction({ page, ...filters }));
	}, [dispatch, fetchAction, page, filters]);

	const goToPage = useCallback(
		(newPage: number) => {
			if (newPage < 1 || newPage > totalPages) return;
			setPage(newPage);
		},
		[totalPages],
	);

	const next = useCallback(() => {
		if (hasNext) setPage((p) => p + 1);
	}, [hasNext]);

	const prev = useCallback(() => {
		if (hasPrev) setPage((p) => p - 1);
	}, [hasPrev]);

	const applyFilters = useCallback((newFilters: Record<string, unknown>) => {
		setPage(1);
		setFilters(newFilters || {});
	}, []);

	const clearFilters = useCallback(() => {
		setPage(1);
		setFilters({});
	}, []);

	const refresh = useCallback(() => {
		dispatch(fetchAction({ page, ...filters }));
	}, [dispatch, fetchAction, page, filters]);

	return {
		page,
		totalPages,
		hasNext,
		hasPrev,
		loading,
		goToPage,
		next,
		prev,
		applyFilters,
		clearFilters,
		filters,
		refresh,
	};
};

export default usePagination;
