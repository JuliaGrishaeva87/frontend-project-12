import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar expand="lg" className="bg-white shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="">
              Чат Hexlet
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={
            <PrivateRoute><Home /></PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
