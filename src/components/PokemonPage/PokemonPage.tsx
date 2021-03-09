import React, {useEffect} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {setPokemonInfoThunkCreator} from '../../redux/pokemonReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';
import {Button, Progress, Spin, Tag} from 'antd';
import s from './PokemonPage.module.css'

export const PokemonPage = () => {

    const dispatch = useDispatch()
    //@ts-ignore
    let {id} = useParams()

    useEffect(() => {
        dispatch(setPokemonInfoThunkCreator(id))
    }, [dispatch, id])

    let isLoadingPokemonPage = useSelector<AppRootStateType, boolean>(state => state.pokemon.isLoadingPokemonPage)
    let pokemonInfo = useSelector<AppRootStateType, any>(state => state.pokemon.pokemonInfo)

    return (
        <>
            {isLoadingPokemonPage ?
                <div className={s.spin}><Spin/></div>
                : <div>
                    <h2 className={s.name}>{pokemonInfo.name} № {pokemonInfo.id}</h2>
                    <div className={s.pictureAndInfo}>
                        <div className={s.picture}>
                            <img src={pokemonInfo.sprites.other['official-artwork'].front_default}
                                 alt={pokemonInfo.name}/>
                        </div>
                        <div className={s.info}>
                            <h3 className={s.infoStatsHeader}>Info</h3>
                            <p className={s.infoRow}>
                                <span className={s.characteristic}>Height: </span>
                                {pokemonInfo.height / 10} m
                            </p>
                            <p className={s.infoRow}>
                                <span className={s.characteristic}>Weight: </span>
                                {pokemonInfo.weight / 10} kg
                            </p>
                            <p className={s.infoRow}>
                                <span className={s.characteristic}>Type: </span>
                                {pokemonInfo.types.map((item: any, index: number) => {
                                switch (item.type.name) {
                                    case 'grass': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='green'>{item.type.name}</Tag>
                                    }
                                    case 'poison': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='purple'>{item.type.name}</Tag>
                                    }
                                    case 'water': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='geekblue'>{item.type.name}</Tag>
                                    }
                                    case 'rock': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='volcano'>{item.type.name}</Tag>
                                    }
                                    case 'ground': {
                                        return <Tag style={{fontSize: '14px', padding: '5px 10px'}} key={index}
                                                    color='volcano'>{item.type.name}</Tag>
                                    }
                                    case 'fire': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='red'>{item.type.name}</Tag>
                                    }
                                    case 'psychic': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='magenta'>{item.type.name}</Tag>
                                    }
                                    case 'flying': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='cyan'>{item.type.name}</Tag>
                                    }
                                    case 'dark': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='black'>{item.type.name}</Tag>
                                    }
                                    case 'normal': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='lime'>{item.type.name}</Tag>
                                    }
                                    case 'bug': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='green'>{item.type.name}</Tag>
                                    }
                                    case 'fairy': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='gold'>{item.type.name}</Tag>
                                    }
                                    case 'electric': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='yellow'>{item.type.name}</Tag>
                                    }
                                    case 'dragon': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='geekblue'>{item.type.name}</Tag>
                                    }
                                    case 'ice': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='blue'>{item.type.name}</Tag>
                                    }
                                    case 'fighting': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='red'>{item.type.name}</Tag>
                                    }
                                    case 'steel': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='cyan'>{item.type.name}</Tag>
                                    }
                                    case 'ghost': {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='orange'>{item.type.name}</Tag>
                                    }
                                    default: {
                                        return <Tag style={{fontSize: '14px', padding: '3px 8px'}} key={index}
                                                    color='green'>{item.type.name}</Tag>
                                    }
                                }
                            })}
                            </p>
                            <p className={s.infoRow}>
                                <span className={s.characteristic}>Abilities: </span>
                                <span className={s.abilitiesFlex}>
                                    {pokemonInfo.abilities.map((item: any, index: number) => {
                                        return <span className={s.abilities} key={index}>{`${item.ability.name} `}</span>
                                    })}
                                </span>
                            </p>
                            <p className={s.infoRow}>
                                <span
                                    className={s.characteristic}>Base Experience: </span>
                                {pokemonInfo.base_experience}
                            </p>
                            <div>
                                <h3 className={s.infoStatsHeader}>Stats</h3>
                                <div className={s.progressBlock}>
                                    <div className={s.progress}>
                                        <span className={s.progressLabel}>HP</span>
                                        <span className={s.progressBar}>
                                    <Progress percent={pokemonInfo.stats[0].base_stat / 2} showInfo={false}/>
                                </span>
                                    </div>
                                    <div className={s.progress}>
                                        <span className={s.progressLabel}>Attack</span>
                                        <span className={s.progressBar}>
                                    <Progress percent={pokemonInfo.stats[1].base_stat / 2} showInfo={false}/>
                                </span>
                                    </div>
                                    <div className={s.progress}>
                                        <span className={s.progressLabel}>Defense</span>
                                        <span className={s.progressBar}>
                                    <Progress percent={pokemonInfo.stats[2].base_stat / 2} showInfo={false}/>
                                </span>
                                    </div>
                                    <div className={s.progress}>
                                        <span className={s.progressLabel}>Special attack</span>
                                        <span className={s.progressBar}>
                                    <Progress percent={pokemonInfo.stats[3].base_stat / 2} showInfo={false}/>
                                </span>
                                    </div>
                                    <div className={s.progress}>
                                        <span className={s.progressLabel}>Special defense</span>
                                        <span className={s.progressBar}>
                                    <Progress percent={pokemonInfo.stats[4].base_stat / 2} showInfo={false}/>
                                </span>
                                    </div>
                                    <div className={s.progress}>
                                        <span className={s.progressLabel}>Speed</span>
                                        <span className={s.progressBar}>
                                    <Progress percent={pokemonInfo.stats[5].base_stat / 2} showInfo={false}/>
                                </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.navigation}>
                        <NavLink to={`/pokemon/${pokemonInfo.id === 10001 ? 898 : pokemonInfo.id - 1}`}>
                            <Button disabled={pokemonInfo.id === 1}>Prev</Button>
                        </NavLink>
                        <NavLink to={`/pokemon/${pokemonInfo.id === 898 ? 10001 : pokemonInfo.id + 1}`}>
                            <Button disabled={pokemonInfo.id === 10220}>Next</Button>
                        </NavLink>
                    </div>
                </div>
            }
        </>
    )
}