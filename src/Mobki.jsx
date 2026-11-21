import './style.css'
import Button from './Button'
import { Link } from 'react-router-dom'
import mobsJSON from './assets/mobs.json'
import { useState } from 'react'
import { useApp } from './AppProvider'
import heartContainer from './assets/heartContainer.png'
import heartFull from './assets/heart.png'

function Mobki() {
	let [mobs, setMobs] = useState([...mobsJSON])
	let [pressedMob, setPressedMob] = useState(null)
	let [modalMob, setModalMob] = useState(null)

	const { lang, playSound } = useApp()

	function setMob(e, mob) {
		if (pressedMob == mob) {
			setModalMob(mob)
			setPressedMob(null)
		} else {
			setPressedMob(mob)
		}
		console.log(pressedMob, modalMob, mob)
	}

	function podgladnij() {
		if (pressedMob) {
			setModalMob(pressedMob)
			setPressedMob(null)
		}
	}

	const isPl = lang === 'pl'

	function search(s) {
		let mobsCopy = [...mobsJSON]
		setMobs(
			mobsCopy.filter(el => {
				let mob = isPl ? el.name_pl : el.name
				return mob.toLowerCase().includes(s.toLowerCase())
			}),
		)
	}

	const MinecraftHearts = ({ hp }) => {
		const totalHearts = hp / 2
		const maxDisplayHearts = 20 
		const isCapped = totalHearts > maxDisplayHearts
		const heartsToRender = isCapped ? maxDisplayHearts : totalHearts

		const fullHearts = Math.floor(heartsToRender)
		const hasHalfHeart = !isCapped && hp % 2 !== 0
		const totalContainers = Math.ceil(heartsToRender)

		return (
			<div className='heartsWrapper'>
				<div className='heartsGrid'>
					{Array.from({ length: totalContainers }).map((_, i) => (
						<div key={i} className='heartSlot'>
							<img src={heartContainer} alt='' className='heartBg' />
							{i < fullHearts && <img src={heartFull} alt='heart' className='heartFg' />}
							{i === fullHearts && hasHalfHeart && (
								<img src={heartFull} alt='half heart' className='heartFg halfHeart' />
							)}
						</div>
					))}
				</div>
				<span className='hpText'>
					({hp} HP / {totalHearts} ♥)
				</span>
			</div>
		)
	}

	return (
		<>
			{modalMob && (
				<div className='mobekModal' onClick={() => setModalMob(null)}>
					<div className='mobekModalContent' onClick={e => e.stopPropagation()}>
						<button className='modalCloseBtn' onClick={() => setModalMob(null)}>
							✕
						</button>

						<div className='modalBody'>
							<div className='col-4 modalLeft'>
								<div className='row'>
									<div className='modalImage'>
										<img src={modalMob.src} alt={modalMob.name} />
									</div>
								</div>
								<div className='row'>
									<div className='modalName'>
										{isPl ? modalMob.name_pl : modalMob.name}{' '}
										<span className={modalMob.behavior}>[{isPl ? modalMob.behavior_pl : modalMob.behavior}]</span>
									</div>
								</div>
								<div className='row'>
									<MinecraftHearts hp={modalMob.hp} />
								</div>
							</div>

							<div className='col-8 modalRight'>
								<p className='modalDescription'>{isPl ? modalMob.description_pl : modalMob.description}</p>

								<div className='modalStatsGrid'>
									<div className='statBox'>
										<span className='statLabel'>{isPl ? 'Atak' : 'Attack'}</span>
										<span className='statValue'>{modalMob.attack}</span>
									</div>
									<div className='statBox'>
										<span className='statLabel'>{isPl ? 'Doświadczenie' : 'Experience'}</span>
										<span className='statValue'>{modalMob.experience} XP</span>
									</div>
									<div className='statBox'>
										<span className='statLabel'>{isPl ? 'Wymiary' : 'Dimensions'}</span>
										<span className='statValue'>
											{modalMob.dimensions.width} × {modalMob.dimensions.height}
										</span>
									</div>
									<div className='statBox'>
										<span className='statLabel'>{isPl ? 'Wymiar' : 'Dimension'}</span>
										<span className='statValue'>{modalMob.dimension.join(', ')}</span>
									</div>
								</div>

								<div className='modalInfoSection'>
									<h4>{isPl ? 'Występowanie' : 'Spawn'}</h4>
									<p>{isPl ? modalMob.spawn_pl : modalMob.spawn}</p>
								</div>

								<div className='modalInfoSection'>
									<h4>{isPl ? 'Łupy' : 'Drops'}</h4>
									{(isPl ? modalMob.drops_pl : modalMob.drops)?.length > 0 ? (
										<ul className='dropsList'>
											{(isPl ? modalMob.drops_pl : modalMob.drops).map((drop, index) => (
												<li key={index}>{drop}</li>
											))}
										</ul>
									) : (
										<p className='noDrops'>{isPl ? 'Brak' : 'None'}</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className='container-fluid d-flex flex-column h-100 min-h-0'>
				<div className='row h-15 r-1 d-flex justify-content-center'>
					<div className='col-10'>
						<div className='container h-100 d-flex flex-column gap-3 justify-content-center align-items-center'>
							<div className='row d-flex justify-content-center align-items-center searchText'>{isPl? "Wyszukaj" : "Search"}</div>
							<div className='row'>
								<div className='searchBox d-flex justify-content-center align-items-center'>
									<input
										type='text'
										name='searchInput'
										className='searchInput'
										onChange={e => {
											search(e.target.value)
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='row flex-grow-1 r-2 d-flex justify-content-center overflow-hidden'>
					<div className='col-9 d-flex h-100'>
						<div className='container h-100 mobkiWrapper d-flex flex-wrap'>
							{mobs.map((mob, index) => (
								<div
									key={index}
									className={
										'mobek d-flex flex-column align-items-center no-drag ' +
										(pressedMob === mob || modalMob === mob ? 'pressed' : '')
									}
									onClick={(e) => {
										setMob(e, mob);
										playSound('pop.mp3')
									}}>
									<img src={mob.image} alt={name} className='mobekImage no-drag' />
									<div className={'mobekName' + ' ' + mob.behavior}>{isPl ? mob.name_pl : mob.name}</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='row h-15 r-3 d-flex justify-content-center'>
					<div className='col-10'>
						<div className='container h-100 d-flex justify-content-center gap-3'>
							<Link to='/' className='a-none a-wieksze'>
								<Button name={isPl ? 'Wroc' : "Back"} width={100} height={50} />
							</Link>
							<Button
								name={isPl ? 'Wyswietl informacje' : 'Show info'}
								width={48}
								height={50}
								disabled={pressedMob === null}
								onClick={podgladnij}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Mobki
