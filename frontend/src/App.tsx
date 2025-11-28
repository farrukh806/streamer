import './App.css'
import { Routes, Route, Navigate } from 'react-router'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import LoadingSpinner from './components/LoadingSpinner'
import { Toaster } from 'react-hot-toast'
import useUserAuth from './hooks/useUserAuth'
import Layout from './components/Layout'
function App() {
  const { user, isLoading } = useUserAuth()

  if (isLoading) return <LoadingSpinner />

  return (
    <section className='h-screen'>
      <Toaster position='top-center' />
      <Routes>
        <Route path="/" element={<Layout><h1 className='font-extrabold text-xl text-red-500' data-theme="night">Streamify</h1></Layout>} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/onboarding" element={user ? <Onboarding /> : <Navigate to="/login" />} />
      </Routes>
    </section>
  )
}

export default App
