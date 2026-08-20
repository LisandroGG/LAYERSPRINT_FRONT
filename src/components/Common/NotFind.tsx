import { SearchX } from "lucide-react";

type NotFindProps = {
	entity: string;
	gender?: "masculine" | "feminine";
};

const NotFind = ({ entity, gender = "masculine" }: NotFindProps) => {
	const article = gender === "feminine" ? "ninguna" : "ningún";

	return (
		<div className="flex h-full flex-col items-center justify-center text-center">
			<div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface">
				<SearchX size={24} className="text-muted" />
			</div>
			<p className="mt-4 font-display text-base font-semibold text-white">
				No se ha encontrado {article} {entity}
			</p>
		</div>
	);
};

export default NotFind;
