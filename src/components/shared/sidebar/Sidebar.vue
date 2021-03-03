<template>
    <div class="sidebar">
        <ul>
            <router-link v-if="loggedIn" :to="{name: 'tasks'}">
                <div class="card-option">Tasks<div class="border"></div></div>
            </router-link>

            <router-link v-if="!loggedIn" :to="{name: 'login'}">
                <div class="card-option">Login<div class="border"></div></div>
            </router-link>

            <router-link v-if="!loggedIn"  :to="{name: 'register'}">
                <div class="card-option">Register<div class="border"></div></div>
            </router-link>

            <router-link v-if="loggedIn" :to="{name: 'logout'}">
                <div class="card-option">logout<div class="border"></div></div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            'routes': {
                type: Array,
                required: true
            }
        },

        computed: {
            loggedIn() {
                return this.$store.getters.loggedIn
            }
    }
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

body{
    margin: 0;
}

a{
    text-decoration: none;
}

.sidebar{
    position: fixed;
    font-family: 'Bebas Neue';
    font-size: 1.3rem;
    font-weight: 300;
    letter-spacing: 0.2rem;
    display: inline-block;
    width: 20%;
    height: 50rem;
    background: rgb(37, 41, 44);
}

.sidebar ul{
    width: 100%;
    padding: 0;
    margin: 0;
}

.card-option{
    position: relative;
    width: 100%;
    padding: 1.5rem 0 1.5rem 0;
    list-style: none;
    text-align: center;
    color: rgb(255, 208, 0);
}

.border{
    position: absolute;
    top: 0;
    right: 0;

    background: rgb(255, 180, 0);
    width: 5px;
    transition: all .4s;
    height: 0;
}

.card-option:hover {
    color: rgb(255, 180, 0);
}

.card-option:hover .border {
    height: 100%;
}
</style>