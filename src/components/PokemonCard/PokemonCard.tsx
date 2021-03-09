import React from 'react';
import {Card} from 'antd';
import {NavLink} from 'react-router-dom';

type PokemonCardPropsType = {
    name: string
    id: number
}

export const PokemonCard = (props: PokemonCardPropsType) => {
    const {Meta} = Card;

    return (
        <NavLink to={`/pokemon/${props.id}`}>
            <Card
                hoverable
                style={{width: 240, margin: 5, textAlign: 'center'}}
                cover={<img alt={props.name}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`}
                            // Если нет красивой картинки, грузится маленькая
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`
                            }}/>}
            >
                <Meta title={props.name}/>
            </Card>
        </NavLink>
    )
}