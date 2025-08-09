import { useMemo } from 'react';

type Props = {
	iso?: string; // np. "2025-08-11T11:08:00Z"
	locale?: string; // domyślnie 'pl-PL'
};

export default function LaunchStamp({ iso, locale = 'pl-PL' }: Props) {
	const dateObj = useMemo(() => (iso ? new Date(iso) : null), [iso]);

	const parts = useMemo(() => {
		if (!dateObj || isNaN(dateObj.getTime())) {
			return { date: '—.—', h: '—', m: '—', s: '—', tz: '' };
		}
		const dd = new Intl.DateTimeFormat(locale, { day: '2-digit' }).format(
			dateObj
		);
		const mm = new Intl.DateTimeFormat(locale, { month: '2-digit' }).format(
			dateObj
		);
		const date = `${dd}.${mm}`;

		const h = new Intl.DateTimeFormat(locale, {
			hour: '2-digit',
			hour12: false,
		}).format(dateObj);
		const m = new Intl.DateTimeFormat(locale, { minute: '2-digit' }).format(
			dateObj
		);
		const s = new Intl.DateTimeFormat(locale, { second: '2-digit' }).format(
			dateObj
		);

		const tz =
			new Intl.DateTimeFormat(locale, { timeZoneName: 'short' })
				.format(dateObj)
				.split(' ')
				.pop() || '';

		return { date, h, m, s, tz };
	}, [dateObj, locale]);

	// Dwukropek o stałej szerokości, z delikatnym pulsem (bez „skakania” layoutu)
	const Colon = () => (
		<span className='inline-block w-[0.7ch] text-center opacity-90 animate-pulse [animation-duration:1.4s]'>
			:
		</span>
	);

	return (
		<div className='mt-8 w-full'>
			{/* gradient border + glass */}
			<div className='relative mx-auto max-w-[min(92vw,760px)] rounded-2xl p-[1.5px] bg-gradient-to-r from-[#7b4cff] via-[#30cfff] to-[#7b4cff]'>
				<div className='rounded-2xl bg-[#0b0f1a]/80 px-4 py-4 sm:px-6 sm:py-5 backdrop-blur-md'>
					{/* Mobile: dwie linie; Desktop: jedna linia */}
					<time
						dateTime={iso || ''}
						aria-label={`Launch ${parts.date} ${parts.h}:${parts.m}:${parts.s} ${parts.tz}`}
						className='
              grid items-center justify-center gap-y-2
              grid-cols-1
              sm:grid-cols-[auto_12px_auto_auto]
              sm:gap-x-4
              text-center sm:text-left
            '
					>
						{/* DATA */}
						<span
							className='
                mx-auto sm:mx-0
                font-mono tabular-nums font-black tracking-tight
                text-[clamp(28px,10vw,56px)]
                leading-[1.05]
              '
						>
							{parts.date}
						</span>

						{/* separator (kropka) – tylko od sm w górę */}
						<span
							aria-hidden
							className='hidden sm:block h-2 w-2 rounded-full bg-gradient-to-br from-[#7b4cff] to-[#30cfff] opacity-90'
						/>

						{/* GODZINA */}
						<span
							className='
                mx-auto sm:mx-0
                font-mono tabular-nums font-extrabold tracking-tight leading-none
                bg-gradient-to-r from-[#7b4cff] to-[#30cfff] bg-clip-text text-transparent
                text-[clamp(22px,8.5vw,44px)]
              '
						>
							{parts.h}
							<Colon />
							{parts.m}
							<Colon />
							{parts.s}
						</span>

						{/* strefa czasowa */}
						{parts.tz && (
							<span className='mx-auto sm:mx-0 text-xs md:text-sm text-white/60'>
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
							'radial-gradient(closest-side, rgba(123,76,255,0.26), transparent 70%)',
					}}
				/>
			</div>
		</div>
	);
}
