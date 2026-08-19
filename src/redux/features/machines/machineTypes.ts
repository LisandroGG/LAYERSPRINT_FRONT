export type Machine = {
	id: number;
	name: string;
	watts: number;
	depreciationPerHour: number;
};

export type MachineInput = Omit<Machine, "id">;

export type MachineState = {
	items: Machine[];
	selected: Machine | null;
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNext: boolean;
	hasPrev: boolean;
	loading: boolean;
	error: string | null;
};
