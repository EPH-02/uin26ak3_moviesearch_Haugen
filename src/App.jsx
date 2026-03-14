import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Movie from './pages/Movie'
import Home from './pages/Home'
import '../src/styles/stylesheet.css'
import Layout from './components/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path=":movieId" element={<Movie/>} /> 
      </Routes>
    </Layout>
    
    </>
  )
}

export default App
