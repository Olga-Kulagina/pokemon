import {Dispatch} from 'redux';
import {pokemonAPI} from '../api/api';

type initialStateType = typeof initialState

type SetPokemonDataType = ReturnType<typeof setPokemonData>
type SetIsLoadingType = ReturnType<typeof setIsLoading>

type ActionsType = SetPokemonDataType | SetIsLoadingType

const initialState = {
    pokemon: [],
    isLoading: true
}

export const pokemonReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SET_POKEMON_DATA': {
            return {...state, pokemon: action.pokemon}
        }
        case 'SET_IS_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        default: {
            return state
        }
    }
}

export const setPokemonData = (pokemon: any) => ({type: 'SET_POKEMON_DATA', pokemon } as const)
export const setIsLoading = (isLoading: boolean) => ({type: 'SET_IS_LOADING', isLoading }  as const)


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

