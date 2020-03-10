import { memo, FunctionComponent } from "react";
import { paginationArray } from "../FunctionalComponent";

const Pagination: FunctionComponent<{ postsPerPage : number, totalPosts : number,  paginate : Function, pageNumberActive : number }> 
= memo(({ 
    postsPerPage, totalPosts, paginate, pageNumberActive
}) => {
    return (
        <nav >
            <ul className='pagination pg-blue'>
                {
                    paginationArray(totalPosts, postsPerPage, []).map((number: number, index: number) => {
                        return (
                            <li key={number} className='page-item '>
                                <a className={index === pageNumberActive-1? 'page-link active' : 'page-link'} onClick={() => paginate(number)}>
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