import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';
import {PokemonListItem} from './PokemonListItem/PokemonListItem';
import {Spin} from 'antd';
import {PokemonShortType} from '../../redux/pokemonReducer';
import s from './PokemonList.module.css'

export const PokemonList = () => {

    let isLoadingPokemonList = useSelector<AppRootStateType, boolean>(state => state.pokemon.isLoadingPokemonList)
    let pokemonList = useSelector<AppRootStateType, Array<PokemonShortType>>(state => state.pokemon.pokemonList)

    return (
        <>
            {isLoadingPokemonList ?
                <div className={s.spin}><Spin/></div>
                : <div>
                    <div className={s.pokemonList}>
                        {
                            pokemonList.map((p: PokemonShortType) => <PokemonListItem key={p.id} name={p.name}
                                                                                      id={p.id}/>)
                        }
                    </div>
                </div>
            }

        </>
    )
}