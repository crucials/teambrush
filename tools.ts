import { Tool } from './types'

export const tools : Tool[] = [
    {
        name: 'brush',
        draw(context, startX, startY, endX, endY) {
            context.beginPath()
            context.moveTo(startX, startY)
            context.lineTo(endX, endY)
            context.stroke()
        },
        draggable: true,
    },

    {
        name: 'rectangle',
        draw(context, startX, startY, endX, endY) {
            const width = 200
            const height = 150
            context.strokeRect(startX - width / 2, startY - height / 2, width, height)
        },
        draggable: false,
    },

    {
        name: 'circle',
        draw(context, startX, startY, endX, endY) {
            context.beginPath()
            context.arc(startX, startY, 100, 0, 2 * Math.PI, false)
            context.stroke()
        },
        draggable: false,
    },

    {
        name: 'eraser',
        draw(context, startX, startY, endX, endY) {
            context.beginPath()
            context.globalCompositeOperation = 'destination-out'
            context.arc(endX, endY, 30, -0, 2 * Math.PI, false)
            context.fill()
            context.globalCompositeOperation = 'source-over'
        },
        draggable: true
    }
]

export function getToolByName(name : string) {
    return tools.find(tool => tool.name == name)
}