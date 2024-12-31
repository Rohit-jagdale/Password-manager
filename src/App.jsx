import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar></Navbar>
      <Manager></Manager>
    </>
  )
}

export default App
