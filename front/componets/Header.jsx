import React, { memo } from 'react';
import Link from 'next/link';
const Header = memo(() => {
    
    return (
        <header>
            <div className='header-wrap'>
                <div><Link href='/'><a>홈</a></Link></div>
                <div>menu1</div>
                <div>menu2</div>
            </div>

        </header>
    )
});

export default Header;
