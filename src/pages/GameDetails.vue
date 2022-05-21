<template>
  <div class="game-content">
    <section v-if='gameDetails' class="image-container">
      <div>
        <img :src="gameDetails.background_image" alt="img">
      </div>
    </section>
    <section v-if="gameDetails" class="details">
      <div class="flex-row space"></div>
      <div >
        <h3>{{gameDetails.name}}</h3>
        <p>{{gameDetails.description_raw}}</p>
        <div v-if="reddit" >
          <h5>Reddit response</h5>
          <div class='reddit' >
          <p v-for="result in reddit" :key="result.id">Id:{{result.id}}: {{result.name}}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'GameDetails',
    data: () => ({
      API_KEY: process.env.VUE_APP_RAWG_KEY,
      gameDetails: null,
      reddit: []
    }),
    mounted() {this.getGameDetails(), this.getSubreddit()},
    methods: {
      async getGameDetails() {
        // Get game id from router here
        const res = await axios.get(`https://api.rawg.io/api/games/${this.$route.params.game_id}?key=${this.API_KEY}`)
        this.gameDetails = res.data
 
      },
      async getSubreddit() {
        const res = await axios.get(`https://api.rawg.io/api/games/${this.$route.params.game_id}/reddit?key=${this.API_KEY}`) 
        this.reddit = res.data.results
      }
    }
  }
</script>

<style>
  .reddit {
    max-height: 200px;
    overflow-y: scroll;
  }
</style>