import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';
import {PokemonShortType} from '../../redux/pokemonReducer';
import {Spin} from 'antd';
import {PokemonCard} from '../PokemonCard/PokemonCard';
import s from './AllPokemon.module.css'

export const AllPokemon = () => {


    let isLoadingApp = useSelector<AppRootStateType, boolean>(state => state.pokemon.isLoadingApp)
    let displayPokemon = useSelector<AppRootStateType, any>(state => state.pokemon.displayPokemon)

    return (
        <div>
            {isLoadingApp ?
                <Spin/>
                : <div style={{textAlign: 'center'}}>
                    <div className={s.pokemonList}>
                        {
                            displayPokemon.map((p: PokemonShortType) => <PokemonCard key={p.id} name={p.name}
                                                                                  id={p.id}/>)
                        }

                    </div>
                </div>
            }
        </div>
    )
}