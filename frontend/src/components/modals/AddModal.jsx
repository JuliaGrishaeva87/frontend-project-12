import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { validationChannelsSchema } from '../../utils/validation.js'
import axios from 'axios'
import routes from '../../utils/routes.js'
import { useEffect, useRef } from 'react'
import { setCurrentChannel } from '../../slices/channelsSlice.js'
import { useTranslation } from 'react-i18next'

const AddModal = ({handleClose}) => {
  const dispatch = useDispatch()
  const channels = useSelector(state => state.channels.channels)
  const channelsNames = channels.map(channel => channel.name)
  const token = useSelector(state => state.auth.token)
  const inputRef = useRef()
  const { t } = useTranslation()

  useEffect(() => {
    inputRef.current.focus()
  }, [])
  
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationChannelsSchema(channelsNames),
    onSubmit: async (values) => {
      const channel = {
        name: values.name,
        removable: true,
      }
      try {
        const response = await axios.post(routes.getAddChannelsPath(), channel, { headers: { Authorization: `Bearer ${token}` } } )
        dispatch(setCurrentChannel(response.data))
        handleClose()
      }
      catch (err) {
        console.log(err)
      } 
    },
  })
  
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addModalTitle')}</Modal.Title>
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
              {t('modals.addRenameModalLabel')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name?.key, formik.errors.name?.values)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                type="button"
                onClick={handleClose}
              >
                {t('modals.modalCancelBtn')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modals.modalSendBtn')}
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </>
  )
}

export default AddModal