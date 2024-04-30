/* eslint-disable react/prop-types*/
import React, { useState } from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';

const PaginationCF = props => {
  const lastPage = Math.ceil(props.totalItems / props.perPage);
  const pages = [];
  const [currentPageInt, setCurrentPage] = useState(props.currentPage);

  for (let index = 1; index <= lastPage; index++) {
    pages.push(index);
  }

  const changePage = newPage => {
    if (props.onChangePage) {
      setCurrentPage(newPage);
      props.onChangePage(newPage);
    }
  };

  return props.totalItems > props.perPage ? (
    <CPagination aria-label="Page navigation example" align="center">
      {currentPageInt > 1 ? (
        <CPaginationItem onClick={() => changePage(currentPageInt - 1)}>
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
      ) : (
        ''
      )}
      {pages.map(item => (
        <CPaginationItem
          key={item}
          active={item === currentPageInt}
          onClick={() => changePage(item)}
          to={`?page=${item}`}
        >
          {item}
        </CPaginationItem>
      ))}
      {currentPageInt < lastPage ? (
        <CPaginationItem onClick={() => changePage(currentPageInt + 1)}>
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      ) : (
        ''
      )}
    </CPagination>
  ) : (
    ''
  );
};
export default PaginationCF;
