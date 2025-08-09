import { useEffect, useMemo, useState } from 'react';

type Props = { target: string | Date };

function pad(n: number) {
	return n < 10 ? `0${n}` : String(n);
}

export default function Countdown({ target }: Props) {
	const targetDate = useMemo(() => new Date(target), [target]);
	const [now, setNow] = useState(() => Date.now());

	// tick co 1s
	useEffect(() => {
		const id = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(id);
	}, []);

	const diff = Math.max(0, targetDate.getTime() - now);

	const secondsTotal = Math.floor(diff / 1000);
	const days = Math.floor(secondsTotal / (24 * 3600));
	const hours = Math.floor((secondsTotal % (24 * 3600)) / 3600);
	const minutes = Math.floor((secondsTotal % 3600) / 60);
	const seconds = secondsTotal % 60;

	return (
		<div className='mt-6 grid grid-cols-4 gap-3 text-center max-w-md'>
			<TimeBox label='Days' value={days} />
			<TimeBox label='Hours' value={hours} />
			<TimeBox label='Minutes' value={minutes} />
			<TimeBox label='Seconds' value={seconds} />
		</div>
	);
}

function TimeBox({ label, value }: { label: string; value: number }) {
	return (
		<div className='rounded-xl border border-white/10 bg-white/5 px-4 py-3'>
			<div className='text-3xl font-extrabold tabular-nums'>{pad(value)}</div>
			<div className='mt-1 text-xs uppercase tracking-wide text-white/60'>
				{label}
			</div>
		</div>
	);
}
