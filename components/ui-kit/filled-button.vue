<template>
    <button class="filled-button">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
    @use '~/assets/styles/colors' as *;

    .filled-button {
        padding: 12px 32px;
        border-radius: 4px;
        background-color: $ink-black;
        color: white;
        font-size: 1rem;
        transition: box-shadow 0.3s ease-in-out, background-color 0.15s;
        
        &:hover {
            box-shadow: 0px 0px 23px 0px #00171F43;
        }

        &:active {
            background-color: $dark-water;
        }
    }
</style>