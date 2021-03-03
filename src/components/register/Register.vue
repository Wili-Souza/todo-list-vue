<template>
    <div class='login-page'>
        <login-form :register="true"></login-form>
    </div>
</template>

<script>
import Form from '../shared/form/Form.vue'

export default {
    components: {
        'login-form': Form
    },

    data () {
        return {
            'username': '',
            'email': '',
            'password': '',
        }
    },
}
</script>

<style>
.login-page{
    margin-left: 20%;
    padding-top: 6rem;
}
</style>