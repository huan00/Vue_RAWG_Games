<template>
  <div>
    <div class="search">
      <!-- Search Form Goes Here -->
      <form @submit="getSearchResults">
        <input type="search" value='' @input="handleChange"/>
        <button>searchQuery</button>
      </form>
      <h2>Search Results</h2>
      <section class="search-results container-grid">
        <div v-for="(result, index) in searchResults" :key="result.id" >
          <GameCard v-if="index >= lastDisplay && index < currentDisplay" :result="result" @click="selectGame(result.id)" :genre="false"/>
        </div>
        <div class='pagination' v-if="searched === true">
      <p v-for=" page in pageNumber" :key="page" @click='handlePage(page)'>{{page}}</p>
        </div>
      </section>
    </div>

    <div v-if="searched === false" class="genres">
      <h2>Genres</h2>
      <section  class="container-grid"   >
        <div v-for="(genre, index) in genres" :key="genre.id">
          <GenreCard v-if="index >= lastDisplay && index < currentDisplay" v-bind:genre="genre" @click="selectGenre(genre.id)" />
        </div>
      </section>
      <div class='pagination'>
      <p v-for=" page in pageNumber" :key="page" @click='handlePage(page)'>{{page}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import GenreCard from '../components/GenreCard.vue'
import GameCard from '../components/GameCard.vue'
  export default {
    name: 'HomePage',
    components:{
      GenreCard,
      GameCard
    },
    data: () => ({
      API_KEY: process.env.VUE_APP_RAWG_KEY,
      genres: [],
      searchQuery: '',
      searchResults: [],
      searched: false,
      pageNumber: '',
      currentPage: 1,
      lastDisplay: 0,
      currentDisplay: 6,
      pageArray: []
    }),
    mounted() {
      this.getGenres()
    },
    methods: {
      async getGenres() {
        const res = await axios.get(`https://api.rawg.io/api/genres?key=${this.API_KEY}`)
        this.genres = res.data.results
        this.pageNumber = Math.ceil(this.genres.length / 6)

      },
      async getSearchResults(e) {
        e.preventDefault()
        const res = await axios.get(`https://api.rawg.io/api/games?key=${this.API_KEY}&search=${this.searchQuery}`)
        this.searchResults = res.data.results
        this.searched = true
      },
      handleChange(event) {
        this.searchQuery = event.target.value
      },
      selectGame(gameId) {
        this.$router.push(`/details/${gameId}`)
      },
      selectGenre(genreId){
        this.$router.push(`/games/${genreId}`)
      },
      handlePage(page){
        this.currentPage = page
        this.displayPage()
      },
      displayPage (){
        this.lastDisplay = (this.currentPage - 1) * 6
        this.currentDisplay = this.currentPage * 6
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