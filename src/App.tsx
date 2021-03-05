import React, {useEffect} from 'react';
import {Redirect, Route, Switch } from 'react-router-dom';
import {PokemonPage} from './components/PokemonPage/PokemonPage';
import {Error404} from './components/Error404/Error404';
import {AllPokemon} from './components/AllPokemon/AllPokemon';
import {getPokemonThunkCreator} from './redux/pokemonReducer';
import {useDispatch} from 'react-redux';

export const PATH = {
    ALLPOKEMON: "/all",
    POKEMONPAGE: '/pokemon/:id',
}

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPokemonThunkCreator())
    }, [dispatch])

    return (
        <div className="App">
            <Switch>
                <Route path={"/"} exact render={() => <Redirect to={PATH.ALLPOKEMON}/>}/>

                <Route path={PATH.ALLPOKEMON} render={() => <AllPokemon />}/>
                <Route path={PATH.POKEMONPAGE} render={() => <PokemonPage />}/>

                <Route render={() => <Error404/>}/>
            </Switch>
        </div>
    );
}

export default App;
