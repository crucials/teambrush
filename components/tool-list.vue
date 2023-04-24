<template>
    <ul class="tools">
        <li>
            <FilledButton class="download-button" @click="download">
                Download canvas
            </FilledButton>

            <a href="" class="download-canvas-link" download="canvas.png" ref="downloadCanvasLink"></a>
        </li>

        <li>
            <ColorPicker/>
        </li>

        <li v-for="tool in tools">
            <button class="tool" :class="{ 'tool-selected': selectedToolName == tool.name }"
                @click="selectedToolName = tool.name">

                <svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg"
                    v-if="tool.name == 'brush'" class="tool-icon-outlined">
                    <path d="M9.08496 15.171L13.6571 10.6439M13.6571 10.6439L24.2897 1.68327C24.5613 1.45445 24.8685 1.27091 25.1995 1.13981L25.248 1.12064C26.5897 0.589229 27.921 1.90758 27.3844 3.23609L27.365 3.284C27.2327 3.61176 27.0473 3.91601 26.8162 4.18483L17.7662 14.7125M13.6571 10.6439C15.0268 10.7624 17.7662 11.742 17.7662 14.7125M12.3723 20.0533L17.7662 14.7125" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.40656 21.4633C2.88951 18.7486 5.02763 16.2426 7.86097 16.2426C10.3631 16.2426 12.3915 18.2194 12.3915 20.6577V21.0059C12.3915 23.6367 10.2031 25.7692 7.50368 25.7692H2.49575C2.01777 25.7692 1.8176 25.1743 2.20279 24.8985L3.52567 23.9512C3.71654 23.8147 3.81035 23.5837 3.76715 23.3566L3.40656 21.4633Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> 

                <svg width="32" height="23" viewBox="0 0 32 23" fill="none" xmlns="http://www.w3.org/2000/svg"
                    v-else-if="tool.name == 'rectangle'" class="tool-icon-outlined">
                    <rect x="1.5" y="1.5" width="29" height="20" rx="2.5" stroke-width="3"/>
                </svg>

                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"
                    v-else-if="tool.name == 'circle'" class="tool-icon-outlined">
                    <circle cx="14.5" cy="14.5" r="13" stroke-width="3"/>
                </svg>

                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"
                    v-if="tool.name == 'eraser'" class="tool-icon-filled">
                    <g clip-path="url(#clip0_25_72)">
                        <path d="M28.4209 6.68801L23.1219 0.769837C22.7143 0.314969 22.1434 0.039776 21.5337 0.00432899C20.9241 -0.031118 20.3251 0.176067 19.8676 0.580644L2.3296 16.0816C1.91747 16.446 1.64864 16.9454 1.57133 17.4901L1.01151 21.4454C0.964056 21.7792 0.990283 22.1192 1.08834 22.4417C1.1864 22.7642 1.35392 23.0614 1.57911 23.3122L6.8784 29.2304C7.09557 29.4725 7.36131 29.6662 7.65832 29.7988C7.95533 29.9314 8.27695 30 8.60222 30C9.16614 30.0001 9.71063 29.794 10.1331 29.4204L27.6717 13.9186C28.0838 13.5542 28.3527 13.0548 28.43 12.5101L28.9896 8.55479C29.037 8.22098 29.0106 7.88085 28.9123 7.55832C28.8141 7.2358 28.6464 6.93873 28.4209 6.68801ZM9.01741 28.1604C8.90267 28.2627 8.7541 28.319 8.60033 28.3184C8.51148 28.3189 8.42356 28.3005 8.34245 28.2642C8.26134 28.2279 8.18893 28.1747 8.13006 28.1082L2.83098 22.1898C2.76953 22.1215 2.72382 22.0405 2.69709 21.9525C2.67035 21.8646 2.66324 21.7719 2.67626 21.6809L3.23608 17.7253C3.25726 17.5768 3.33058 17.4407 3.44294 17.3413L11.2262 10.4628C11.467 10.5436 11.6826 10.6855 11.8518 10.8748L16.5879 16.164L8.54903 23.2065L9.65732 24.4714L17.5077 17.5931C17.5234 17.7194 17.5226 17.8471 17.5056 17.9732L17.071 21.0424L9.01741 28.1604Z"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_25_72">
                            <rect width="30" height="30"/>
                        </clipPath>
                    </defs>
                </svg>

            </button>   
        </li>
    </ul>
</template>

<script setup lang="ts">
    import { useSelectedToolStore } from '~/stores/selected-tool'
    import { useCanvasDownloadUrlStore } from '~/stores/canvas-download-url'
    import { tools } from '~/tools'

    const { selectedToolName } = storeToRefs(useSelectedToolStore())
    const { canvasDownloadUrl } = storeToRefs(useCanvasDownloadUrlStore())

    const downloadCanvasLink = ref<HTMLAnchorElement | undefined>()

    function download() {
        const downloadCanvasLinkElement = downloadCanvasLink.value
        if(downloadCanvasLinkElement) {
            downloadCanvasLinkElement.href = canvasDownloadUrl.value
            downloadCanvasLinkElement.click()
        }
    }
</script>

<style scoped lang="scss">
    @use '~/assets/styles/colors' as *;

    .tools {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 25px;
        flex-wrap: wrap;
        row-gap: 20px;
    }

    .tool {
        padding: 8px;
        border-radius: 4px;
        transition: background-color 0.3s;

        .tool-icon-outlined * {
            stroke: $ink-black;
        }

        .tool-icon-filled * {
            fill: $ink-black;
        }

        &:hover {
            background-color: hsl(0, 0%, 91%);
        }
    }

    .tool-selected {
        background-color: $ink-black;

        .tool-icon-outlined * {
            stroke: white;
        }

        .tool-icon-filled * {
            fill: white;
        }

        &:hover {
            background-color: darken($ink-black, 4);
        }
    }

    .download-button {
        margin-right: 45px;
    }

    .download-canvas-link {
        display: none;
    }

    @media (max-width: 780px) {
        .download-button {
            margin-right: 0px;
        }
    }
</style>