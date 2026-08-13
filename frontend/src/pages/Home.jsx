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
import socket from '../utils/socket.js'
import ModalWindow from '../components/modals/index.jsx'

const Home = () => {
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

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
      }
    }
    fetchData()
  }, [])

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
  },[])

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