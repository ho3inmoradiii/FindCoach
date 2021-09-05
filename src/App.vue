<template>
    <the-header></the-header>
<router-view></router-view>
</template>

<script>
    import TheHeader from './components/UI/TheHeader';
    export default {
        components:{TheHeader}
    }

</script>

<style>
    * {
        box-sizing: border-box;
    }

    html {
        font-family: "Roboto", sans-serif;
    }

    body {
        margin: 0;
    }
</style>