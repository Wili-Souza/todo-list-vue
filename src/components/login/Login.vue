<template>
    <div class='login-page'>
        <login-form formStyle="form-login"></login-form>
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
            
        }
    },
}
</script>

<style>
.login-page{
    margin-left: 20%;
    padding-top: 10rem;
}
</style>