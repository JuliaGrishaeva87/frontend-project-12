import axios from 'axios'
import { useEffect } from 'react'
import routes from '../utils/routes.js'
import { useSelector, useDispatch } from 'react-redux'
import { setChannels } from '../slices/channelsSlice'
import { addMessage, setMessages } from '../slices/messagesSlice'
import { addChannel, removeChannel, editChannel } from '../slices/channelsSlice'
import { Container, Row } from 'react-bootstrap'
import Channels from '../components/Channels.jsx'
import Messages from '../components/Messages.jsx'
import ModalWindow from '../components/modals/index.jsx'
import { useTranslation } from 'react-i18next'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { Text } from '@mantine/core'
import * as Sentry from "@sentry/react"

const Home = ({ socket }) => {
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [channelsResponse, messagesResponse] = await Promise.all(
        [axios.get(routes.getAddChannelsPath(), { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(routes.getAddMessagesPath(), { headers: { Authorization: `Bearer ${token}` } })])
        dispatch(setChannels(channelsResponse.data))
        dispatch(setMessages(messagesResponse.data))
      }
      catch (err) {
        console.log(err)
        Sentry.captureException(err)
        notifications.show({
          title: '',
          message: (
            <Text c="gray.6" size="md">
              {t('toast.errors.failedLoad')}
            </Text>
          ),
          color: 'red',
          icon: <IconX size={16} />,
          autoClose: 5000,
        })
      }
    }
    fetchData()
  }, [dispatch, t, token])

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload))
    })

    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload))
    })

    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload))
    })

    socket.on('renameChannel', (payload) => {
      dispatch(editChannel(payload))
    })

    return () => {
      socket.off('newMessage')
      socket.off('newChannel')
      socket.off('removeChannel')
      socket.off('renameChannel')
    }
  },[dispatch, socket])

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
      <ModalWindow />
    </Container>
  )
}

export default Home