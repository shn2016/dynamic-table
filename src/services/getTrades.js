import axios from 'axios';

export default query => axios.get(`https://dynamic-table-server.herokuapp.com/trades.json?${query}`);