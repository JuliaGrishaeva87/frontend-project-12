import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import routes from '../../utils/routes.js'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

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
    }
    catch (err) {
      console.log(err)
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