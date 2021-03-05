import React from 'react';
import {Pagination} from 'antd';


export const Paginator = () => {

    return (
        <Pagination defaultCurrent={1} total={50}/>
    )
}