import axios from 'axios'
import { useState} from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Button, Card, Col, Form, FloatingLabel, Row } from 'react-bootstrap'
import avatarSignup from '../assets/avatar-singup.jpg'
import routes from '../utils/routes.js'
import { setCredentials } from '../slices/authSlice'
import { validationSignupSchema } from '../utils/validation.js'
import { useTranslation } from 'react-i18next'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { Text } from '@mantine/core'
import * as Sentry from "@sentry/react"

const Signup = () => {
  const [authFailed, setAuthFailed] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const formik = useFormik({
     initialValues: {
       username: '',
       password: '',
       confirmPassword: ''
     },
     validationSchema: validationSignupSchema(),
     onSubmit: async (values) => {
      setAuthFailed(false)
      try {
        const response = await axios.post(routes.signup(),
        {username: values.username, password: values.password,})
        dispatch(setCredentials(response.data))
        navigate('/', { replace: true })
      }
      catch (err) {
        formik.setSubmitting(false)
        if (err.response?.status === 409) {
          setAuthFailed(true)
        } else {
          Sentry.captureException(err)
          notifications.show({
            title: '',
            message: (
              <Text c="gray.6" size="md">
                {t('toast.errors.networkErr')}
              </Text>
            ),
            color: 'red',
            icon: <IconX size={16} />,
            autoClose: 5000,
          })
        }
      }
    },
  })

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                src={avatarSignup}
                className="rounded-circle"
                alt={t('signupPage.avatarAlt')} />
              </div>
              <Form 
                onSubmit={formik.handleSubmit}
                className="w-50">
                <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
                <FloatingLabel
                  controlId="username"
                  label={t('signupPage.usernameLabel')}
                  className="mb-3"
                >
                  <Form.Control 
                    type="text" 
                    placeholder={t('signupPage.usernamePlaceholder')}
                    name="username"
                    autoComplete="username"
                    required
                    isInvalid={formik.touched.username && !!formik.errors.username || authFailed}
                    onChange={(e) => {
                      setAuthFailed(false)
                      formik.handleChange(e)}}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t(formik.errors.username?.key, formik.errors.username?.values)}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="password"
                  label={t('signupPage.passwordLabel')}
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={t('signupPage.passwordPlaceholder')}
                    required
                    isInvalid={formik.touched.password && !!formik.errors.password || authFailed}
                    onChange={(e) => {
                      setAuthFailed(false)
                      formik.handleChange(e)}}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t(formik.errors.password?.key, formik.errors.password?.values)}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="confirmPassword"
                  label={t('signupPage.confirmPasswordLabel')}
                  className="mb-4"
                >
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder={t('signupPage.confirmPasswordPlaceholder')}
                    onChange={(e) => {
                      setAuthFailed(false)
                      formik.handleChange(e)}}
                    required
                    value={formik.values.confirmPassword}
                    isInvalid={(formik.touched.confirmPassword && !!formik.errors.confirmPassword) || authFailed}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {authFailed 
                      ? t('errors.signupErr') 
                      : t(formik.errors.confirmPassword?.key, formik.errors.confirmPassword?.values)
                    }
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  {t('signupPage.submitBtn')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
    </Col>
    </Row>
    </Container>
  )
}

export default Signup