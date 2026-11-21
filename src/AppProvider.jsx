import { createContext, useContext, useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const AppContext = createContext()

export function AppProvider({ children }) {
	const [lang, setLang] = useState(() => {
		return localStorage.getItem('app_lang') || 'pl'
	})

	const [volume, setVolume] = useState(() => {
		return Number(localStorage.getItem('volume') ?? 0.2)
	})

	const [imie, setImie] = useState(() => {
		return localStorage.getItem('imie') || null
	})

	const isPL = lang == 'pl'

	useEffect(() => {
		localStorage.setItem('app_lang', lang)
	}, [lang])

	useEffect(() => {
		if (imie !== null) {
			localStorage.setItem('imie', imie)
		}
	}, [imie])

	function changeVolume(x) {
		if (x >= 1) {
			setVolume(1)
		} else if (x <= 0) {
			setVolume(0)
		} else {
			setVolume(x)
		}
	}

	function playSound(x) {
		let path = '/sounds/' + x
		let sound = new Audio()
		sound.src = path
		sound.volume = volume
		sound.play()
	}

	const debouncedVolumeSave = useDebouncedCallback(x => {
		localStorage.setItem('volume', x)
	}, 500)

	useEffect(() => {
		debouncedVolumeSave(volume)
	}, [volume])

	return (
		<AppContext.Provider value={{ lang, setLang, volume, changeVolume, playSound, isPL, imie, setImie }}>
			{children}
		</AppContext.Provider>
	)
}

export function useApp() {
	return useContext(AppContext)
}
