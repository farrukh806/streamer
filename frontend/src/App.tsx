import './App.css'
import { Routes, Route, Navigate } from 'react-router'
import Signup from './pages/Signup'
import { useQuery } from '@tanstack/react-query'
import { UserService } from './api/user-service'
import LoadingSpinner from './components/LoadingSpinner'
import { Toaster } from 'react-hot-toast'
import { handleError } from './lib/utils'
import type { IApiError } from './types/api'

function App() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: UserService.getUserProfile,
    retry: false,
    throwOnError: (error: IApiError) => {
      handleError(error.response?.data?.message)
      return false
    }
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <section className='h-screen'>
      <Toaster position='top-center' />
      <Routes>
        <Route path="/" element={<h1 className='font-extrabold text-xl text-red-500' data-theme="night">Streamify</h1>} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
      </Routes>
    </section>
  )
}

export default App
