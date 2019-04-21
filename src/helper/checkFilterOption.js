export default (subObjects, checkboxLabel, filter) => {
  const dummy = [];
  for (let i = 0; i < subObjects.length; i++) {
    const prev = (dummy.length===0) ? filter : dummy[dummy.length-1];
    if(!prev[subObjects[i]]) return false;
    dummy.push(prev[subObjects[i]]);
  }

  if (!dummy[dummy.length-1].inq) return false;
  
  if(!dummy[dummy.length-1].inq.includes(checkboxLabel)) return false;
  return true;
}