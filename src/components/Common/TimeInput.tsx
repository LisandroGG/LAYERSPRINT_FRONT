type TimeInputProps = {
	valueInMinutes: number;
	onChange: (totalMinutes: number) => void;
	hasError?: boolean;
};

const TimeInput = ({ valueInMinutes, onChange, hasError }: TimeInputProps) => {
	const hours = Math.floor(valueInMinutes / 60);
	const minutes = valueInMinutes % 60;

	const handleHoursChange = (raw: string) => {
		if (!/^\d*$/.test(raw)) return;
		const newHours = raw === "" ? 0 : Number(raw);
		onChange(newHours * 60 + minutes);
	};

	const handleMinutesChange = (raw: string) => {
		if (!/^\d*$/.test(raw)) return;
		const capped = raw === "" ? 0 : Math.min(Number(raw), 59);
		onChange(hours * 60 + capped);
	};

	const borderClass = hasError ? "border-danger" : "border-border";

	return (
		<div className="flex gap-2">
			<div className="flex-1">
				<div
					className={`flex items-center rounded-lg border bg-ink px-3 focus-within:border-brand ${borderClass}`}
				>
					<input
						type="text"
						inputMode="numeric"
						value={hours || ""}
						onChange={(e) => handleHoursChange(e.target.value)}
						placeholder="0"
						className="w-full bg-transparent py-2 font-mono text-white outline-none"
					/>
					<span className="text-sm text-muted">h</span>
				</div>
			</div>
			<div className="flex-1">
				<div
					className={`flex items-center rounded-lg border bg-ink px-3 focus-within:border-brand ${borderClass}`}
				>
					<input
						type="text"
						inputMode="numeric"
						value={minutes || ""}
						onChange={(e) => handleMinutesChange(e.target.value)}
						placeholder="0"
						className="w-full bg-transparent py-2 font-mono text-white outline-none"
					/>
					<span className="text-sm text-muted">min</span>
				</div>
			</div>
		</div>
	);
};

export default TimeInput;
