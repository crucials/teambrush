import { Handler, HandlerContext, HandlerEvent, schedule } from '@netlify/functions'
import { SERVER_URL_HTTP } from '~/server'

const scheduledHandler : Handler = async (event: HandlerEvent, context: HandlerContext) => {
    await fetch(SERVER_URL_HTTP)
 
    return {
       statusCode: 200,
    }
}

const handler = schedule('*/10 * * * *', scheduledHandler)

export { handler }