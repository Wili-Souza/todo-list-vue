<template>
    <div class="dash-content">
        <div class="box user-info">
            <h2>Username: 
                <font-awesome-icon @click="" class='icon edit-icon' icon='edit'></font-awesome-icon>
                <span>{{user.username}}</span>
            </h2>
            
            <h2>Email: 
                <font-awesome-icon @click="" class='icon edit-icon' icon='edit'></font-awesome-icon>
                <span>{{user.email}}</span>
            </h2>
        </div>
        <div class="box account-info">
            <form-button @click="reset_password" type="button" btnStyle="mid" text="Change password"></form-button>
            <form-button class="right-button" type="button" btnStyle="mid danger" text="Delete account"></form-button>
        </div>
    </div>
</template>

<script>
import User from '../../domain/user/User.js'
import UserService from '../../domain/user/UserService.js'
import AuthService from '../../domain/user/AuthService.js'
import Button from '../shared/button/Button.vue'

export default {
    components: {
        'form-button': Button
    },

    data () {
        return {
            user: new User
        }
    },
    
    created () {
        if (!this.$store.state.token) {
            this.$router.push({name: 'login'})
        } else {
            this.service = new UserService(this.$resource)
            this.service
                .get()
                .then(res => {
                    this.user.username = res.username
                    this.user.email = res.email
                }, err => console.log(err))
        }
    },


    methods: {
        reset_password () {
            this.authService = new AuthService(this.$resource)
            this.authService
                .recover_password(this.user)
                .then(res => console.log('email enviado'))
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

.dash-content{
    font-family: 'Montserrat';
    margin: 0;
    width: 65%;
    display: inline-block;
    margin-left: 20%;
    padding: 4%;
    vertical-align: top;
}

.box {
    padding: 1rem 20%;
    border-radius: 5px;
    box-shadow: 1px 1px 12px rgba(141, 141, 141, 0.2);
    margin-bottom: 1rem;
}

.user-info {
    background: white;
}

.user-info span {
    color: rgb(255, 180, 0);
    float: right;
}

.icon {
    color: rgba(0, 0, 0, 0.3);
    margin: 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
}

.icon:hover{
    color: black;
}

.edit-icon {
    float: right;
}

.account-info {
    background: rgba(255, 255, 255, 0.6);
}

.right-button {
    float: right;
}

</style>