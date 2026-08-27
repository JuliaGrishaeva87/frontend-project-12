import { createRoot } from 'react-dom/client'
import init from './init.jsx'
import socket from './utils/socket.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

const run = async () => {
  const vdom = await init(socket)
  createRoot(document.getElementById('root')).render(vdom)
}

run()
