import React from 'react';
import AppLayout from "../componets/AppLayout";

type ProductProps = {
    id: string;
};

const product = ({ id }: ProductProps) => {
    return (
        <AppLayout>
            <div className='pages-wrap'>
                <p>상품 Id가 {id}인 상품 상세 페이지</p>
            </div>
        </AppLayout>
    )
};

product.getInitialProps = async (context: any) => {
    const id = context.query.id;
    console.log(id)
    return { id }
};

export default product;

