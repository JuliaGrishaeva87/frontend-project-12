import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { validationChannelsShema } from '../../utils/validation.js'
import axios from 'axios'
import routes from '../../utils/routes.js'
import { useEffect, useRef } from 'react'
import { setCurrentChannel } from '../../slices/channelsSlice.js'

const AddModal = ({handleClose}) => {
  const dispatch = useDispatch()
  const channels = useSelector(state => state.channels.channels)
  const channelsNames = channels.map(channel => channel.name)
  const token = useSelector(state => state.auth.token)
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationChannelsShema(channelsNames),
    onSubmit: async (values) => {
      const channel = {
        name: values.name,
        removable: true,
      }
      try {
        const response = await axios.post(routes.getAddChannelsPath(), channel, { headers: { Authorization: `Bearer ${token}` } } )
        dispatch(setCurrentChannel(response.data))
      }
      catch (err) {
        console.log(err)
      } 
    },
  })
  
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Form.Control
              name="name"
              id="name"
              className="mb-2"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && !!formik.errors.name}
              ref={inputRef}
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              Имя канала
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                type="button"
                onClick={handleClose}
              >
                Отменить
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Отправить
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </>
  )
}

export default AddModal