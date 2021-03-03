import Home from './components/home/Home.vue'
import Login from './components/login/Login.vue'
import Logout from './components/logout/Logout.vue'
import Register from './components/register/Register.vue'

export const routes = [
    {path: '/', name: 'tasks', title: 'tasks', component: Home},
    {path: '/login', name: 'login', title: 'Login', component: Login},
    {path: '/register', name: 'register', title: 'Register', component: Register},
    {path: '/logout', name: 'logout', title: 'Logout', component: Logout}
]