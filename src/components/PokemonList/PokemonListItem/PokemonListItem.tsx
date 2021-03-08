import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './PokemonListItem.module.css'

type PokemonListItemPropsType = {
    id: number
    name: string
}

export const PokemonListItem = (props: PokemonListItemPropsType) => {
    return (

        <div className={s.pokemonListItem}>
            <NavLink to={`/pokemon/${props.id}`}><p>{props.id} {props.name}</p></NavLink>
        </div>

    )
}

