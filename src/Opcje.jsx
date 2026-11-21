import './style.css'
import { useApp } from './AppProvider'
import Button from './Button'
import { Link } from 'react-router-dom'

function Opcje() {
	const { playSound, isPL, changeVolume, volume } = useApp()

	return (
		<div className='backgroundWrapper'>
            <div className='opcjeText'>{isPL ? "Opcje" : "Options"}</div>
			<div className='container h-100 d-flex justify-content-center align-items-center flex-column gap-opcje'>
				<div className='row w-100'>
					<div className='col-6 p-0'>
						<Link to='/jezyk' className='a-none a-opcje-wieksze'>
							<Button width={100} height={50} name={isPL ? 'Jezyk' : 'Language'} />
						</Link>
					</div>
					<div className='col-6 position-relative d-flex justify-content-center align-items-center p-0'>
                        <div className='sliderBackground'></div>
                        <input type="range" name="volume" className='slider' value={volume} onChange={(e) => {changeVolume(e.target.value)}} min={0} max={1} step={0.01} onMouseUp={() => {playSound('button.mp3')}} />
                        <div className='sliderText'>{isPL ? "Glowna Glosnosc: " : "Master Volume: "}{Math.round(volume * 100) + "%"} </div>
                    </div>
				</div>
				<div className='row w-100'>
					<div className='col-12 d-flex justify-content-center align-items-center'>
						<Link to='/' className='a-none a-opcje-mniejsze'>
							<Button width={100} height={50} name={isPL ? 'Gotowe' : 'Done'} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Opcje
