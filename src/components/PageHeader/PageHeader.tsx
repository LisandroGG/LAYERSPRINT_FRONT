type PageHeaderProps = {
	title: string;
	action?: React.ReactNode;
};

const PageHeader = ({ title, action }: PageHeaderProps) => {
	return (
		<div className="flex items-center justify-between border-b border-border px-6 py-4">
			<h1 className="font-display text-lg font-semibold text-white">{title}</h1>
			{action}
		</div>
	);
};

export default PageHeader;
