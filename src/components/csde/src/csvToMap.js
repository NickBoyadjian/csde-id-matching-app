import { parseFile } from 'fast-csv';
import { createReadStream } from 'fs';
import { resolve } from 'path';

export default async function csvToMap(fileName, map) {
  return new Promise((resolve, reject) => {
    const res = map;
    let i = 0;
    let headers;
    parseFile(fileName)
      .on('error', error => console.error(error))
      .on('data', (row) => {
        // On the first iteration we save the headers from the csv file
        if (i == 0) {
          headers = row;
          i++;
          return;
        }

        // Otherwise we create an object from the row
        let obj = {}
        for (let j = 0; j < row.length; j++) {
          obj[headers[j].trim()] = row[j].trim();
        }

        // And put the current row into the result Map  
        let firstLetter = obj.NAME.trim().charAt(0).toLowerCase();
        if (firstLetter >= 'a' && firstLetter <= 'z') {
          res.get(firstLetter).push(obj);
        } else {
          res.get('numerical').push(obj)
        }
        i++;
      })
      .on('end', _ => resolve(res));
  })
}