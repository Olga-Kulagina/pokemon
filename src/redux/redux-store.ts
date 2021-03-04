import {applyMiddleware, combineReducers, createStore} from 'redux';
import {pokemonReducer} from './pokemonReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    pokemon: pokemonReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
