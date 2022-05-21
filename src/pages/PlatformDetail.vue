<template>
  <div class="game-content">
    <section v-if='platformDetail' class="image-container">
      <div>
        <img :src="platformDetail.image_background" alt="img">
      </div>
    </section>
    <section v-if="platformDetail" class="details">
      <div class="flex-row space"></div>
      <div >
        <h3>{{platformDetail.name}}</h3>
        <p v-if="platformDetail.description">Description: {{platformDetail.description}}</p>
        <p>Game count: {{platformDetail.games_count}}</p>
        <p>Launch year: {{platformDetail.year_start}}</p>
        
      </div>
    </section>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  name: "PlatformDetail",
  data:()=>({
    API_KEY: process.env.VUE_APP_RAWG_KEY,
    platformDetail: []
  }),
  mounted(){
    this.getPlatformDetail()
    },
  methods: {
    async getPlatformDetail(){
      const res = await axios.get(`https://api.rawg.io/api/platforms/${this.$route.params.platform_id}?key=${this.API_KEY}`)
      this.platformDetail = res.data

    }
  }
}
</script>