import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';
import {PokemonShortType} from '../../redux/pokemonReducer';
import {Spin} from 'antd';
import {PokemonCard} from '../PokemonCard/PokemonCard';
import s from './AllPokemon.module.css'
import {Paginator} from '../Paginator/Paginator';

export const AllPokemon = () => {

    let isLoadingDisplayPokemon = useSelector<AppRootStateType, boolean>(state => state.pokemon.isLoadingDisplayPokemon)
    let displayPokemon = useSelector<AppRootStateType, any>(state => state.pokemon.displayPokemon)

    return (
        <>
            {isLoadingDisplayPokemon ?
                <div className={s.spin}><Spin/></div>
                : <div style={{textAlign: 'center'}}>
                    <h1>Pokédex</h1>
                    <div className={s.pokemonList}>
                        {
                            displayPokemon.map((p: PokemonShortType) => <PokemonCard key={p.id} name={p.name}
                                                                                     id={p.id}/>)
                        }
                    </div>
                    <Paginator />
                </div>
            }
        </>
    )
}