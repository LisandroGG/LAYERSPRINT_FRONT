type PageHeaderProps = {
	title: string;
	children?: React.ReactNode;
};

const PageHeader = ({ title, children }: PageHeaderProps) => {
	return (
		<div className="flex items-center justify-between border-b border-border px-6 py-4">
			<h1 className="font-display text-lg font-semibold text-white">{title}</h1>

			<div className="flex items-center gap-3">{children}</div>
		</div>
	);
};

export default PageHeader;
