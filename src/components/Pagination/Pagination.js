import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';


class Pagination extends React.Component {

  handleChangePage = (event, page) => {
    const { pagination, onPropsChange } = this.props;
    pagination.number = page+1;

    onPropsChange(pagination)
  }

  handleChangeRowsPerPage = event => {
    const size = event.target.value;
    const { pagination, onPropsChange } = this.props;
    pagination.size = size;
    pagination.number = 1;

    onPropsChange(pagination)
  }

  render() {
    const { pagination } = this.props;
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
        onChangePage={(event, page) => this.handleChangePage(event, page)}
        onChangeRowsPerPage={(event) => this.handleChangeRowsPerPage(event)}
      />
    )
  }
  
}

export default Pagination;