export default ( array, object ) => {
  const memo = [];
  for ( let i = 0; i < array.length; i++) {
    const prev = (memo.length === 0) ? object : memo[memo.length-1];
    memo.push(prev[array[i]]);
  }
  return memo[memo.length-1];
}