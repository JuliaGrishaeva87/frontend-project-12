import axios from 'axios'
import { useState} from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Button, Card, Col, Form, FloatingLabel, Row } from 'react-bootstrap'
import avatarSignup from '../assets/avatar-singup.jpg'
import routes from '../utils/routes.js'
import { setCredentials } from '../slices/authSlice'
import { validationSignupShema } from '../utils/validation.js'

const Signup = () => {
  const [authFailed, setAuthFailed] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
     initialValues: {
       username: '',
       password: '',
       confirmPassword: ''
     },
     validationSchema: validationSignupShema(),
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
        setAuthFailed(true)
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
                alt="Регистрация" />
              </div>
              <Form 
                onSubmit={formik.handleSubmit}
                className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <FloatingLabel
                  controlId="username"
                  label="Имя пользователя"
                  className="mb-3"
                >
                  <Form.Control 
                    type="text" 
                    placeholder="От 3 до 20 символов"
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
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="password"
                  label="Пароль"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Не менее 6 символов"
                    required
                    isInvalid={formik.touched.password && !!formik.errors.password || authFailed}
                    onChange={(e) => {
                      setAuthFailed(false)
                      formik.handleChange(e)}}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="confirmPassword"
                  label="Подтвердите пароль"
                  className="mb-4"
                >
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Пароли должны совпадать"
                    onChange={(e) => {
                      setAuthFailed(false)
                      formik.handleChange(e)}}
                    required
                    value={formik.values.confirmPassword}
                    isInvalid={(formik.touched.confirmPassword && !!formik.errors.confirmPassword) || authFailed}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    { authFailed ? 'Такой пользователь уже существует' : formik.errors.confirmPassword} 
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  Зарегистрироваться
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