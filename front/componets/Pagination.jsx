const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='pagenation'>
            <ul>
                {
                    pageNumbers.map(number => {
                        return (
                            <li key={number} className='page-item'>
                                <span onClick={() => paginate(number)}>
                                    {number}
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default Pagination;