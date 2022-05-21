<template>
  <div id="app">
    <header>
      <!-- Nav Goes Here -->
      <NavBar />
    </header>
    <main>
      <!-- Router View Goes Here -->
      <!-- <router-view  -->
        
        <router-view ></router-view>
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
// import GameCard from './components/GameCard.vue'
  export default {
    name: 'App',
    components: {
      // GameCard,
      NavBar
    }
  }
</script>
