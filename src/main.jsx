import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Marca que hay JS: habilita los estados ocultos de [data-reveal].
// Sin JS (o si este módulo falla), todo el contenido queda visible.
document.documentElement.classList.add('js')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
