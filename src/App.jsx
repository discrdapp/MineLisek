import { Routes, Route, useLocation } from 'react-router-dom'
import panorama from './assets/panorama.mp4'
import Home from './Home'
import Mobki from './Mobki'
import Opcje from './Opcje'
import Jezyk from './Jezyk'


function App() {
	const location = useLocation()

	const showBackground = location.pathname == '/' || location.pathname == '/mobki' || location.pathname == '/jezyk'

	return (
		<>
			{showBackground && (
				<div className='video-wrapper'>
					<video className='panorama' src={panorama} autoPlay muted loop playsInline />
				</div>
			)}

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/mobki' element={<Mobki />} />
				<Route path='/opcje' element={<Opcje />} />
				<Route path='/jezyk' element={<Jezyk />} />
			</Routes>
		</>
	)
}

export default App
