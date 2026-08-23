import { useSelector } from 'react-redux'
import axios from 'axios'
import routes from '../../utils/routes'
import { useFormik } from 'formik'
import { Modal, Form, Button } from 'react-bootstrap'
import { validationChannelsSchema } from '../../utils/validation.js'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react'
import { Text } from '@mantine/core'
import filter from 'leo-profanity'
import * as Sentry from "@sentry/react"

const RenameModal = ({handleClose}) => {
  const channels = useSelector(state => state.channels.channels)
  const editedChannel = useSelector(state => state.modal.item)
  const channelsNames = channels
    .filter(channel => channel.id !== editedChannel.id)
    .map(filteredChannel => filteredChannel.name)
  const token = useSelector(state => state.auth.token)
  const channelId = editedChannel?.id
  const inputRef = useRef()
  const { t } = useTranslation()
  
  useEffect(() => {
    inputRef.current.select()
  }, [])
  
  const formik = useFormik({
    initialValues: {
      name: editedChannel.name,
    },
    validationSchema: validationChannelsSchema(channelsNames),
    onSubmit: async (values) => {
      const cleanName = filter.clean(values.name)
      const editedChannel = {
        name: cleanName,
      }
      try {
        await axios.patch(routes.editRemoveChannelsPath(channelId), editedChannel, {
          headers: { Authorization: `Bearer ${token}` }
        })
        notifications.show({
          title: '',
          message: (
          <Text c="gray.6" size="md">
            {t('toast.channelRenamed')}
          </Text>
          ),
          color: 'green',
          icon: <IconCheck size={16} />,
          autoClose: 5000,
        })
        handleClose()
      }
      catch (err) {
        console.log(err)
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
    },
  })
  
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.renameModalTitle')}
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

export default RenameModal