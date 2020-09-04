<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/navbar'
export default {
  name: 'App',
  components: {
    Navbar: Navbar
  }
}
</script>
