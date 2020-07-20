import csvToArray from './csvToArray';
import csvToMap from './csvToMap';
import getAlphaMap from './helpers/getAlphaMap';
import csvToObjects from './helpers/csvToObjects';
import cleanName from './helpers/cleanName';
import getBestMatch from './helpers/getBestMatch';
import CsvFile from './helpers/CsvFile';
const path = require('path');


const calculate = async (surveyFile, publicFile, privateFile, downloadFile) => {
  try {
    document.getElementById("status").innerText = "Calculating...";
    document.getElementById("status2").innerText = "";

    // Load the data from the CSVs
    let count = 0;
    const surveyData = csvToObjects(await csvToArray(surveyFile));
    const governmentData = await csvToMap(privateFile, await csvToMap(publicFile, getAlphaMap()));

    // main program loop
    //const res = surveyData.map(school => getBestMatch(school, governmentData));
    let res = [];

    for (let i = 0; i < surveyData.length; i++) {
      res.push(getBestMatch(surveyData[i], governmentData));
    }

    const csvFile = new CsvFile({
      path: path.resolve(downloadFile),
      // headers to write
      headers: Object.keys(res[0]),
    });

    // 1. create the csv
    csvFile
      .create(res)
      .catch(err => {
        console.error(err.stack);
        process.exit(1);
      });

    document.getElementById("status").innerText = "Done";
  } catch (error) {
    document.getElementById("status").innerText = "Error";
  }
}

export default calculate;