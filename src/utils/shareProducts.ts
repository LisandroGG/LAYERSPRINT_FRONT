import type { Product } from "@redux/features/products/productTypes";

const shareProduct = async (product: Product, price: number) => {
	const text = `${product.name} - $${price.toLocaleString("es-AR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;

	if (product.imageUrl) {
		try {
			const response = await fetch(product.imageUrl);
			const blob = await response.blob();
			const file = new File([blob], `${product.name}.jpg`, { type: blob.type });

			if (navigator.canShare?.({ files: [file] })) {
				await navigator.share({ files: [file], title: product.name, text });
				return { shared: true };
			}
		} catch (error) {
			if ((error as Error).name === "AbortError")
				return { shared: false, cancelled: true };
		}
	}

	if (navigator.share) {
		try {
			await navigator.share({ title: product.name, text });
			return { shared: true };
		} catch (error) {
			if ((error as Error).name === "AbortError")
				return { shared: false, cancelled: true };
		}
	}

	await navigator.clipboard.writeText(text);
	return { shared: false, copied: true };
};

export default shareProduct;
