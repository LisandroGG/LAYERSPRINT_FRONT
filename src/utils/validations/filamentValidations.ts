import type { FilamentInput } from "@redux/features/filaments/filamentTypes";

export type FilamentErrors = Partial<Record<keyof FilamentInput, string>>;

export const validateFilament = (form: FilamentInput): FilamentErrors => {
	const errors: FilamentErrors = {};

	if (!form.brand.trim()) errors.brand = "La marca es obligatoria";
	if (!form.color.trim()) errors.color = "El color es obligatorio";
	if (form.diameter <= 0) errors.diameter = "Tiene que ser mayor a 0";
	if (form.pricePerKg <= 0) errors.pricePerKg = "Tiene que ser mayor a 0";

	return errors;
};
