type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'ghost' | 'danger'
}

const variantClasses = {
	primary: 'bg-brand text-white hover:bg-brand-dark disabled:opacity-40',
	ghost: 'text-muted hover:bg-surface-hover hover:text-white disabled:opacity-30 disabled:hover:bg-transparent',
	danger: 'border border-danger/40 text-danger hover:bg-danger/10 disabled:opacity-40',
}

export default function Button({ variant = 'primary', className = '', disabled, ...props }: ButtonProps) {
	return (
		<button
			disabled={disabled}
			className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
			{...props}
		/>
	)
}