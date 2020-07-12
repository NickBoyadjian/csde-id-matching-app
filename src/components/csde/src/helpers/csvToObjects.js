export default function csvToObjects(arr) {
  let jsonObj = [];
  const headers = arr[0];
  for (let i = 1; i < arr.length; i++) {
    let data = arr[i];
    let obj = {};
    for (let j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = data[j].trim();
    }
    jsonObj.push(obj);
  }
  return jsonObj;
}