<template>
    <div :class='`form ${formStyle}`'>
        <form @submit.prevent="save">
            <div v-if="register"  class="control">
                <label for="name">Username</label>
                <input v-model="user.username" id='name'>
            </div><br>

            <div class="control">
                <label for="email">email</label>
                <input v-model="user.email" id='email'>
            </div><br>

            <div class="control">
                <label for="password">Password</label>
                <input v-model="user.password" id='password'>
            </div>

            <form-button @click="save" type="submit" class="button" btnStyle="big account" :text='register ? "Register" : "Login"'></form-button>
        </form>
    </div>
</template>

<script>
import User from '../../../domain/user/User.js'
import AuthService from '../../../domain/user/AuthService.js'
import Button from '../button/Button.vue'

export default {
    components: {
        'form-button': Button
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
            user: new User()
        }
    },

    methods: {
        save () {
            if (this.register) {
                this.service = new AuthService(this.$resource)
                this.service
                .register(this.user)
                .then(() => {
                    this.$router.push({name: "login"})
                })

            } else {
                this.$store.dispatch('login', this.user)
                    .then(res => {
                        if (this.$route.path !== '/') {
                            this.$router.push({name: "tasks"})
                        }
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
    height: 20rem;
    color: white;
    border-radius: 10px;
    box-shadow: 1px 1px 12px rgba(16, 124, 151, 0.5);
    padding: 2rem;

}

.form-login {
    height: 14.5rem;
}

.form label {
    font-family: 'Montserrat';
}

.control {
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

.button {
    position: relative;
    left: 50%;
    transform:  translateX(-50%);
    bottom: -1.3rem;
}
</style>