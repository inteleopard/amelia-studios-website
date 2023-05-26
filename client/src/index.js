import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CRSFToken'

createRoot(document.getElementById('root')).render(<App />)