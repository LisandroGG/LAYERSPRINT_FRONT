export type Settings = {
	id: number;
	kwhPrice: number;
};

export type SettingsState = {
	data: Settings | null;
	loading: boolean;
	error: string | null;
};
