import axios from 'axios'

export const pokemonAPI = {
    getPokemon() {
        return axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20')
    }
}