import axios from 'axios'
import { useState} from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Container, Button, Card, Col, Form, FloatingLabel, Row } from 'react-bootstrap'
import avatarImage from '../assets/avatar-login.jpg'
import routes from '../utils/routes.js'
import { setCredentials } from '../slices/authSlice'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const redirectPath = location.state?.from?.pathname ?? '/'
  const { t } = useTranslation()

  const formik = useFormik({
     initialValues: {
       username: '',
       password: '',
     },
     onSubmit: async (values) => {
      setAuthFailed(false)
      try {
        const response = await axios.post(routes.loginPath(), values)
        dispatch(setCredentials(response.data))
        navigate(redirectPath, { replace: true })
      }
      catch (err) {
        formik.setSubmitting(false)
        setAuthFailed(true)
      }
    },
  })

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                src={avatarImage}
                className="rounded-circle"
                alt={t('loginPage.avatarAlt')} />
              </Col>
              <Form 
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-md-0">
                <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
                <FloatingLabel
                  controlId="username"
                  label={t('loginPage.usernameField')}
                  className="mb-3"
                >
                  <Form.Control 
                    type="text" 
                    placeholder={t('loginPage.usernameField')}
                    name="username"
                    autoComplete="username"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="password"
                  label={t('loginPage.passwordField')}
                  className="mb-4"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={t('loginPage.passwordField')}
                    autoComplete="current-password"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t('errors.authErr')}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  {t('loginPage.enterBtn')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('loginPage.noAccSentence')} </span>
                <Link to="/signup">{t('loginPage.registrationWord')}</Link>
              </div>
            </Card.Footer>
          </Card>
    </Col>
    </Row>
    </Container>
   )
}

export default Login