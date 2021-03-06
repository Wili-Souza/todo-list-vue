<template>
</template>

<script>
export default {
    created() {
        if (this.$store.getters.loggedIn) {
            if(confirm('Do you want to leave?')){
                this.$store.dispatch('destroyToken')
                this.$router.push({name: 'login'})
            } else {
                this.$router.push({name: 'tasks'})
            }
        } else {
            this.$router.push({name: 'login'})
        }
    }
}
</script>

<style scoped>
</style>