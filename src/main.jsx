import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import './style.css'
import { AppProvider } from './AppProvider.jsx'

createRoot(document.getElementById('root')).render(
	<AppProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AppProvider>,
)
