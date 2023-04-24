import { io, Socket } from 'socket.io-client'
import { DrawEventCallback, DrawEventData } from './types'

export const SERVER_URL = 'wss://teambrush-backend.onrender.com'
export const SERVER_URL_HTTP = 'https://teambrush-backend.onrender.com'

export let connected = false

let drawEventHandler : DrawEventCallback = () => {}
let currentSocket : Socket

connect(socket => {
    connected = true
    currentSocket = socket
    socket.on('draw', drawEventHandler)
})

export function connect(doOnSuccess : (socket : Socket) => void) {
    const socket = io(SERVER_URL)
    socket.on('connect', () => {
        doOnSuccess(socket)
    })
}

export function emitDrawEvent(data : DrawEventData) {
    currentSocket?.emit('draw', data)
}

export function setDrawEventHandler(handler : DrawEventCallback) {
    drawEventHandler = handler
}