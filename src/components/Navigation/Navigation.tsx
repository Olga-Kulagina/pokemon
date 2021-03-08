import {Menu} from 'antd';
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../App';

type NavigationPropsType = {
}

export const Navigation = (props: NavigationPropsType) => {

    let [current, setCurrent] = useState('')

    let handleClick = (e: any) => {
        setCurrent(e.key);
    }

    return (
        <div style={{marginBottom: '10px'}}>
            <Menu mode="horizontal" onClick={handleClick} selectedKeys={[current]} style={{textAlign: 'center'}}>
                <Menu.Item key="all">
                    <NavLink to={PATH.ALLPOKEMON}>Home</NavLink>
                </Menu.Item>
                <Menu.Item key="list">
                    <NavLink to={PATH.POKEMONlIST}>Pokemon list</NavLink>
                </Menu.Item>
            </Menu>
        </div>
    )
}
