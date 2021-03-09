import React, {useEffect} from 'react';
import {Redirect, Route, Switch } from 'react-router-dom';
import {PokemonPage} from './components/PokemonPage/PokemonPage';
import {Error404} from './components/Error404/Error404';
import {AllPokemon} from './components/AllPokemon/AllPokemon';
import {getAllPokemonListThunkCreator, getPokemonThunkCreator} from './redux/pokemonReducer';
import {useDispatch, useSelector} from 'react-redux';
import {Navigation} from './components/Navigation/Navigation';
import {PokemonList} from './components/PokemonList/PokemonList';
import {AppRootStateType} from './redux/redux-store';
import {Result} from 'antd';

export const PATH = {
    ALLPOKEMON: "/all",
    POKEMONPAGE: '/pokemon/:id',
    POKEMONlIST: '/list'
}

function App() {
    const dispatch = useDispatch()

    let pageNumber = useSelector<AppRootStateType, number>(state => state.pokemon.pageNumber)
    let someError = useSelector<AppRootStateType, boolean>(state => state.pokemon.someError)

    useEffect(() => {
        dispatch(getPokemonThunkCreator(pageNumber))
    }, [dispatch, pageNumber])

    useEffect(() => {
        dispatch(getAllPokemonListThunkCreator())
    }, [dispatch])

    return (
        <div className="App">
            <Navigation />
            {someError ?
                <Result
                    status="500"
                    subTitle="Sorry, something went wrong."
                /> :
                <Switch>
                    <Route path={"/"} exact render={() => <Redirect to={PATH.ALLPOKEMON}/>}/>

                    <Route path={PATH.ALLPOKEMON} render={() => <AllPokemon />}/>
                    <Route path={PATH.POKEMONlIST} render={() => <PokemonList />}/>
                    <Route path={PATH.POKEMONPAGE} render={() => <PokemonPage />}/>

                    <Route render={() => <Error404/>}/>
                </Switch>
            }
        </div>
    );
}

export default App;
