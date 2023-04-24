import { connect } from '~/server'

export default async () => {
    connect(socket => {
        socket.disconnect()
    })
}