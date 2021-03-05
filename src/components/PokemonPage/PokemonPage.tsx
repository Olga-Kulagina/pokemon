import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {setPokemonInfoThunkCreator} from '../../redux/pokemonReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';
import {Progress, Spin, Tag} from 'antd';

export const PokemonPage = () => {
    console.log('PokemonPage render')
    const dispatch = useDispatch()
    //@ts-ignore
    let {id} = useParams()

    useEffect(() => {
        dispatch(setPokemonInfoThunkCreator(id))
    }, [dispatch, id])

    let isLoadingPokemonPage = useSelector<AppRootStateType, boolean>(state => state.pokemon.isLoadingPokemonPage)
    let pokemonInfo = useSelector<AppRootStateType, any>(state => state.pokemon.pokemonInfo)


    return (
        <div>
            {isLoadingPokemonPage ?
                <Spin/>
                : <div>
                    <h2>{pokemonInfo.name}</h2>
                    <img src={pokemonInfo.sprites.other['official-artwork'].front_default} alt={pokemonInfo.name}/>
                    <p>Height: {pokemonInfo.height / 10} m</p>
                    <p>Weight: {pokemonInfo.weight / 10} kg</p>
                    <p>Type: {pokemonInfo.types.map((item: any, index: number) => {
                        switch(item.type.name) {
                            case 'grass': {
                                return <Tag key={index} color='green'>{item.type.name}</Tag>
                            }
                            case 'poison': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='purple'>{item.type.name}</Tag>
                            }
                            case 'water': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='geekblue'>{item.type.name}</Tag>
                            }
                            case 'rock': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='volcano'>{item.type.name}</Tag>
                            }
                            case 'ground': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='volcano'>{item.type.name}</Tag>
                            }
                            case 'fire': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='red'>{item.type.name}</Tag>
                            }
                            case 'psychic': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='magenta'>{item.type.name}</Tag>
                            }
                            case 'flying': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='cyan'>{item.type.name}</Tag>
                            }
                            case 'dark': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='black'>{item.type.name}</Tag>
                            }
                            case 'normal': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='lime'>{item.type.name}</Tag>
                            }
                            case 'bug': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='green'>{item.type.name}</Tag>
                            }
                            case 'fairy': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='gold'>{item.type.name}</Tag>
                            }
                            case 'electric': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='yellow'>{item.type.name}</Tag>
                            }
                            case 'dragon': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='geekblue'>{item.type.name}</Tag>
                            }
                            case 'ice': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='blue'>{item.type.name}</Tag>
                            }
                            case 'fighting': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='red'>{item.type.name}</Tag>
                            }
                            case 'steel': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='cyan'>{item.type.name}</Tag>
                            }
                            case 'ghost': {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='orange'>{item.type.name}</Tag>
                            }
                            default: {
                                return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index} color='green'>{item.type.name}</Tag>
                            }
                        }
                    })}</p>
                    <p>Abilities: {pokemonInfo.abilities.map((item: any, index: number) => {
                        return <span key={index}>{`${item.ability.name} `}</span>
                    })}</p>
                    <div>
                        <p>Stats</p>
                        HP <Progress percent={pokemonInfo.stats[0].base_stat / 2} showInfo={false}/>
                        Attack <Progress percent={pokemonInfo.stats[1].base_stat / 2} showInfo={false}/>
                        Defense <Progress percent={pokemonInfo.stats[2].base_stat / 2} showInfo={false}/>
                        Special-attack <Progress percent={pokemonInfo.stats[3].base_stat / 2} showInfo={false}/>
                        Special-defense <Progress percent={pokemonInfo.stats[4].base_stat / 2} showInfo={false}/>
                        Speed <Progress percent={pokemonInfo.stats[5].base_stat / 2} showInfo={false}/>
                    </div>
                </div>
            }
        </div>
    )
}