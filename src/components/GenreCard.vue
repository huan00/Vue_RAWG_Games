<template>
  <div class="card">
    <div class="image-wrapper">

      <img v-bind:src="genre.image_background" alt="img">

    </div>
    <div class="info-wrapper flex-col">

      <h1>{{genre.name}}</h1>

      
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GenreCard',
    props: {genre: Object}
    
  }
</script>
