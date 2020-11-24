<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!this.$route.meta.keepAlive" />
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {};
    },
    created() {},
    mounted() {}
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
