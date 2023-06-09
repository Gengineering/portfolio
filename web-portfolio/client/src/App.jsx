import Header from './components/Header'
import Greeting from './components/Greeting'
import Footer from './components/Footer'
import Tabpages from './components/Tabpages'
import Login from './pages/Login'
import Admin from './pages/Admin'
import PrivateRoute from './components/PrivateRoute'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<><Greeting /><Tabpages /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App