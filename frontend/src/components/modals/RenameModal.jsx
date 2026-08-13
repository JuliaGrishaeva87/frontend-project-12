import { useSelector } from 'react-redux'
import axios from 'axios'
import routes from '../../utils/routes'
import { useFormik } from 'formik'
import { Modal, Form, Button } from 'react-bootstrap'
import { validationChannelsShema } from '../../utils/validation'
import { useRef, useEffect } from 'react'

const RenameModal = ({handleClose}) => {
  const channels = useSelector(state => state.channels.channels)
  const editedChannel = useSelector(state => state.modal.item)
  const channelsNames = channels
    .filter(channel => channel.id !== editedChannel.id)
    .map(filteredChannel => filteredChannel.name)
  const token = useSelector(state => state.auth.token)
  const channelId = editedChannel?.id
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.select()
  }, [])
  
  const formik = useFormik({
    initialValues: {
      name: editedChannel.name,
    },
    validationSchema: validationChannelsShema(channelsNames),
    onSubmit: async (values) => {
      const editedChannel = {
        name: values.name,
      }
      try {
        await axios.patch(routes.editRemoveChannelsPath(channelId), editedChannel, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      catch (err) {
        console.log(`Невозможно переименовать канал: ${err}`)
      } 
    },
  })
  
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          Переименовать канал
        </Modal.Title>
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
              autoFocus
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

export default RenameModal