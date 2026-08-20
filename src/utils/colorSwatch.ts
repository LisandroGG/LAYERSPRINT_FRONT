const COLOR_MAP: Record<string, string> = {
	// ─────────────────────────────────────
	// BÁSICOS
	// ─────────────────────────────────────
	negro: "#000000",
	blanco: "#FFFFFF",
	rojo: "#C12E1F",
	azul: "#0A2989",
	verde: "#00AE42",
	amarillo: "#F4EE2A",
	naranja: "#FF6A13",
	gris: "#8E9089",
	"gris claro": "#D1D3D5",
	"gris oscuro": "#545454",
	rosa: "#F55A74",
	"rosa fuerte": "#F5547C",
	violeta: "#5E43B7",
	morado: "#5E43B7",
	lila: "#C77DFF",
	marron: "#9D432C",
	marrón: "#9D432C",

	// ─────────────────────────────────────
	// ROJOS
	// ─────────────────────────────────────
	"rojo fluorescente": "#FF3131",
	"rojo translúcido": "#D62828",
	"rojo oscuro": "#8B0000",
	"rojo vino": "#722F37",
	"rojo borgoña": "#800020",
	"rojo carmín": "#960018",
	"rojo carmesi": "#960018",
	"rojo cereza": "#DE3163",
	"rojo coral": "#FF6F61",
	"rojo ladrillo": "#CB4154",
	maroon: "#9D2235",
	"maroon red": "#9D2235",

	// ─────────────────────────────────────
	// NARANJAS
	// ─────────────────────────────────────
	"naranja fluorescente": "#FF5F1F",
	"naranja translúcido": "#FF8C42",
	"naranja oscuro": "#C24100",
	"naranja pastel": "#FFD0A8",
	"naranja calabaza": "#FF7518",
	"pumpkin orange": "#FF9016",

	// ─────────────────────────────────────
	// AMARILLOS
	// ─────────────────────────────────────
	"amarillo fluorescente": "#F4FF00",
	"amarillo translúcido": "#FFF44F",
	"amarillo pastel": "#FFF3A3",
	"amarillo limón": "#FFF44F",
	"amarillo mostaza": "#D4A017",
	"amarillo dorado": "#E5B80B",
	"amarillo girasol": "#FEC600",
	"sunflower yellow": "#FEC600",
	girasol: "#FEC600",
	topacio: "#F2C14E",
	topaz: "#F2C14E",

	// ─────────────────────────────────────
	// VERDES
	// ─────────────────────────────────────
	"verde fluorescente": "#39FF14",
	"verde translúcido": "#3CB371",
	"verde manzana": "#8DB600",
	"verde ninja": "#3F8E43",
	"verde oscuro": "#176B2C",
	"verde claro": "#74C69D",
	"verde pastel": "#A8D5BA",
	"verde lima": "#84CC16",
	"verde oliva": "#808000",
	"verde militar": "#4B5320",
	"verde bosque": "#228B22",
	"verde esmeralda": "#50C878",
	"verde jade": "#00A86B",
	"verde menta": "#98FF98",
	"verde agua": "#7FFFD4",
	"verde botella": "#006A4E",
	"verde neón": "#39FF14",
	"verde brillante": "#BECF00",
	"bright green": "#BECF00",
	esmeralda: "#50C878",
	emerald: "#50C878",
	jade: "#00A86B",
	menta: "#98FF98",
	musgo: "#8A9A5B",
	oliva: "#808000",
	kriptonita: "#BECF00",

	// ─────────────────────────────────────
	// CIAN / TURQUESA / ACQUA
	// ─────────────────────────────────────
	acqua: "#00B1B7",
	agua: "#00B1B7",
	aguamarina: "#7FFFD4",
	cian: "#0086D6",
	aqua: "#00FFFF",
	turquesa: "#00B1B7",
	"turquesa claro": "#7FFFD4",
	"turquesa oscuro": "#008B8B",
	"verde acqua": "#50C878",

	// ─────────────────────────────────────
	// CELESTES
	// ─────────────────────────────────────
	celeste: "#6EC6E8",
	"celeste claro": "#87CEEB",
	"celeste pastel": "#A7D8F0",
	"azul cielo": "#87CEEB",
	"azul bebé": "#89CFF0",
	"azul hielo": "#D6F0FF",

	// ─────────────────────────────────────
	// AZULES
	// ─────────────────────────────────────
	"azul fluorescente": "#0066FF",
	"azul translúcido": "#3A75C4",
	"azul oscuro": "#163A70",
	"azul claro": "#6FA8DC",
	"azul pastel": "#A7C7E7",
	"azul marino": "#000080",
	"azul eléctrico": "#0066FF",
	"azul real": "#4169E1",
	"azul rey": "#4169E1",
	"azul cobalto": "#0056B8",
	"cobalt blue": "#0056B8",
	cobalto: "#0056B8",
	"azul petróleo": "#005F6A",
	"azul acero": "#4682B4",
	"azul zafiro": "#0F52BA",
	zafiro: "#0F52BA",
	sapphire: "#0F52BA",
	"azul noche": "#191970",
	"azul navy": "#000080",
	"azul paL": "#4169A1",

	// ─────────────────────────────────────
	// VIOLETAS / MORADOS / LILAS
	// ─────────────────────────────────────
	"violeta oscuro": "#4B0082",
	"violeta claro": "#A78BFA",
	"violeta pastel": "#C8A2C8",
	"violeta eléctrico": "#8F00FF",

	"morado oscuro": "#4B0082",
	"morado claro": "#A78BFA",
	"morado pastel": "#CDB4DB",

	"lila claro": "#DDB5FF",
	"lila oscuro": "#9B59B6",
	"lila pastel": "#E6CCFF",

	amatista: "#5E43B7",
	amethyst: "#5E43B7",
	"indigo purple": "#482960",
	índigo: "#482960",
	indigo: "#482960",
	ciruela: "#8E4585",
	uva: "#6F2DA8",
	"uva metalizado": "#6F2DA8",

	// ─────────────────────────────────────
	// ROSAS / FUCSIAS
	// ─────────────────────────────────────
	"rosa claro": "#FFB6C1",
	"rosa oscuro": "#C2185B",
	"rosa pastel": "#FFD1DC",
	"rosa bebé": "#F4C2C2",
	"rosa chicle": "#FF69B4",
	"rosa viejo": "#C08081",
	"rosa salmón": "#FA8072",
	salmon: "#FA8072",
	salmón: "#FA8072",
	"hot pink": "#F5547C",
	magenta: "#EC008C",
	fucsia: "#EC008C",
	"fucsia fluorescente": "#FF00FF",

	// ─────────────────────────────────────
	// CORALES
	// ─────────────────────────────────────
	coral: "#FF7F50",
	"coral claro": "#FF8A7A",
	"coral pastel": "#FFA69E",
	"coral fuerte": "#FF6F61",

	// ─────────────────────────────────────
	// MARRONES / TIERRA
	// ─────────────────────────────────────
	"marron claro": "#B88A65",
	"marrón claro": "#B88A65",
	"marron oscuro": "#5C4033",
	"marrón oscuro": "#5C4033",
	chocolate: "#6F5034",
	"cocoa brown": "#6F5034",
	cocoa: "#6F5034",
	cafe: "#6F4E37",
	café: "#6F4E37",
	beige: "#F7E6DE",
	crema: "#FFFDD0",
	marfil: "#FFFFF0",
	piedra: "#A89F91",
	piel: "#E8B88A",
	tan: "#D2B48C",
	terracota: "#E2725B",
	canela: "#D2691E",
	arcilla: "#B66A50",
	"marrón arcilla": "#B66A50",

	// ─────────────────────────────────────
	// METÁLICOS
	// ─────────────────────────────────────
	dorado: "#E4BD68",
	oro: "#E4BD68",
	plateado: "#A6A9AA",
	plata: "#A6A9AA",
	bronce: "#847D48",
	cobre: "#B87333",
	"oro metalizado": "#E4BD68",
	"dorado metalizado": "#E4BD68",
	"plata metalizado": "#A6A9AA",
	"cobre metalizado": "#B87333",
	"cobalto metalizado": "#0056B8",
	safranometalizado: "#D4A017",
	"safrano metalizado": "#D4A017",
	"verde militar metalizado": "#4B5320",
	"kriptonita metalizado": "#BECF00",

	// ─────────────────────────────────────
	// NATURALES / TRANSLÚCIDOS
	// ─────────────────────────────────────
	natural: "#E8DCC4",
	"natural translúcido": "#E8DCC4",
	transparente: "#DEE2E6",
	"transparente natural": "#E8DCC4",
	"blanco cálido": "#FFF8E7",
	ámbar: "#FFBF00",
	ambar: "#FFBF00",
	"ámbar translúcido": "#FFBF00",
};

export const getColorHex = (colorName: string) => {
	const key = colorName
		.trim()
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");

	const normalizedMap = Object.entries(COLOR_MAP)
		.map(
			([name, hex]) =>
				[name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), hex] as const,
		)
		.sort(([a], [b]) => b.length - a.length);

	const exact = normalizedMap.find(([name]) => name === key);

	if (exact) {
		return exact[1];
	}

	const match = normalizedMap.find(([name]) => key.includes(name));

	return match?.[1] ?? "#556080";
};
