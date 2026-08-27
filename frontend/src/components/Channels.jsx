import { useDispatch, useSelector } from 'react-redux'
import { Col, Button, Nav, Dropdown, ButtonGroup } from 'react-bootstrap'
import { setCurrentChannel } from '../slices/channelsSlice.js'
import { openModal } from '../slices/modalSlice.js'
import { useTranslation } from 'react-i18next'

const Channels = () => {
  const channels = useSelector(state => state.channels.channels)
  const currentChannel = useSelector( state => state.channels.currentChannel)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleSelectChannel = (channel) => dispatch(setCurrentChannel(channel))

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <span className="fw-bold">{t('homePage.titleChannels')}</span>
        <Button
        type="button"
        variant="group-vertical"
        className="p-0 text-primary"
        onClick={() => dispatch(openModal({ type: 'adding' }))}
        >
          <svg
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 16 16" 
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-plus-square"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">{t('homePage.addChannelPlus')}</span>
        </Button>
      </div>
      <Nav
        as="ul"
        id="channels-box"
        variant="pills"
        fill
        className="flex-column px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => {
          const isActive = channel.id === currentChannel?.id
          if (channel.removable !== true) {
            return (
            <Nav.Item className="w-100" key={channel.id} as="li">
              <Button
                variant={isActive ? 'secondary' : ''}
                className="w-100 text-start rounded-0"
                onClick={() => handleSelectChannel(channel)}
              >
                <span className="me-1"># </span>
                 {channel.name}
              </Button>
            </Nav.Item>
          )
          } else return (
            <Nav.Item className="w-100" key={channel.id} as="li">
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                variant={isActive ? 'secondary' : ''}
                className="w-100 rounded-0 text-start text-truncate"
                onClick={() => handleSelectChannel(channel)}
                >
                  <span className="me-1"># </span>
                  {channel.name}
                </Button>
                <Dropdown.Toggle
                id={channel.id}
                variant={isActive ? 'secondary' : ''}
                className="flex-grow-0 dropdown-toggle dropdown-toggle-split" aria-expanded="false" />
                  <span className="visually-hidden">{t('homePage.dropdownHiddenDiscription')}</span>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => dispatch(openModal({ type: 'removing', item: channel }))}>{t('homePage.dropdownItemDelete')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => dispatch(openModal({ type: 'renaming', item: channel }))}>{t('homePage.dropdownItemRename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          )
        })}
      </Nav>
    </Col>
  )
}

export default Channels