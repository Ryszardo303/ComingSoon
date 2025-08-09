import { useMemo } from 'react';

type Props = {
	iso?: string; // np. "2025-08-11T11:08:00Z"
	locale?: string; // domyślnie 'pl-PL'
};

export default function LaunchStamp({ iso, locale = 'pl-PL' }: Props) {
	const dateObj = useMemo(() => (iso ? new Date(iso) : null), [iso]);

	const parts = useMemo(() => {
		if (!dateObj || isNaN(dateObj.getTime())) {
			return { date: '—.—', timeH: '—', timeM: '—', timeS: '—', tz: '' };
		}
		const dd = new Intl.DateTimeFormat(locale, { day: '2-digit' }).format(
			dateObj
		);
		const mm = new Intl.DateTimeFormat(locale, { month: '2-digit' }).format(
			dateObj
		);
		const date = `${dd}.${mm}`;

		const hh = new Intl.DateTimeFormat(locale, {
			hour: '2-digit',
			hour12: false,
		}).format(dateObj);
		const min = new Intl.DateTimeFormat(locale, { minute: '2-digit' }).format(
			dateObj
		);
		const ss = new Intl.DateTimeFormat(locale, { second: '2-digit' }).format(
			dateObj
		);

		const tzShort =
			new Intl.DateTimeFormat(locale, { timeZoneName: 'short' })
				.format(dateObj)
				.split(' ')
				.pop() || '';

		return { date, timeH: hh, timeM: min, timeS: ss, tz: tzShort };
	}, [dateObj, locale]);

	// pomocnicze dwukropki z delikatnym pulsem
	const Colon = () => (
		<span className='inline-block px-1 opacity-90 animate-pulse [animation-duration:1.25s]'>
			:
		</span>
	);

	return (
		<div className='mt-8'>
			{/* gradient border + glass */}
			<div className='relative mx-auto w-fit rounded-2xl p-[1.5px] bg-gradient-to-r from-[#7b4cff] via-[#30cfff] to-[#7b4cff]'>
				<div className='rounded-2xl bg-[#0b0f1a]/80 px-6 py-4 backdrop-blur-md'>
					<time
						dateTime={iso || ''}
						className='flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6'
					>
						{/* DATA */}
						<span className='font-mono tabular-nums text-5xl md:text-7xl font-black tracking-tight text-white'>
							{parts.date}
						</span>

						{/* separator (kropeczka) */}
						<span
							aria-hidden
							className='hidden sm:inline-block h-4 w-4 rounded-full bg-gradient-to-br from-[#7b4cff] to-[#30cfff] opacity-80'
						/>

						{/* GODZINA */}
						<span className='font-mono tabular-nums text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#7b4cff] to-[#30cfff] bg-clip-text text-transparent leading-none'>
							{parts.timeH}
							<Colon />
							{parts.timeM}
							<Colon />
							{parts.timeS}
						</span>

						{/* strefa czasowa */}
						{parts.tz && (
							<span className='text-xs md:text-sm text-white/60 sm:ml-2'>
								{parts.tz}
							</span>
						)}
					</time>
				</div>

				{/* soft glow ring */}
				<div
					aria-hidden
					className='pointer-events-none absolute -inset-5 -z-10 rounded-[28px] blur-3xl'
					style={{
						background:
							'radial-gradient(closest-side, rgba(123,76,255,0.28), transparent 70%)',
					}}
				/>
			</div>
		</div>
	);
}
