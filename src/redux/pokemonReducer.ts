import {Dispatch} from 'redux';
import {pokemonAPI} from '../api/api';

type initialStateType = typeof initialState

type SetPokemonDataType = ReturnType<typeof setPokemonData>
type SetIsLoadingAppType = ReturnType<typeof setIsLoadingApp>
type SetIsLoadingPokemonPageType = ReturnType<typeof setIsLoadingPokemonPage>
type SetPokemonInfoType = ReturnType<typeof setPokemonInfo>

type ActionsType = SetPokemonDataType | SetIsLoadingAppType | SetIsLoadingPokemonPageType | SetPokemonInfoType

export type PokemonShortType = {
    name: string
    id: number
}
export type PokeApiShortType = {
    name: string
    url: string
}

const initialState = {
    pokemonList: [] as Array<PokemonShortType>,
    pokemonInfo: {},
    isLoadingApp: true,
    isLoadingPokemonPage: true
}

export const pokemonReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SET_POKEMON_DATA': {
            let pokemonList = action.pokeApiList.map((p: PokeApiShortType) => {
                return {
                    //Имя покемона с большой буквы, номер покемона для дальнейшего использования
                    name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
                    id: Number(p.url.slice(34, p.url.length - 1)),
                }
            })
            console.log(pokemonList)
            return {...state, pokemonList: pokemonList}
        }
        case 'SET_POKEMON_INFO': {
            let newName = action.data.name.charAt(0).toUpperCase() + action.data.name.slice(1)
            console.log(action.data)
            return {...state, pokemonInfo: {...action.data, name: newName}}
        }
        case 'SET_IS_LOADING_APP': {
            return {...state, isLoadingApp: action.isLoadingApp}
        }
        case 'SET_IS_LOADING_POKEMON_PAGE': {
            return {...state, isLoadingPokemonPage: action.isLoadingPokemonPage}
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
export const setIsLoadingApp = (isLoadingApp: boolean) => ({type: 'SET_IS_LOADING_APP', isLoadingApp} as const)
export const setIsLoadingPokemonPage = (isLoadingPokemonPage: boolean) => ({type: 'SET_IS_LOADING_POKEMON_PAGE', isLoadingPokemonPage} as const)
export const setPokemonInfo = (data: any) => ({type: 'SET_POKEMON_INFO', data} as const)


export const getPokemonThunkCreator = () => (dispatch: Dispatch) => {
    dispatch(setIsLoadingApp(true))
    pokemonAPI.getPokemon()
        .then((res) => {
            dispatch(setPokemonData(res.data.results))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsLoadingApp(false))
        })
}

export const setPokemonInfoThunkCreator = (id: number) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingPokemonPage(true))
    pokemonAPI.getPokemonInfo(id)
        .then((res) => {
            dispatch(setPokemonInfo(res.data))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsLoadingPokemonPage(false))
        })
}


