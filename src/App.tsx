import Countdown from './components/CountDown';
import LaunchStamp from './components/LaunchStamp';
import Logo from './assets/Group 2.svg';

const TARGET = import.meta.env.VITE_LAUNCH_ISO;

export default function App() {
	return (
		<div className='min-h-full bg-[#0b0f1a] text-white relative'>
			{/* tło z delikatnym gradientem */}
			<div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(48,207,255,0.15),transparent),radial-gradient(40%_40%_at_80%_80%,rgba(123,76,255,0.18),transparent)]' />

			<main className='px-5'>
				<div className='mx-auto flex max-w-6xl flex-col items-center py-16 text-center'>
					{/* duże HERO logo z gradientowym ringiem i glowem */}
					<div className='relative mb-6'>
						<div className='rounded-2xl bg-[#0f1226]/80 px-4 py-4'>
							<img
								src={Logo}
								alt='Vnoder logo'
								className='h-16 w-16 md:h-20 md:w-20 object-contain'
							/>
						</div>
					</div>

					{/* badge */}
					<span className='mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-blue-200'>
						Coming soon
					</span>

					<h1 className='mb-3 text-4xl font-extrabold leading-tight md:text-6xl'>
						Something awesome is
						<br />
						<span className='bg-gradient-to-r from-[#7b4cff] to-[#30cfff] bg-clip-text text-transparent'>
							launching soon
						</span>
					</h1>

					<p className='max-w-xl text-white/70'>
						Pracujemy nad narzędziem do wizualnej analizy kodu. Zostaw nam
						chwilę — widzimy się w dniu startu!
					</p>

					{/* duży, nowoczesny stempel z datą/godziną */}
					<LaunchStamp iso={TARGET} />

					{/* countdown w delikatnej „glass” karcie */}
					<div className='mt-6 w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4'>
						<Countdown target={TARGET} />
					</div>
				</div>
			</main>

			<footer className='px-5 py-6'>
				<div className='mx-auto max-w-6xl text-center text-sm text-white/50'>
					© {new Date().getFullYear()} Vnoder
				</div>
			</footer>
		</div>
	);
}
