import { useSelector, useDispatch } from "react-redux"
import { Modal } from "react-bootstrap"
import { closeModal } from "../../slices/modalSlice.js"
import AddModal from "./AddModal.jsx"
import RemoveModal from "./RemoveModal.jsx"
import RenameModal from "./RenameModal.jsx"

const modals = {
  adding: AddModal,
  removing: RemoveModal,
  renaming: RenameModal,
}

const ModalWindow = () => {
  const dispatch = useDispatch()
  const isOpened = useSelector(state => state.modal.isOpened)
  const modalType = useSelector(state => state.modal.type)

  if(!modalType || !modals[modalType]) return null

  const ComponentContent = modals[modalType]

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <Modal show={isOpened} onHide={handleClose} centered>
      <ComponentContent handleClose={handleClose} />
    </Modal>
  )
}

export default ModalWindow