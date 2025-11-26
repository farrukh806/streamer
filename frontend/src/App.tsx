import './App.css'
import { Routes, Route } from 'react-router'
import Signup from './pages/Signup'

function App() {

  return (
    <section className='h-screen'>
      <Routes>
        <Route path="/" element={<h1 className='font-extrabold text-xl text-red-500' data-theme="night">Streamify</h1>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </section>
  )
}

export default App
