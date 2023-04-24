<template>
    <div class="color-picker">
        <button class="pick-color-button" @click="opened = !opened">
            <div class="color" :class="`${Object.keys(colors).find(key => colors[key] == color)}-background`"></div>
        </button>

        <ul class="colors-drop-down-list" :class="{ 'colors-drop-down-list-opened': opened }">
            <li v-for="(colorCode, colorName, index) in colors">
                <button class="pick-color-button" @click="selectColor(colors[colorName])">
                    <div class="color" :class="`${colorName}-background`"></div>
                </button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import { useSelectedToolStore } from '~/stores/selected-tool'

    const opened = ref(false)

    const colors : Record<string, string> = {
        'dark-water': '#003459',
        'ink-black': '#00171F',
        'green': '#005944',
        'red': '#D83131'
    }
    const { color } = storeToRefs(useSelectedToolStore())

    onMounted(() => {
        document.addEventListener('click', event => {
            const targetElement = event.target as HTMLElement
            
            if(!targetElement.closest('.colors-drop-down-list') && 
                !targetElement.closest('.pick-color-button')) {
                opened.value = false
            }
        })
    })

    function selectColor(colorToSelect : string) {
        opened.value = false
        color.value = colorToSelect
    }
</script>

<style scoped lang="scss">
    @use '~/assets/styles/colors' as *;

    .color-picker {
        position: relative;
    }

    .pick-color-button {
        padding: 5px;
        border-radius: 4px;
        border: 1px solid #00171F25
    }

    .color {
        width: 38px;
        height: 38px;
        border-radius: 4px;
    }

    .colors-drop-down-list {
        position: absolute;
        top: 0%;
        left: 0px;
        opacity: 0;
        pointer-events: none;
        transition: top 0.35s ease-in-out, opacity 0.3s;

        padding: 16px 14px;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0px 0px 15px 0px #00171F40;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        .color {
            width: 30px;
            height: 30px;
        }

        .pick-color-button {
            padding: 3px;
            transition: scale 0.25s;

            &:hover {
                scale: 1.05;
            }
        }
    }

    .colors-drop-down-list-opened {
        top: 115%;
        opacity: 1;
        pointer-events: auto;
    }

    .dark-water-background {
        background-color: $dark-water;
    }

    .ink-black-background {
        background-color: $ink-black;
    }

    .red-background {
        background-color: #D83131;
    }

    .green-background {
        background-color: #005944;
    }
</style>