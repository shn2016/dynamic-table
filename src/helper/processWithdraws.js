import convertDate from "./convertDate";

export default (data) => {
  data.forEach(element => {
  element.createdAt = convertDate(element.createdAt);
})
  return data;
};
