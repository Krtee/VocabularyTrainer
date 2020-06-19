import React, { useState } from "reactn";

const Pagination = ({ vocabsPerPage, totalVocabs, paginate }) => {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);

  for (let i = 1; i <= Math.ceil(totalVocabs / vocabsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    paginate(number);
    setCurrentPage(number);
  };

  const checkIfCurrentPage = (number) => {
    if (currentPage === number) {
      return "page_link_active";
    } else {
      return "";
    }
  };

  return (
    <nav className="margin_top">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <span
              onClick={() => handleClick(number)}
              className={"page-link page_link " + checkIfCurrentPage(number)}
            >
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
