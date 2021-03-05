import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemonThunkCreator, PokemonShortType} from './redux/pokemonReducer';
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
    let pokemonList = useSelector<AppRootStateType, any>(state => state.pokemon.pokemonList)

    return (
        <div className="App">
            {isLoading ?
                <Spin/>
                : <div className={s.pokemonList}>
                    {
                        pokemonList.map((p: PokemonShortType) => <PokemonCard key={p.number} name={p.name}
                                                                            number={p.number}/>)
                    }
                </div>
            }
        </div>
    );
}

export default App;
