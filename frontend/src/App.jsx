import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Container, Navbar, Button } from 'react-bootstrap'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Singup from './pages/Signup.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { removeCredentials } from './slices/authSlice.js'

const App = () => {
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar expand="lg" className="bg-white shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Hexlet Chat
            </Navbar.Brand>
            {token && (
              <Button
              onClick={() => dispatch(removeCredentials())}>
                Выйти
              </Button>
            )}
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={
            <PrivateRoute><Home /></PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<Singup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
