import { useState } from 'react'
import Card from '../components/Card'
import './App.css'
import Card2 from '../components/Card2'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <main className='flex flex-column justify-center h-[100vh] items-center bg-gradient-to-r from-[#332F67]  via-[#3A2A76] to-[#422886]'>
      <Router>
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/cities" element={<Card2 />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App

