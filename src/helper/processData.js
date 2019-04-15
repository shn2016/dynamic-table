import convertDate from "./convertDate";

export default (data, key) => (data.forEach(element => {
  element[key] = convertDate(element[key]);
}));
