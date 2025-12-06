
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'

import SignupForm from './components/SignupForm'
import { AuthProvider } from './context/AuthProvider'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path='/login' element={
            <PublicRoute>
              <LoginForm/>
            </PublicRoute>
            }/>

          <Route path='/signup' element={
            <PublicRoute>
              <SignupForm/>
            </PublicRoute>
            }/>

          <Route path='/' element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
            }/>

          <Route path="*" element={<div>Page not found</div>}/>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
    
  )
}

export default App
