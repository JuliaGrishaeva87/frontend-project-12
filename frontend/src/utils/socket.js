import { io } from 'socket.io-client'

const socket = io('http://localhost:5002')

export const socketEmitPromise = (event, data) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Timeout response'))
    }, 5000)

    socket.emit(event, data, (response) => {
      clearTimeout(timer)

      if (response && response.status === 'ok') {
        resolve(response.data);
      } else {
        reject(new Error(response?.error || 'Server error'));
      }
    })
  })
}

export default socket