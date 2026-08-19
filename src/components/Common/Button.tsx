type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "ghost" | "danger" | "outline";
	size?: "sm" | "md";
};

const variantClasses = {
	primary: "bg-brand text-white hover:bg-brand-dark disabled:opacity-40",
	ghost:
		"text-muted hover:bg-surface-hover hover:text-white disabled:opacity-30 disabled:hover:bg-transparent",
	danger:
		"border border-danger/40 text-danger hover:bg-danger/10 disabled:opacity-40",
	outline:
		"border border-border text-white hover:bg-surface-hover disabled:opacity-40",
};

const sizeClasses = {
	sm: "px-3 py-1.5 text-sm",
	md: "px-4 py-2 text-sm",
};

export default function Button({
	variant = "primary",
	size = "md",
	className = "",
	disabled,
	...props
}: ButtonProps) {
	return (
		<button
			disabled={disabled}
			className={`cursor-pointer rounded-lg font-medium transition-colors disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
			{...props}
		/>
	);
}
