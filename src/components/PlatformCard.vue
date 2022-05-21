<template>
  <div class="card game-card">
    <div class="image-wrapper">
      <!-- Image Goes Here -->
      <img :src="result.image_background" alt="img">
    </div>
    <div class="info-wrapper flex-col">
      <!-- Game Name Goes Here -->
      <h1>{{result.name}}</h1>
      <h4 v-if='genre === true'>Rating: {{result.rating}}</h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PlatformCard',
    props: {
      result: Object,
      genre: Boolean,
    }
  }
</script>
