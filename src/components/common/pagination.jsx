import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  // create an array with pagenumbers
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null; // if there's only 1 page make render method return null
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages = [...pages, i];
  }

  return (
    <nav aria-label="...">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
            aria-current="page"
          >
            <button onClick={() => onPageChange(page)} className="page-link">
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
