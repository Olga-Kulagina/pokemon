import React from 'react';
import {Card} from 'antd';

type PokemonCardPropsType = {
    name: string
    number: number
}

export const PokemonCard = (props: PokemonCardPropsType) => {
    const { Meta } = Card;
    return (
        <Card
            hoverable
            style={{ width: 240, margin: 5, textAlign: 'center' }}
            cover={<img alt={props.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.number}.png`} />}
        >
            <Meta title={props.name} />
        </Card>
    )
}