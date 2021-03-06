<template>
    <div class="dash-content">
        <div class="box user-info">
            <h2>Username: 
                <div class="container" v-if="edit_name_mode">
                    <font-awesome-icon @click="edit_mode('username')" class='icon close-icon' :icon="['fa', 'times-circle']"></font-awesome-icon>
                    <font-awesome-icon @click="edit_data('username')" class='icon confirm-icon' :icon="['fa', 'check-circle']"></font-awesome-icon>
                    <input class="user-input" v-model="input_username"/>
                </div>
                <div class="container" v-else>
                    <font-awesome-icon @click="edit_mode('username')" class='icon edit-icon' icon='edit'></font-awesome-icon>
                    <span >{{user.username}}</span>
                </div>
            </h2>
            
            <h2>Email: 
                <div class="container" v-if="edit_email_mode">
                    <font-awesome-icon @click="edit_mode('email')" class='icon close-icon' :icon="['fa', 'times-circle']"></font-awesome-icon>
                    <font-awesome-icon @click="edit_data('email')" class='icon confirm-icon' :icon="['fa', 'check-circle']"></font-awesome-icon>
                    <input class="user-input" v-model="input_email"/>
                </div>
                <div class="container" v-else>
                    <font-awesome-icon @click="edit_mode('email')" class='icon edit-icon' icon='edit'></font-awesome-icon>
                    <span>{{user.email}}</span>
                </div>
            </h2>
        </div>
        <div class="box account-info">
            <form-button @click="reset_password" class="btn" type="button" btnStyle="mid" text="Change password"></form-button>
            <form-button @click="delete_user" class="btn right-button" type="button" btnStyle="mid danger" text="Delete account"></form-button>
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
            'edit_name_mode': false,
            'edit_email_mode': false,

            'input_username': '',
            'input_email': '',
            user: new User
        }
    },
    
    created () {
        if (!this.$store.state.token) {
            this.$router.push({name: 'login'})
        } else {
           this.get_user_data()
        }
    },


    methods: {
        get_user_data () {
             this.service = new UserService(this.$resource)
            this.service
                .get()
                .then(res => {
                    this.user.username = res.username
                    this.input_username = res.username

                    this.user.email = res.email
                    this.input_email = res.email
                }, err => console.log(err))
        },

        reset_password () {
            this.authService = new AuthService(this.$resource)
            this.authService
                .recover_password(this.user)
                .then(res => {
                    alert('Email sent with recovery information.')
                }, err => {
                    alert("We're having some problems, please try again later.")
                })
        },

        edit_mode (value) {
             if (value == 'username') {
                this.edit_name_mode = !this.edit_name_mode 
            } else {
                this.edit_email_mode = !this.edit_email_mode
            }
        },

        edit_data (value) {
            if (value == 'username') {
                if(this.input_username != null && this.input_username != '') {
                    this.field = this.input_username
                } else {
                    alert(`Invalid ${value}`)
                }
            } else {
                if(this.input_email != null && this.input_email != '') {
                    this.field = this.input_email
                } else {
                    alert(`Invalid ${value}`)
                }
            }

            this.data = {
                [value]: this.field
            }

            this.service
                .update(this.data)
                .then(() => {
                    this.edit_mode(value)
                    this.get_user_data()
                }, err => {
                    alert(`This ${value} already exists.`)
                })
        },

        delete_user () {
            const message = `This will delete your account, you will lose all your data!
            Do you want to continue?`
            if(confirm(message)){
                this.service
                    .remove()
                    .then(() => {
                        this.$router.push({name: 'logout'})
                    })
            }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

span, input {
    word-break: break-all;
}

.dash-content{
    font-family: 'Montserrat';
    margin: 0;
    width: 65%;
    display: inline-block;
    margin-left: 25%;
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
}

.container {
    float: right;
}

.user-input {
    height: 2rem;
    text-align: right;
    padding-left: 0.7rem;
    color: rgb(255, 180, 0);
    font-family: 'Montserrat';
    font-size: 1.5rem;
    font-weight: bold;
    border-style: none;
    box-shadow: 1px 1px 4px rgba(141, 141, 141, 0.4);
}

.user-input:focus {
    outline: none;
    box-shadow: 1px 1px 4px rgba(141, 141, 141, 0.8);

}

.icon {
    color: rgba(0, 0, 0, 0.3);
    margin: 0.5rem 0 0.5rem 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    float: right;
}

.icon:hover{
    color: black;
}

.confirm-icon {
    color: rgba(41, 165, 41,.3);
}

.confirm-icon:hover {
    color: rgb(41, 165, 41);
}

.close-icon {
    color: rgba(165, 45, 41, 0.3);
}

.close-icon:hover {
    color: rgb(165, 45, 41);
}

.account-info {
    background: rgba(255, 255, 255, 0.6);
}

.right-button {
    float: right;
}

@media (max-width: 1147px) {
    .box {
        padding: 1rem 15%;
    }
}

@media (max-width: 990px) {
    .box {
        padding: 1rem 5%;
    }
}

@media (max-width: 770px) {
    .box {
        padding: 1rem 5%;
    }

    .right-button {
        float: none;
    }

    .container {
        float: none;
    }

    .user-input {
        text-align: left;
        width: 80%
    }

    .btn {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
}

@media (max-width: 500px) {
    span, .user-input, h2 {
        font-size: 1.2rem;
    }

    h2 {
        position: relative;
        line-height: 2;
    }

    .user-input {
        text-align: left;
    }

    .close-icon, .confirm-icon {
        float: none;
        position: absolute;
        right: 0;
    }

    .close-icon {
        top: 1.6rem;
    }

    .confirm-icon {
        bottom: -0.6rem;
    }
}

</style>