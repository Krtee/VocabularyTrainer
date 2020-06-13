import React from 'react';

const Pagination = ({ vocabsPerPage, totalVocabs, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalVocabs / vocabsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <nav className="margin_top">
            <ul className="pagination">
                {
                    pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number)} className="page-link">
                                {number}
                            </a>
                        </li>

                    ))
                }

            </ul>
        </nav>
    )
}

export default Pagination;
