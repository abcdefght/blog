<template>
    <div id="hidden">

    </div>
</template>

<script>
    export default {
        name: "Hidden",
    }
</script>

<style scoped lang="less">
    #hidden{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: black;
        opacity: 0.3;
        z-index: 100;
    }
</style>
