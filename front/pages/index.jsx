import React from 'react';
import Link from 'next/link';
import AppLayout from "../componets/AppLayout";

const home = () => {
    return (
        <>
            <AppLayout>
                <Link href='/products'><a>상품리스트</a></Link>
            </AppLayout>
        </>
    )
};

export default home;
