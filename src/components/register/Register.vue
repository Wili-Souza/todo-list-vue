<template>
    <div class='register-page'>
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

<style scoped>
.register-page{
    margin-left: 25%;
    padding-top: 6rem;
}

@media (max-width: 930px) {
    .register-page{
        padding-top: 2rem;
    }
}
</style>