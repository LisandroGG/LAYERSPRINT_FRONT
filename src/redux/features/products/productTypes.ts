export type ProductFilamentEntry = {
	filamentId: number;
	gramsUsed: number;
};

export type ProductCost = {
	materialCost: number;
	energyCost: number;
	machineCost: number;
	total: number;
};

export type Product = {
	id: number;
	name: string;
	weight: number;
	timeToPrint: number;
	laborCost: number;
	extras: number;
	machineId: number;
	imageUrl: string | null;
	imagePublicId: string | null;
	cost?: ProductCost;
};

export type ProductInput = {
	name: string;
	timeToPrint: number;
	laborCost: number;
	extras: number;
	machineId: number;
	filaments: ProductFilamentEntry[];
	image?: File;
};

export type ProductState = {
	items: Product[];
	selected: Product | null;
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNext: boolean;
	hasPrev: boolean;
	loading: boolean;
	error: string | null;
};
