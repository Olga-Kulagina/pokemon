import axios from 'axios'

export const pokemonAPI = {
    getPokemon() {
        return axios.get('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0')
    },
    getPokemonInfo(id: number) {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    }
}

