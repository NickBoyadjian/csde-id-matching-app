import { parseFile } from 'fast-csv';
import { createReadStream } from 'fs';
import { resolve } from 'path';

export default async function csvToArray(fileName) {
  return new Promise((resolve, reject) => {
    let res = [];
    parseFile(fileName)
      .on('error', error => console.error(error))
      .on('data', row => res.push(row))
      .on('end', _ => resolve(res));
  })
}