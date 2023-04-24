<template>
    <canvas class="canvas" ref="canvas">

    </canvas>
</template>

<script lang="ts" setup>
    import { useSelectedToolStore } from '~/stores/selected-tool'
    import { useCanvasDownloadUrlStore } from '~/stores/canvas-download-url'
    import { getToolByName } from '~/tools'
    import { connected, emitDrawEvent, setDrawEventHandler } from '~/server'

    const { selectedToolName, color } = storeToRefs(useSelectedToolStore())
    const { canvasDownloadUrl } = storeToRefs(useCanvasDownloadUrlStore())

    const canvas = ref<HTMLCanvasElement | undefined>()

    onMounted(async () => {
        const canvasElement = canvas.value
        const context = canvasElement?.getContext('2d')

        if(canvasElement && context) {
            let mousePosition = { x: 0, y: 0 }
            let updateUrlTimeoutId = 0

            updateDownloadUrl()

            updateCanvasSize()
            window.addEventListener('resize', updateCanvasSize)

            canvasElement.addEventListener('pointerdown', event => {
                updateMousePosition(event)
                const selectedTool = getToolByName(selectedToolName.value)
                if(selectedTool?.draggable) {
                    canvasElement.addEventListener('pointermove', draw)
                    canvasElement.addEventListener('touchmove', (event) => event.preventDefault())
                }
                else {
                    draw(event)
                }
            })

            canvasElement.addEventListener('pointerup', () => {         
                canvasElement.removeEventListener('pointermove', draw)
            })

            setDrawEventHandler((eventData) => {
                const { toolName, startX, startY, endX, endY, color: usedColor } = eventData

                setupContext(usedColor)

                const usedTool = getToolByName(toolName)
                usedTool?.draw(context, startX, startY, endX, endY)
            })

            function updateCanvasSize() {
                if(canvasElement) {
                    const imageDataUrl = canvasElement.toDataURL()
                    canvasElement.width = canvasElement.offsetWidth
                    canvasElement.height = canvasElement.offsetHeight
                    
                    const canvasImage = new Image()
                    canvasImage.addEventListener('load', () => {
                        context?.drawImage(canvasImage, 0, 0)
                    })
                    canvasImage.src = imageDataUrl
                }
            }

            function updateMousePosition(event : MouseEvent) {
                if(canvasElement) {
                    mousePosition.x = event.clientX - canvasElement.offsetLeft
                    mousePosition.y = event.clientY - canvasElement.offsetTop + window.scrollY
                }
            }

            function draw(event : MouseEvent) {
                updateDownloadUrl()
                setupContext()

                if(connected) {
                    event.preventDefault()
                    if(context) {
                        const { x: startX, y: startY } = mousePosition
                        updateMousePosition(event)
                        const { x: endX, y: endY } = mousePosition

                        const usedTool = getToolByName(selectedToolName.value)
                        usedTool?.draw(context, startX, startY, endX, endY)

                        emitDrawEvent({ 
                            startX, startY, endX, endY, 
                            toolName: selectedToolName.value, 
                            color: color.value
                        })
                    }
                }
            }

            function setupContext(customColor? : string) {
                if(context) {
                    context.lineWidth = 3
                    context.lineCap = 'round'
                    
                    if(customColor) {
                        context.strokeStyle = customColor
                    }
                    else {
                        context.strokeStyle = color.value
                    }
                }
            }

            function updateDownloadUrl() {
                clearTimeout(updateUrlTimeoutId)

                updateUrlTimeoutId = window.setTimeout(() => {
                    if(canvasElement) {
                        canvasDownloadUrl.value = canvasElement.toDataURL('image/png')
                    }
                }, 500)
            }
        }
    })
</script>

<style scoped lang="scss">
    .canvas {
        aspect-ratio: 16 / 9;
        max-width: 1300px;
        width: 100%;
        border: 1px solid #00171F20;
        border-radius: 8px;
        min-width: 300px;
        min-height: 360px;
    }
</style>