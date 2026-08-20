type TimeInputProps = {
	valueInMinutes: number;
	onChange: (totalMinutes: number) => void;
};

const TimeInput = ({ valueInMinutes, onChange }: TimeInputProps) => {
	const hours = Math.floor(valueInMinutes / 60);
	const minutes = valueInMinutes % 60;

	function handleHoursChange(newHours: number) {
		onChange(newHours * 60 + minutes);
	}

	function handleMinutesChange(newMinutes: number) {
		onChange(hours * 60 + newMinutes);
	}

	return (
		<div className="flex gap-2">
			<div className="flex-1">
				<div className="flex items-center rounded-lg border border-border bg-ink px-3 focus-within:border-brand">
					<input
						type="number"
						min={0}
						value={hours || ""}
						onChange={(e) => handleHoursChange(Number(e.target.value) || 0)}
						placeholder="0"
						className="w-full bg-transparent py-2 font-mono text-white outline-none"
					/>
					<span className="text-sm text-muted">h</span>
				</div>
			</div>
			<div className="flex-1">
				<div className="flex items-center rounded-lg border border-border bg-ink px-3 focus-within:border-brand">
					<input
						type="number"
						min={0}
						max={59}
						value={minutes || ""}
						onChange={(e) => handleMinutesChange(Number(e.target.value) || 0)}
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
