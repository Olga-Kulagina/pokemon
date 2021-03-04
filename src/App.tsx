import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemonThunkCreator} from './redux/pokemonReducer';
import {AppRootStateType} from './redux/redux-store';
import {Spin} from 'antd';
import {PokemonCard} from './components/PokemonCard/PokemonCard';
import s from './App.module.css'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPokemonThunkCreator())
    }, [dispatch])

    let isLoading = useSelector<AppRootStateType, boolean>(state => state.pokemon.isLoading)
    let pokemon = useSelector<AppRootStateType, any>(state => state.pokemon.pokemon)

    return (
        <div className="App">
            {isLoading ?
                <Spin/>
                : <div className={s.pokemonList}>
                    {
                        pokemon.map((p: any, index: number) => <PokemonCard key={index} name={p.name}
                                                                            pokemonNumber={index + 1}/>)
                    }
                </div>
            }
        </div>
    );
}

export default App;
