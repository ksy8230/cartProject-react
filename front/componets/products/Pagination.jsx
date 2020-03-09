import { memo } from "react";
const Pagination = memo(({ 
    postsPerPage, totalPosts, paginate 
}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <nav >
            <ul className='pagination pg-blue'>
                {
                    pageNumbers.map(number => {
                        return (
                            <li key={number} className='page-item '>
                                <a className='page-link ' onClick={() => paginate(number)}>
                                    {number}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    );
});

export default Pagination;