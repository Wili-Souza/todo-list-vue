<template>
</template>

<script>
export default {
    created() {
        
        if (this.$store.getters.loggedIn) {
            this.$store.dispatch('destroyToken')
        } else {
            this.$router.push({name: 'login'})
        }
    }
}
</script>

<style scoped>
</style>