export default (subObjects, checkboxLabel, filter, pageType)  => {
  if (pageType === 'withdraws') {
    if(!filter[subObjects[0]]) filter[subObjects[0]] =[];
    if(filter[subObjects[0]].includes(checkboxLabel)) {
      filter[subObjects[0]].splice(filter[subObjects[0]].indexOf(checkboxLabel), 1);
    } else {
      filter[subObjects[0]].push(checkboxLabel);
    }
    return;
  }

  const dummy = [];
  for (let i = 0; i < subObjects.length; i++) {
    const prev = (dummy.length===0) ? filter : dummy[dummy.length-1];
    if(!prev[subObjects[i]]) prev[subObjects[i]] = {};
    dummy.push(prev[subObjects[i]]);
  }

  if (!dummy[dummy.length-1].inq) dummy[dummy.length-1].inq = [];
  if (dummy[dummy.length-1].inq.includes(checkboxLabel)) {
    dummy[dummy.length-1].inq.splice(dummy[dummy.length-1].inq.indexOf(checkboxLabel), 1);
    return;
  }

  dummy[dummy.length-1].inq.push(checkboxLabel);
}