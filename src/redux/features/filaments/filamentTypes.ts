export type Filament = {
	id: number;
	brand: string;
	material: string;
	diameter: number;
	color: string;
	pricePerKg: number;
};

export type FilamentInput = Omit<Filament, "id">;

export type FilamentState = {
	items: Filament[];
	selected: Filament | null;
	total: number;
	page: number;
	loading: boolean;
	error: string | null;
};
