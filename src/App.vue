<template>
  <div id="app">

    <Sidebar :routes='routes'>
    </Sidebar>

    <router-view>
    </router-view>

  </div>
</template>

<script>
import Sidebar from './components/shared/sidebar/Sidebar.vue'
import { routes } from './routes.js'

export default {
  name: 'app',

  components: {
      Sidebar
  },

  data(){
    return {
      routes: routes
    }
  }
}
</script>

<style>
body{
  margin: 0;
  background: rgb(255, 246, 206);
}

</style>
