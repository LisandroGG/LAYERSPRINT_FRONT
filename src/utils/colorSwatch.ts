const COLOR_MAP: Record<string, string> = {
	negro: "#111111",
	blanco: "#f5f5f5",
	rojo: "#d62828",
	azul: "#2f59a5",
	verde: "#2f9e44",
	amarillo: "#f6c000",
	naranja: "#f76707",
	gris: "#868e96",
	rosa: "#f06595",
	violeta: "#7048e8",
	morado: "#7048e8",
	marron: "#8b5e34",
	marrón: "#8b5e34",
	dorado: "#c9a227",
	plateado: "#adb5bd",
	transparente: "#dee2e6",
};

export function getColorHex(colorName: string) {
	const key = colorName.trim().toLowerCase();
	return COLOR_MAP[key] ?? "#556080";
}
