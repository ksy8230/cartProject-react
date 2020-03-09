import React from 'react';
import AppLayout from "../componets/AppLayout";

const product = ({ id }) => {

    return (
        <AppLayout>
            <div className='pages-wrap'>
                id가 {id}인 상품 상세 페이지
            </div>
        </AppLayout>
    )
};

export default product;

