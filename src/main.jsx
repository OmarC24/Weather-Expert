import React from 'react'
import ReactDOM from 'react-dom/client'
import { WeatherSearch } from './WeatherSearch'

import "./styles.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WeatherSearch />
  </React.StrictMode>,
)
