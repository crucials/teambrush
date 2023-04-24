<template>
    <div class="toolbar">
        <NuxtLink to="/">
            <img src="~/assets/images/labelled-logo.svg" alt="Two brushes above canvas and 'TeamBrush' label near them">
        </NuxtLink>

        <ToolList/>
    </div>
</template>

<script setup lang="ts">
    
</script>

<style scoped lang="scss">
    .toolbar {
        padding: 40px;
        display: flex;
        justify-content: space-between;
        column-gap: 20px;
        align-items: center;
    }

    @media (max-width: 780px) {
        .toolbar {
            justify-content: center;
            column-gap: 70px;
            row-gap: 25px;
            flex-wrap: wrap;
        }
    }
</style>