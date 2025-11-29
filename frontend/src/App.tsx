import './App.css'
import { Routes, Route, Navigate } from 'react-router'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import LoadingSpinner from './components/LoadingSpinner'
import { Toaster } from 'react-hot-toast'
import useUserAuth from './hooks/useUserAuth'
import Layout from './components/Layout'
import Home from './pages/Home'
import Notifications from './pages/Notifications'
function App() {
  const { user, isLoading } = useUserAuth()

  if (isLoading) return <LoadingSpinner />

  // Check if user is authenticated and onboarded
  const isAuthenticated = !!user?.data
  const isOnboarded = user?.data?.isOnboarded ?? false

  return (
    <section className='h-screen'>
      <Toaster position='top-center' />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Layout><Home /></Layout>
              ) : (
                <Navigate to="/onboarding" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Layout><Notifications /></Layout>
              ) : (
                <Navigate to="/onboarding" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to={isOnboarded ? "/" : "/onboarding"} replace /> : <Signup />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={isOnboarded ? "/" : "/onboarding"} replace /> : <Login />}
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Navigate to="/" replace />
              ) : (
                <Onboarding />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </section>
  )
}

export default App
