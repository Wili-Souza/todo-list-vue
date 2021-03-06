<template>
    <div :class='`form ${formStyle}`'>
        <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(save)">
                <div>
                    <p class="erro_api" v-for="err of api_errors">{{ err }}</p>
                </div>
                <div v-if="register"  class="control">
                    <label for="name">Username</label>
                    <ValidationProvider rules="required|min:3|max:30" v-slot="{ errors }">
                        <input v-model="user.username" id='name'>
                        <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div><br>

                <div class="control">
                    <label for="email">email</label>
                    <ValidationProvider rules="required|min:8|max:120" v-slot="{ errors }">
                        <input v-model="user.email" id='email'>
                        <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div><br>

                <div class="control">
                    <label for="password">Password</label>
                    <ValidationProvider rules="required|min:8|max:120" v-slot="{ errors }">
                        <input type="password" v-model="user.password" id='password'>
                        <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <form-button type="submit" class="button" btnStyle="big account" :text='register ? "Register" : "Login"'></form-button>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
import User from '../../../domain/user/User.js'
import AuthService from '../../../domain/user/AuthService.js'
import Button from '../button/Button.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
    components: {
        'form-button': Button,
        ValidationProvider,
        ValidationObserver
    },

    props: {
        'register': {
            type: Boolean
        },
        'formStyle': {
            type: String
        }
    },

    data () {
        return {
            token: null,
            api_errors: [],
            user: new User()
        }
    },

    methods: {
        save () {
            this.api_errors = []

            if (this.register) {
                this.service = new AuthService(this.$resource)
                this.service
                    .register(this.user)
                    .then((res) => {
                        this.$router.push({name: "login"})
                    }, err => {
                        this.api_errors.push(err)
                    })

            } else {
                this.$store.dispatch('login', this.user)
                    .then(res => {
                        if (this.$router.path !== '/') {
                            this.$router.push({name: "tasks"})
                        }
                    }, err => {
                        this.api_errors.push(err)
                    })
            }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

.form {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;

    background: rgb(37, 41, 44);
    color: white;
    border-radius: 10px;
    box-shadow: 1px 1px 12px rgba(16, 124, 151, 0.5);
    padding: 2rem;

}

.form label {
    font-family: 'Montserrat';
}

.control {
    position: relative;
    display: block;
    margin: 2rem 1rem;
}

.control label {
    font-size: 1.3rem;
}

.control input {
    font-family: 'Montserrat';
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.8);

    margin-top: -0.4rem;
    padding-left: 1.5rem;
    width: 68%;
    float: right;
    height: 2rem;
    border-radius: 10px;
    border-style: none;
    box-shadow: 1px 1px 4px rgba(255, 255, 255, 0.3);

}

.control input:focus {
    outline: none;
    box-shadow: 1px 1px 4px rgba(141, 141, 141, 0.9);
}

.validate-input {
    position: relative;
}

.error {
    font-family: 'Montserrat';
    font-size: 0.8rem;
    position: absolute;
    color: rgb(231, 68, 62);
    bottom: -1.7rem;
    left: 30%;
}

.button {
    position: relative;
    left: 50%;
    transform:  translateX(-50%);
    bottom: -3.3rem;
}

.erro_api {
    font-family: 'Montserrat';
    color: rgb(231, 68, 62);
}

@media (max-width: 975px) {
    .control {
        position: relative;
        display: block;
        margin: 1rem 0;
    }

    .control input {
        margin-top: 1rem;
        width: 90%;
        float: none;
    }

    .error {
        left: 0;
        top: 110%;
    }
}

</style>