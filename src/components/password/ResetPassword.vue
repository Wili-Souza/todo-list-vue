<template>
    <div class="dash-reset">
        <div @submit.prevent="reset" class="box">
            <form class="reset-form">
                <label for="password">New password:</label>
                <input v-model="new_pass" id="password" /><br><br>

                <label for="confirm">Confirm password:</label>
                <input v-model="confirm_pass" id="confirm" />

                <form-button class="button" type="submit" btnStyle="mid" text="Save"></form-button>
            </form>
        </div>
    </div>
</template>

<script>
import Button from '../shared/button/Button.vue'
import AuthService from '../../domain/user/AuthService.js'

export default {
    components: {
        'form-button': Button
    },

    data () {
        return {
            'new_pass': null,
            'confirm_pass': null
        }
    },

    created () {
        this.service = new AuthService(this.$resource)
    },

    methods: {
        reset () {
            if (this.new_pass == this.confirm_pass) {
                this.service
                    .reset_password({
                        'reset_token': this.$route.params.token,
                        'password': this.new_pass
                    })
            } else {
                console.log("erro")
                // erro 
            }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

.dash-reset{
    font-family: 'Montserrat';
    margin: 0;
    width: 65%;
    margin-left: 20%;
    padding: 4%;
    vertical-align: top;
}

.box {
    background: white;
    padding: 3rem 2rem;
    border-radius: 5px;
    box-shadow: 1px 1px 12px rgba(141, 141, 141, 0.2);
    margin-bottom: 1rem;
}

.reset-form {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 60%
}

label {
    font-size: 1.4rem;
}

input {
    height: 2rem;
    width: 50%;
    border-style: none;
    border-radius: 5px;
    box-shadow: 1px 1px 4px rgba(141, 141, 141, 0.5);
    float: right;
    font-family: 'Montserrat';
    font-size: 1rem;
    padding-left: 0.5rem
}

input:focus{
    outline: none;
    box-shadow: 1px 1px 4px rgba(141, 141, 141, 0.8);
}

.button {
    position: relative;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
}

</style>