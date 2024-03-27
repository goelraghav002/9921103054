import { useState } from 'react'
import './App.css'
import AllProducts from './pages/AllProducts'
import { Route, Routes } from 'react-router-dom'
import Product from './pages/Product'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={ <AllProducts/>} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </div>
  )
}

export default App
