import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Container, Navbar, Button } from 'react-bootstrap'
import * as Sentry from "@sentry/react"
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Signup from './pages/Signup.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { removeCredentials } from './slices/authSlice.js'
import { useTranslation } from 'react-i18next'

const ErrorFallback = () => (
  <Container className="text-center mt-5">
    <h1>Что-то пошло не так.</h1>
    <p>Мы уже получили отчет об ошибке и занимаемся решением проблемы.</p>
    <Button onClick={() => window.location.reload()}>Обновить страницу</Button>
  </Container>
)

const App = ({ socket }) => {
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  return (
    <BrowserRouter>
      <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
        <div className="d-flex flex-column h-100">
          <Navbar expand="lg" className="bg-white shadow-sm">
            <Container>
              <Navbar.Brand as={Link} to="/">
                {t('navBar.title')}
              </Navbar.Brand>
              {token && (
                <Button
                onClick={() => dispatch(removeCredentials())}>
                  {t('navBar.exitBtn')}
                </Button>
              )}
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={
              <PrivateRoute><Home socket={socket}/></PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Sentry.ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
