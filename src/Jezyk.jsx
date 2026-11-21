import './style.css'
import { useApp } from './AppProvider'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useState } from 'react'

function Jezyk() {
	const { playSound, lang, setLang, isPL} = useApp()
    const languagesJSON = [
        {
            short: "pl",
            long: "Polski"
        },
        {
            short: "eng",
            long: "English (US)"
        }
    ]

    const [languages, setLanguages] = useState([...languagesJSON])

    function search(s) {
		let languagesCopy = [...languagesJSON]
		setLanguages(
			languagesCopy.filter(el => {
				return el.long.toLowerCase().includes(s.toLowerCase())
			}),
		)
	}
	return (
		<>
			<div className='container-fluid d-flex flex-column h-100 min-h-0'>
				<div className='row h-15 r-1 d-flex justify-content-center'>
					<div className='col-10'>
						<div className='container h-100 d-flex flex-column gap-3 justify-content-center align-items-center'>
							<div className='row d-flex justify-content-center align-items-center searchText'>{isPL ? "Jezyk:" : "Language:"}</div>
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
					<div className='col-lg-6 d-flex h-100'>
						<div className='container h-100 mobkiWrapper d-flex flex-wrap flex-column jezyki'>
							{languages.map((i, idx) => (
                                <div className={'jezykRow no-drag ' + (lang == i.short && 'selected')} key={i.short} onClick={() => {setLang(i.short); playSound('button.mp3')}}>{i.long}</div>
                            ))}
						</div>
					</div>
				</div>
				<div className='row h-15 r-3 d-flex justify-content-center'>
					<div className='col-10'>
						<div className='container h-100 d-flex justify-content-center gap-3'>
							<Link to='/opcje' className='a-none a-opcje-mniejsze'>
								<Button name='Gotowe' width={100} height={50} />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Jezyk
