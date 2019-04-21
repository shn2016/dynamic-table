import axios from 'axios';
import qs from 'qs';

export default (type, filter, pagination) => axios.get(`https://dynamic-table-server.herokuapp.com/${type}.json`, {
  params: {
    filter,
    pagination,
  },
  paramsSerializer: params => qs.stringify(params),
});
