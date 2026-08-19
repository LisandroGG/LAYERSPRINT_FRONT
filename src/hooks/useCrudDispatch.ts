import type { AppDispatch } from "@redux/store";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useCrudDispatch = () => {
	const dispatch = useDispatch<AppDispatch>();

	const run = async <T>(
		// biome-ignore lint/suspicious/noExplicitAny: necesario para tipado genérico
		action: (payload: T) => any,
		payload?: T,
		// biome-ignore lint/suspicious/noExplicitAny: necesario para tipado genérico
	): Promise<any> => {
		try {
			const result = await dispatch(action(payload as T)).unwrap();

			if (result?.message) {
				toast.success(result.message);
			}

			return result;
		} catch (error) {
			toast.error(typeof error === "string" ? error : "Ocurrió un error");
			throw error;
		}
	};

	return { run };
};

export default useCrudDispatch;
