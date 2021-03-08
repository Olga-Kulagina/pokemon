import {Dispatch} from 'redux';
import {pokemonAPI} from '../api/api';

type initialStateType = typeof initialState

type SetPokemonDataType = ReturnType<typeof setPokemonData>
type SetDisplayPokemonType = ReturnType<typeof setDisplayPokemon>
type SetIsLoadingAppType = ReturnType<typeof setIsLoadingApp>
type SetIsLoadingPokemonPageType = ReturnType<typeof setIsLoadingPokemonPage>
type SetIsLoadingPokemonListType = ReturnType<typeof setIsLoadingPokemonList>
type SetPokemonInfoType = ReturnType<typeof setPokemonInfo>
type SetPagesType = ReturnType<typeof setPages>

type ActionsType =
    SetPokemonDataType
    | SetDisplayPokemonType
    | SetIsLoadingAppType
    | SetIsLoadingPokemonPageType
    | SetIsLoadingPokemonListType
    | SetPokemonInfoType
    | SetPagesType

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
    displayPokemon: [] as Array<PokemonShortType>,
    nextPage: '',
    previousPage: '',
    pokemonInfo: {},
    isLoadingApp: true,
    isLoadingPokemonPage: true,
    isLoadingPokemonList: true
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
            return {...state, pokemonList: pokemonList}
        }
        case 'SET_DISPLAY_POKEMON': {
            let pokemonList = action.pokeApiList.map((p: PokeApiShortType) => {
                return {
                    //Имя покемона с большой буквы, номер покемона для дальнейшего использования
                    name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
                    id: Number(p.url.slice(34, p.url.length - 1)),
                }
            })
            return {...state, displayPokemon: pokemonList}
        }
        case 'SET_PAGES': {
            return {...state, nextPage: action.next, previousPage: action.previous}
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
        case 'SET_IS_LOADING_POKEMON_LIST': {
            return {...state, isLoadingPokemonList: action.isLoadingPokemonList}
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
export const setDisplayPokemon = (pokeApiList: Array<PokeApiShortType>) => ({
    type: 'SET_DISPLAY_POKEMON',
    pokeApiList
} as const)
export const setIsLoadingApp = (isLoadingApp: boolean) => ({type: 'SET_IS_LOADING_APP', isLoadingApp} as const)
export const setIsLoadingPokemonPage = (isLoadingPokemonPage: boolean) => ({
    type: 'SET_IS_LOADING_POKEMON_PAGE',
    isLoadingPokemonPage
} as const)
export const setIsLoadingPokemonList = (isLoadingPokemonList: boolean) => ({
    type: 'SET_IS_LOADING_POKEMON_LIST',
    isLoadingPokemonList
} as const)
export const setPokemonInfo = (data: any) => ({type: 'SET_POKEMON_INFO', data} as const)
export const setPages = (next: string, previous: string) => ({type: 'SET_PAGES', next, previous} as const)

export const getAllPokemonListThunkCreator = () => (dispatch: Dispatch) => {
    dispatch(setIsLoadingPokemonList(true))
    pokemonAPI.getPokemonList()
        .then((res) => {
            console.log(res.data.results)
            dispatch(setPokemonData(res.data.results))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsLoadingPokemonList(false))
        })
}

export const getPokemonThunkCreator = () => (dispatch: Dispatch) => {
    dispatch(setIsLoadingApp(true))
    pokemonAPI.getPokemon()
        .then((res) => {
            console.log(res)
            dispatch(setDisplayPokemon(res.data.results))
            dispatch(setPages(res.data.next, res.data.previous))
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


