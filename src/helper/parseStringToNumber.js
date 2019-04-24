export default (object) => {
  for(let key in object) {
    object[key] = Number(object[key]);
  }
  return object;
}