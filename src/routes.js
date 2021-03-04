import Home from './components/home/Home.vue'
import Login from './components/login/Login.vue'
import Logout from './components/logout/Logout.vue'
import Register from './components/register/Register.vue'
import User from './components/user/User.vue'
import Reset from './components/password/ResetPassword.vue'

export const routes = [
    {path: '/', name: 'tasks', title: 'Tasks', component: Home},
    {path: '/user', name: 'user', title: 'User', component: User},
    {path: '/login', name: 'login', title: 'Login', component: Login},
    {path: '/register', name: 'register', title: 'Register', component: Register},
    {path: '/logout', name: 'logout', title: 'Logout', component: Logout},
    {path: '/reset/:token', name: 'reset', title: 'Reset Password', component: Reset, props: true}
]