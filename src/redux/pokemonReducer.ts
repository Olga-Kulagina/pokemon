import {Dispatch} from 'redux';
import {pokemonAPI} from '../api/api';

type initialStateType = typeof initialState

type SetPokemonDataType = ReturnType<typeof setPokemonData>
type SetIsLoadingType = ReturnType<typeof setIsLoading>

type ActionsType = SetPokemonDataType | SetIsLoadingType

export type PokemonShortType = {
    name: string
    number: number
}
export type PokeApiShortType = {
    name: string
    url: string
}

const initialState = {
    pokemonList: [] as Array<PokemonShortType>,
    isLoading: true
}

export const pokemonReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SET_POKEMON_DATA': {
            let pokemonList = action.pokeApiList.map((p: PokeApiShortType) => {
                return {
                    //Имя покемона с большой буквы, номер покемона для дальнейшего использования
                    name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
                    number: Number(p.url.slice(34, p.url.length - 1))
                }
            })
            console.log(pokemonList)
            return {...state, pokemonList: pokemonList}
        }
        case 'SET_IS_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        default: {
            return state
        }
    }
}

export const setPokemonData = (pokeApiList: Array<PokeApiShortType>) => ({
    type: 'SET_POKEMON_DATA',
    pokeApiList
} as const)
export const setIsLoading = (isLoading: boolean) => ({type: 'SET_IS_LOADING', isLoading} as const)


export const getPokemonThunkCreator = () => (dispatch: Dispatch) => {
    dispatch(setIsLoading(true))
    pokemonAPI.getPokemon()
        .then((res) => {
            dispatch(setPokemonData(res.data.results))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsLoading(false))
        })
}

