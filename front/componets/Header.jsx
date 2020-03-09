import React, { memo } from 'react';
import Link from 'next/link';
const Header = memo(() => {
    
    return (
        <header>
            <div><Link href='/'><a>홈</a></Link></div>
            <div>search</div>
            <div>navagation</div>
        </header>
    )
});

export default Header;
