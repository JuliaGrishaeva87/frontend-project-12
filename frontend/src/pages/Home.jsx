import axios from "axios"
import { useEffect } from "react"
import routes from "../routes"
import { useSelector, useDispatch } from "react-redux"
import { setChannels } from "../slices/channelsSlice"
import { setMessages } from "../slices/messagesSlice"
import { Container, Row } from "react-bootstrap"
import Channels from "../components/Channels.jsx"
import Messages from "../components/Messages.jsx"

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

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  )
}

export default Home