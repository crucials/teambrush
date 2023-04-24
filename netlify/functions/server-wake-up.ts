import { Handler, HandlerContext, HandlerEvent, schedule } from '@netlify/functions'
import { connect } from '~/server'

const scheduledHandler : Handler = async (event: HandlerEvent, context: HandlerContext) => {
    connect(socket => {
        socket.disconnect()
    })
 
    return {
       statusCode: 200,
    }
}

const handler = schedule('*/10 * * * *', scheduledHandler)

export { handler }