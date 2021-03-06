<template>
    <div class="dash-reset">
        <div class="box">
            <div class="errors_api">
                <p class="error_api" v-for="err of api_errors">{{ err }}</p>
            </div>
            <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(reset)" class="reset-form">
                    <div class="control">
                        <label for="password">New password:</label>
                        <ValidationProvider rules="required|min:8|max:120" v-slot="{ errors }">
                            <input type="password" v-model="new_pass" id="password" />
                            <span class="error">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    
                    <br><br>
                    
                    <div class="control">
                        <label for="confirmation">Confirm password:</label>
                        <ValidationProvider rules="required" v-slot="{ errors }">
                            <input type="password" v-model="confirm_pass" id="confirmation" />
                            <span class="error">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>

                    <form-button class="button" type="submit" btnStyle="mid" text="Save"></form-button>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import Button from '../shared/button/Button.vue'
import AuthService from '../../domain/user/AuthService.js'
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
    components: {
        'form-button': Button,
        ValidationProvider,
        ValidationObserver
    },

    data () {
        return {
            'new_pass': null,
            'confirm_pass': null,
            'api_errors': []
        }
    },

    created () {
        this.service = new AuthService(this.$resource)
    },

    methods: {
        reset () {
            if (this.new_pass == this.confirm_pass) {
                this.api_errors = []
                this.service
                    .reset_password({
                        'reset_token': this.$route.params.token,
                        'password': this.new_pass
                    })
                    .then(() => {
                        alert('Password changed!')
                        this.$router.push({name: 'login'})
                    }, err => {
                        this.api_errors.push(err)
                    })
            } else {
                this.api_errors.push('The passwords need to match.')
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
    margin-left: 25%;
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
    width: 100%;
    border-style: none;
    border-radius: 5px;
    box-shadow: 1px 1px 4px rgba(141, 141, 141, 0.5);
    display: block;
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

.control {
    position: relative;
}

.error {
    font-family: 'Montserrat';
    font-size: 0.8rem;
    position: absolute;
    color: rgb(231, 68, 62);
    bottom: -1.3rem;
}

.errors_api {
    margin: -0.5rem auto 2rem 2rem;
}

.error_api{
    color: rgb(231, 68, 62);
    word-break: break-all;
    display: block;
    margin: -0.5rem auto 2rem auto;
}

@media (max-width: 1230px) {
   .reset-form {
        width: 90%;
   }
}

@media (max-width: 1050px) {
   input {
       float: none;
       display: block;
       margin-top: 1rem;
       width: 90%;
   }

    .errors_api {
        margin: -0.5rem auto 2rem auto;
    }
}

</style>