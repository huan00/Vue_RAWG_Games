<template>
  <div v-if="platforms" class="container-grid">
      <div v-for="(data) in pageArray" :key="data.id">
        <PlatformCard  :result="data" @click="selectPlatform(data.id)"/>
      </div>
      <div class='pagination'>
      <p v-for=" page in pageNumber" :key="page" @click='handlePage(page)'>{{page}}</p>
      </div>
    </div>
    <div v-else >
      <p>loading...</p>
  </div>
</template>

<script>
import axios from 'axios'
import PlatformCard from '../components/PlatformCard.vue'
export default {
  name: 'PlatformPage',
  components: {PlatformCard},

  data: ()=>({
    API_KEY: process.env.VUE_APP_RAWG_KEY,
    platforms: [],
    pageNumber: '',
    pageArray: [],
    currentPage: 1,
    lastDisplay: 0,
    currentDisplay: 6
  }),
  mounted(){
    this.getPlatform()
  },
  methods:{
    async getPlatform() {
      const res = await axios.get(`https://api.rawg.io/api/platforms?key=${this.API_KEY}`)
      let newData = res.data.results
      this.platforms = newData
      this.pageNumber =Math.ceil(this.platforms.length / 6)
    },
    selectPlatform(platformId){
        this.$router.push(`/platform/detail/${platformId}`)
      },
    handlePage(page){
        this.currentPage = page
        this.displayPage()
      },
    displayPage (){
      this.lastDisplay = (this.currentPage - 1) * 6
      this.currentDisplay = this.currentPage * 6
      this.pageArray = this.platforms.slice(this.lastDisplay,this.currentDisplay)
    }
  }

}
</script>

<style lang="postcss">
.pagination {
  display: flex;
  width: 100%;
  justify-content: center;
  cursor: pointer;
  font-size: 1.3em;

  position: absolute;
  top: 90%;
  
}
.pagination * {
  margin: 0 10px;
}
</style>