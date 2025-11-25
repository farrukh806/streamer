import './App.css'
import { Routes, Route } from 'react-router'

function App() {

  return (
    <section>
      <Routes>
        <Route path="/" element={<h1 className='font-extrabold text-xl text-red-500' data-theme="night">Streamify</h1>} />
      </Routes>
    </section>
  )
}

export default App
