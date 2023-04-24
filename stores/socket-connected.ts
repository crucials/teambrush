export const useSocketConnectedStore = defineStore('socketConnected', () => {
    const socketConnected = ref(false)

    return { socketConnected }
})