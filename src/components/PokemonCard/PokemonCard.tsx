import React from 'react';
import {Card} from 'antd';

type PokemonCardPropsType = {
    name: string
    pokemonNumber: number
}

export const PokemonCard = (props: PokemonCardPropsType) => {
    const { Meta } = Card;
    return (
        <Card
            hoverable
            style={{ width: 240, margin: 5, textAlign: 'center' }}
            cover={<img alt="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.pokemonNumber}.png`} />}
        >
            <Meta title={props.name.charAt(0).toUpperCase() + props.name.slice(1)} />
        </Card>
    )
}