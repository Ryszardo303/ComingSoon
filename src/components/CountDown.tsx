import { useEffect, useMemo, useState } from 'react';

type Props = { target: string | Date };

function pad2(n: number) {
	return n < 10 ? `0${n}` : String(n);
}

export default function Countdown({ target }: Props) {
	const targetDate = useMemo(() => new Date(target), [target]);
	const [now, setNow] = useState(() => Date.now());

	useEffect(() => {
		const id = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(id);
	}, []);

	const diff = Math.max(0, (targetDate?.getTime?.() ?? 0) - now);
	const secondsTotal = Math.floor(diff / 1000);

	const days = Math.floor(secondsTotal / (24 * 3600));
	const hours = Math.floor((secondsTotal % (24 * 3600)) / 3600);
	const minutes = Math.floor((secondsTotal % 3600) / 60);
	const seconds = secondsTotal % 60;

	const isLive = secondsTotal <= 0 || Number.isNaN(secondsTotal);

	return (
		<div className='w-full'>
			<div
				className='
          mx-auto
          grid grid-cols-2 sm:grid-cols-4
          gap-3 sm:gap-4 lg:gap-6
          max-w-sm sm:max-w-xl lg:max-w-2xl
          text-center
        '
				aria-live='polite'
			>
				{isLive ? (
					<div className='col-span-2 sm:col-span-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 lg:px-6 lg:py-5'>
						<div className='text-emerald-300 font-semibold lg:text-base'>
							We’re live! 🎉
						</div>
					</div>
				) : (
					<>
						<TimeBox label='Days' value={days} />
						<TimeBox label='Hours' value={hours} />
						<TimeBox label='Minutes' value={minutes} />
						<TimeBox label='Seconds' value={seconds} />
					</>
				)}
			</div>
		</div>
	);
}

function TimeBox({ label, value }: { label: string; value: number }) {
	// zawsze 2 cyfry (stabilna szerokość znaków)
	const display = pad2(value);

	return (
		<div
			className='
        rounded-2xl border border-white/10 bg-white/5
        px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5
        transition-colors hover:bg-white/[0.07]
        min-h-[92px] sm:min-h-[104px] lg:min-h-[128px]
      '
		>
			<div className='flex h-full flex-col items-center justify-center'>
				<div
					className='
            font-mono tabular-nums font-extrabold tracking-tight leading-none
            text-3xl sm:text-4xl lg:text-6xl
            min-w-[4.6ch] sm:min-w-[5ch] lg:min-w-[5.4ch]
            select-none
          '
				>
					{display}
				</div>
				<div
					className='
            mt-2 text-[10px] sm:text-xs lg:text-sm
            uppercase tracking-wide text-white/60
          '
				>
					{label}
				</div>
			</div>
		</div>
	);
}
