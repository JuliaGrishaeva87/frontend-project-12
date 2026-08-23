import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import routes from '../../utils/routes.js'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react'
import { Text } from '@mantine/core'
import * as Sentry from "@sentry/react"

const RemoveModal = ({handleClose}) => {
  const token = useSelector(state => state.auth.token)
  const channel = useSelector(state => state.modal.item)
  const channelId = channel?.id
  const { t } = useTranslation()

  const deleteModal = async () => {
    try {
      await axios.delete(routes.editRemoveChannelsPath(channelId), {
        headers: { Authorization: `Bearer ${token}` }
      } )
      notifications.show({
          title: '',
          message: (
          <Text c="gray.6" size="md">
            {t('toast.channelRemoved')}
          </Text>
          ),
          color: 'green',
          icon: <IconCheck size={16} />,
          autoClose: 5000,
        })
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
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeModalTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.removeModalMessage')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            onClick={handleClose}
          >
            {t('modals.modalCancelBtn')}
          </Button>
          <Button
            variant="danger"
            onClick={deleteModal}
          >
            {t('modals.modalDeleteBtn')}
          </Button>
        </div>
      </Modal.Body>
    </>
  ) 
}

export default RemoveModal