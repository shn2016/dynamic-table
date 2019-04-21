import convertDate from "./convertDate";

export default (data) => {
  data.forEach(element => {
    element.updatedAt = convertDate(element.updatedAt);
    element.tradingPair = element.tradingPair.symbol;
  });
  return data;
;}
