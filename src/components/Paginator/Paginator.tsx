import React from 'react';
import {Pagination} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';
import {setPageNumber} from '../../redux/pokemonReducer';


export const Paginator = () => {
    const dispatch = useDispatch()

    let totalPokemon = useSelector<AppRootStateType, number>(state => state.pokemon.totalPokemon)
    let pageNumber = useSelector<AppRootStateType, number>(state => state.pokemon.pageNumber)

    let onChange = (pageNumber: number) => {
        dispatch(setPageNumber(pageNumber))
    }

    return (
        <div style={{padding: '10px'}}>
            <Pagination onChange={onChange} current={pageNumber} total={totalPokemon} defaultPageSize={30}
                        showQuickJumper showSizeChanger={false} responsive/>
        </div>
    )
}