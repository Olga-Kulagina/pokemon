import {Dispatch} from 'redux';
import {pokemonAPI} from '../api/api';

type initialStateType = typeof initialState

type SetPokemonDataType = ReturnType<typeof setPokemonData>
type SetDisplayPokemonType = ReturnType<typeof setDisplayPokemon>
type SetIsLoadingDisplayPokemonType = ReturnType<typeof setIsLoadingDisplayPokemon>
type SetIsLoadingPokemonPageType = ReturnType<typeof setIsLoadingPokemonPage>
type SetIsLoadingPokemonListType = ReturnType<typeof setIsLoadingPokemonList>
type SetPokemonInfoType = ReturnType<typeof setPokemonInfo>
type SetPageNumberType = ReturnType<typeof setPageNumber>
type SetTotalPokemonType = ReturnType<typeof setTotalPokemon>

type ActionsType =
    SetPokemonDataType
    | SetDisplayPokemonType
    | SetIsLoadingDisplayPokemonType
    | SetIsLoadingPokemonPageType
    | SetIsLoadingPokemonListType
    | SetPokemonInfoType
    | SetPageNumberType
    | SetTotalPokemonType

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
    pageNumber: 1,
    totalPokemon: 0,
    pokemonInfo: {},
    isLoadingDisplayPokemon: true,
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
        case 'SET_PAGE_NUMBER': {
            console.log(action.pageNumber)
            return {...state, pageNumber: action.pageNumber}
        }
        case 'SET_POKEMON_INFO': {
            let newName = action.data.name.charAt(0).toUpperCase() + action.data.name.slice(1)
            console.log(action.data)
            return {...state, pokemonInfo: {...action.data, name: newName}}
        }
        case 'SET_IS_LOADING_DISPLAY_POKEMON': {
            return {...state, isLoadingDisplayPokemon: action.isLoadingDisplayPokemon}
        }
        case 'SET_IS_LOADING_POKEMON_PAGE': {
            return {...state, isLoadingPokemonPage: action.isLoadingPokemonPage}
        }
        case 'SET_IS_LOADING_POKEMON_LIST': {
            return {...state, isLoadingPokemonList: action.isLoadingPokemonList}
        }
        case 'SET_TOTAL_POKEMON': {
            return {...state, totalPokemon: action.total}
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
export const setIsLoadingDisplayPokemon = (isLoadingDisplayPokemon: boolean) => ({
    type: 'SET_IS_LOADING_DISPLAY_POKEMON',
    isLoadingDisplayPokemon
} as const)
export const setIsLoadingPokemonPage = (isLoadingPokemonPage: boolean) => ({
    type: 'SET_IS_LOADING_POKEMON_PAGE',
    isLoadingPokemonPage
} as const)
export const setIsLoadingPokemonList = (isLoadingPokemonList: boolean) => ({
    type: 'SET_IS_LOADING_POKEMON_LIST',
    isLoadingPokemonList
} as const)
export const setPokemonInfo = (data: any) => ({type: 'SET_POKEMON_INFO', data} as const)
export const setPageNumber = (pageNumber: number) => ({type: 'SET_PAGE_NUMBER', pageNumber} as const)
export const setTotalPokemon = (total: number) => ({type: 'SET_TOTAL_POKEMON', total} as const)

export const getAllPokemonListThunkCreator = () => (dispatch: Dispatch) => {
    dispatch(setIsLoadingPokemonList(true))
    pokemonAPI.getPokemonList()
        .then((res) => {
            console.log(res.data.results)
            dispatch(setPokemonData(res.data.results))
            dispatch(setTotalPokemon(res.data.count))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsLoadingPokemonList(false))
        })
}

export const getPokemonThunkCreator = (pageNumber: number) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingDisplayPokemon(true))
    pokemonAPI.getPokemon(pageNumber)
        .then((res) => {
            console.log(res)
            dispatch(setDisplayPokemon(res.data.results))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsLoadingDisplayPokemon(false))
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


