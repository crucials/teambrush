export const useSelectedToolStore = defineStore('selectedTool', () => {
    const selectedToolName = ref('brush')
    const color = ref('#003459')

    return { selectedToolName, color }
})