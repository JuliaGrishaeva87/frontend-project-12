import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Col, Button, Form, InputGroup } from 'react-bootstrap'
import { addMessage } from '../slices/messagesSlice.js'
import axios from 'axios'
import routes from '../utils/routes.js'
import { useTranslation } from 'react-i18next'
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react'
import { Text } from '@mantine/core'

const Messages = () => {
  const currentChannel = useSelector(state => state.channels.currentChannel)
  const token = useSelector(state => state.auth.token)
  const messages = useSelector(state => state.messages.messages)
  const username = useSelector(state => state.auth.username)
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const currentChannelMessages = messages.filter(
    (message) => message.channelId === currentChannel?.id
  )
  const { t } = useTranslation()

  const handleSubmitMessage = async (e) => {
    e.preventDefault()
    if (text.trim() === '') return
    const message = {
      body: text,
      channelId: currentChannel?.id,
      username: username,
    }
    try {
      await axios.post(routes.getAddMessagesPath(), message, { headers: { Authorization: `Bearer ${token}` } } )
    }
    catch (err) {
      console.log(t('errors.messageNotSentErr'))
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
    setText('')
  }

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {currentChannel?.name}</b>
          </p>
          <span className="text-muted">{t('homePage.amountOfMessages.key', {count: currentChannelMessages.length})}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentChannelMessages.map(message => (
            <div className="text-break mb-2" key={message.id}>
            <b>{message.username}</b>
            : {message.body}
            </div>
            ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form noValidate className="py-1 border rounded-2" onSubmit={handleSubmitMessage}>
            <InputGroup hasValidation>
              <Form.Control
                name="body"
                type="text"
                placeholder={t('homePage.messagesPlaceholder')}
                aria-label={t('homePage.messagesAriaLabel')}
                className="border-0 p-0 ps-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" disabled={text.trim() === ''} variant={null} className="btn-group-vertical">
              <svg
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 16 16" 
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-right-square"
              >
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
              </svg>
              <span className="visually-hidden">{t('homePage.hiddenSpanSend')}</span>
            </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </Col>
  )
}

export default Messages