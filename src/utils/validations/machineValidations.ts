import type { MachineInput } from "@redux/features/machines/machineTypes";

export type MachineErrors = Partial<Record<keyof MachineInput, string>>;

export const validateMachine = (form: MachineInput): MachineErrors => {
	const errors: MachineErrors = {};

	if (!form.name.trim()) errors.name = "El nombre es obligatorio";
	if (form.watts <= 0) errors.watts = "Tiene que ser mayor a 0";
	if (form.depreciationPerHour < 0)
		errors.depreciationPerHour = "No puede ser negativo";

	return errors;
};
