import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Movie from './pages/Movie'
import Home from './pages/Home'
import './App.css'
import Layout from './components/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path=":movie" element={<Movie/>} /> 
      </Routes>
    </Layout>
    
    </>
  )
}

export default App
