<template>
    <Toolbar/>
    <main>
        <DrawableCanvas/>
    </main>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
    @use '~/assets/styles/normalize';

    @use '~/assets/styles/colors' as *;

    @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

    * {
        font-family: 'Inter';
        

        &::selection {
            background-color: $ink-black;
            color: white;
        }
    }

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 18px 45px 25px 45px;
    }
    
    @media (max-width: 500px) {
        main {
            padding: 18px 20px 25px 20px;
        }
    }

    
</style>