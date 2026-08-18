import type { AppDispatch, RootState } from "@redux/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type PaginationState = {
	page: number;
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
	const { page, totalPages, hasNext, hasPrev, loading } = useSelector(selector);

	const [filters, setFilters] = useState<Record<string, unknown>>({});

	useEffect(() => {
		dispatch(fetchAction({ page, ...filters }));
	}, [dispatch, fetchAction, page, filters]);

	const goToPage = useCallback(
		(newPage: number) => {
			if (newPage < 1 || newPage > totalPages) return;
			dispatch(fetchAction({ page: newPage, ...filters }));
		},
		[dispatch, fetchAction, totalPages, filters],
	);

	const next = useCallback(() => {
		if (hasNext) {
			dispatch(fetchAction({ page: page + 1, ...filters }));
		}
	}, [dispatch, fetchAction, hasNext, page, filters]);

	const prev = useCallback(() => {
		if (hasPrev) {
			dispatch(fetchAction({ page: page - 1, ...filters }));
		}
	}, [dispatch, fetchAction, hasPrev, page, filters]);

	const applyFilters = useCallback((newFilters: Record<string, unknown>) => {
		setFilters(newFilters || {});
	}, []);

	const clearFilters = useCallback(() => {
		setFilters({});
	}, []);

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
	};
};

export default usePagination;
