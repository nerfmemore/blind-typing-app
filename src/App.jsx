import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import TextField from './components/textField'
import { useSelector } from 'react-redux'
import Results from './components/Results'

function App() {
  const results = useSelector(state => state.text.finalStatus)

  return (
    <>
      {results ? <Results /> : <TextField />}
    </>
  )
}

export default App
