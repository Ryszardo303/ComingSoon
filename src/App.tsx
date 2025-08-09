import Countdown from './components/CountDown';
import LaunchStamp from './components/LaunchStamp';
import Logo from './assets/Group 2.svg';

const TARGET = import.meta.env.VITE_LAUNCH_ISO;

export default function App() {
	return (
		<div className='relative min-h-dvh bg-[#0b0f1a] text-white'>
			{/* tło z delikatnym gradientem */}
			<div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(48,207,255,0.15),transparent),radial-gradient(40%_40%_at_80%_80%,rgba(123,76,255,0.18),transparent)]' />

			<main className='px-4 sm:px-5'>
				<div className='mx-auto flex max-w-6xl flex-col items-center py-12 sm:py-16 text-center'>
					{/* HERO logo z glowem – bardziej prominentne na mobile */}
					<div className='relative mb-6 sm:mb-8'>
						<div className='rounded-2xl bg-[#0f1226]/80 px-4 py-4 sm:px-5 sm:py-5 backdrop-blur'>
							<img
								src={Logo}
								alt='Vnoder logo'
								className='h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain'
							/>
						</div>
						<div
							aria-hidden
							className='pointer-events-none absolute -inset-6 -z-10 rounded-[24px] blur-3xl'
							style={{
								background:
									'radial-gradient(closest-side, rgba(123,76,255,0.25), transparent 70%)',
							}}
						/>
					</div>

					{/* badge */}
					<span className='mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] sm:text-xs text-blue-200'>
						Coming soon
					</span>

					<h1
						className='
              mb-3
              font-extrabold leading-tight
              text-[clamp(28px,7.5vw,40px)]
              sm:text-[clamp(36px,5vw,56px)]
            '
					>
						Something awesome is
						<br />
						<span className='bg-gradient-to-r from-[#7b4cff] to-[#30cfff] bg-clip-text text-transparent'>
							launching soon
						</span>
					</h1>

					<p className='max-w-xl text-white/70 text-sm sm:text-base px-2'>
						Pracujemy nad narzędziem do wizualnej analizy kodu. Zostaw nam
						chwilę — widzimy się w dniu startu!
					</p>

					{/* stempel z datą/godziną – responsywny */}
					<LaunchStamp iso={TARGET} />

					{/* countdown w delikatnej „glass” karcie – full width na mobile */}
					<div className='mt-6 w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-3 sm:p-4'>
						<Countdown target={TARGET} />
					</div>
				</div>
			</main>

			<footer className='px-4 sm:px-5 py-6'>
				<div className='mx-auto max-w-6xl text-center text-xs sm:text-sm text-white/50'>
					© {new Date().getFullYear()} Vnoder
				</div>
			</footer>
		</div>
	);
}
