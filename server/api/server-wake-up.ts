import { connect } from '~/server'

export default function handler() {
    connect(socket => {
        socket.disconnect()
    })
}