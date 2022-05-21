<template>
  <div v-if="games" class="genreGame">
    <form>
      <label for="rating">Sort by rating:</label>
      <select name="rating" id="rating" @input="handleSelect">
        <option value="non" selected disabled>Select an Option</option>
        <option value="ascending" >ascending order</option>
        <option value="descending" >descending order</option>
      </select>
    </form>
    <div className="container-grid" >
      <div v-for="game in pageArray" :key="game.id">
        <GameCard  :result="game" :genre='true'
          @click="selectGame(game.id)"/>
        </div>
      

    </div>
    

      
    </div>
    <div  class='page'>
      <p v-for="page in pageNumber" :key="page" @click="handlePage(page)" class='page-numbers'>{{page}}</p>
    </div>
    <div class="paginate">
  </div>
</template>

<script>
import axios from 'axios'
import GameCard from '../components/GameCard.vue'

  export default {
    name: 'ViewGames',
    components: {GameCard},
    data: () => ({
      games: [],
      API_KEY: process.env.VUE_APP_RAWG_KEY,
      sort: '',
      pageNumber: '',
      currentPage: 1,
      pageArray: [],
      lastDisplay: 0,
      currentDisplay: 6
    }),
    mounted() {this.getGamesByGenre()},
    methods: {
      async getGamesByGenre() {
        // Get Genre Id here
        const res = await axios.get(`https://api.rawg.io/api/games?genres=${this.$route.params.genre_id}&key=${this.API_KEY}`)

        this.games = res.data.results
        this.pageNumber = Math.ceil(this.games.length / 6)

      
      },
      handleSelect(e){
        this.sort = e.target.value
        this.sortGameByRating(this.sort)
      },
      sortGameByRating (sort) {
        if(sort === 'ascending'){
        this.games.sort((game1, game2)=> game1.rating - game2.rating)}
        else{
          this.games.sort((game1, game2)=> game2.rating - game1.rating)
        }
      },
      selectGame(gameId) {
        this.$router.push(`/details/${gameId}`)
      }
      ,
      handlePage(page){
        this.currentPage = page
        this.displayPage()
      },
      displayPage (){
        this.lastDisplay = (this.currentPage - 1) * 6
        this.currentDisplay = this.currentPage * 6
        this.pageArray = this.games.slice(this.lastDisplay, this.currentDisplay)
      }
    }
  }
</script>

<style>
.page{
  display:flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  
  width: 100%;
  position: absolute;
  top: 95%,
}
.page *{
  margin: 0 10px;
}

.genreGame{
  margin: 0 auto;
}
.page-numbers {
  
  cursor: pointer;
  font-size: 1.3em;
}
</style>