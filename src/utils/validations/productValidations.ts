export type ProductErrors = {
	name?: string;
	machineId?: string;
	timeToPrint?: string;
	filaments?: string;
};

type ValidateProductParams = {
	name: string;
	machineId: number | "";
	timeToPrint: number;
	hasValidFilaments: boolean;
};

export const validateProduct = ({
	name,
	machineId,
	timeToPrint,
	hasValidFilaments,
}: ValidateProductParams): ProductErrors => {
	const errors: ProductErrors = {};

	if (!name.trim()) errors.name = "El nombre es obligatorio";
	if (!machineId) errors.machineId = "Elegí una máquina";
	if (timeToPrint <= 0) errors.timeToPrint = "Tiene que ser mayor a 0";
	if (!hasValidFilaments)
		errors.filaments = "Agregá al menos un filamento con gramos";

	return errors;
};
