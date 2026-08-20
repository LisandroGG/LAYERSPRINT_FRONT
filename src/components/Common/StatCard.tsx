import type { LucideIcon } from "lucide-react";

type StatCardProps = {
	icon: LucideIcon;
	label: string;
	value: number;
};

const StatCard = ({ icon: Icon, label, value }: StatCardProps) => {
	return (
		<div className="rounded-xl border border-border bg-surface p-5">
			<div className="flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
					<Icon size={20} className="text-brand-light" />
				</div>
				<div>
					<p className="font-mono text-2xl font-semibold text-white">{value}</p>
					<p className="text-sm text-muted">{label}</p>
				</div>
			</div>
		</div>
	);
};
export default StatCard;
