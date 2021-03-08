import axios from 'axios'

export const pokemonAPI = {
    getPokemon(pageNumber: number) {
        return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${(pageNumber - 1) * 30}`)
    },
    getPokemonList() {
        return axios.get('https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0')
    },
    getPokemonInfo(id: number) {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    }
}

