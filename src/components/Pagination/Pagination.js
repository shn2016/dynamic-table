import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

const Pagination = ({ pagination, handleChangeRowsPerPage, handleChangePage }) => {
  const { number=1, size=10, total=0 } = pagination;
  return (
    <TablePagination
      rowsPerPageOptions={[3, 5, 10, 20]}
      component="div"
      count={total}
      rowsPerPage={Number(size)}
      page={Number(number-1)}
      backIconButtonProps={{
        'aria-label': 'Previous Page',
      }}
      nextIconButtonProps={{
        'aria-label': 'Next Page',
      }}
      onChangePage={(event, page) => handleChangePage(event, page)}
      onChangeRowsPerPage={(event) => handleChangeRowsPerPage(event)}
    />
  )
}

export default Pagination;