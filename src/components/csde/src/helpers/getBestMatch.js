import cleanName from './cleanName';
import { abbr } from 'us-state-converter';
import { compareTwoStrings } from 'string-similarity';

export default function getBestMatch(school, governmentData) {
  // set up
  const name = cleanName(school.NAME);
  const state = school.STATE.length == 2 ? school.STATE : abbr(school.STATE);
  let currentBest = "";
  let currentBestScore = 0;

  // Round one, FIGHT ===============================================================================
  let governmentArray = name.charAt(0) >= 'a' && name.charAt(0) <= 'z'
    ? governmentData.get(name.charAt(0))
    : governmentData.get('numerical');


  [currentBest, currentBestScore] = loop(governmentArray, name, state, currentBest, currentBestScore);

  let [shouldReturn, returnValue] = checkReturn(currentBest, currentBestScore, school, 2);

  if (shouldReturn)
    return returnValue;

  // Round two, FIGHT ===============================================================================
  const secondLetter = name.split(" ")[1].charAt(0);
  let governmentArray2 = secondLetter >= 'a' && secondLetter <= 'z'
    ? governmentData.get(secondLetter)
    : governmentData.get('numerical');

  [currentBest, currentBestScore] = loop(governmentArray2, name, state, currentBest, currentBestScore);

  [shouldReturn, returnValue] = checkReturn(currentBest, currentBestScore, school, 3);

  if (shouldReturn)
    return returnValue;

  // Round three, FIGHT ===============================================================================
  const thirdLetter = name.split(" ")[1].charAt(0);
  let governmentArray3 = thirdLetter >= 'a' && thirdLetter <= 'z'
    ? governmentData.get(thirdLetter)
    : governmentData.get('numerical');

  [currentBest, currentBestScore] = loop(governmentArray3, name, state, currentBest, currentBestScore);

  [shouldReturn, returnValue] = checkReturn(currentBest, currentBestScore, school, 0);

  if (shouldReturn)
    return returnValue;

  // Round four, FIGHT ===============================================================================
  let governmentArray4 = governmentData.get('t');

  [currentBest, currentBestScore] = loop(governmentArray4, name, state, currentBest, currentBestScore);

  return formatReturn(currentBest, currentBestScore, school);
}










// Helpers =========================================
const formatReturn = (currentBest, currentBestScore, school) => {
  return Object.assign({}, school, {
    Matched_Name: currentBest.NAME,
    Matched_City: currentBest.CITY,
    Matched_State: currentBest.STATE,
    NCESID: currentBest.NCESID,
    certainty: round(currentBestScore, 2)
  });
}

const checkReturn = (currentBest, currentBestScore, school, minLen) => {
  if (currentBestScore == 1 || school.NAME.split(" ").length < minLen) {
    return [true, formatReturn(currentBest, currentBestScore, school)]
  }

  return [false, formatReturn(currentBest, currentBestScore, school)]
}

const loop = (governmentArray, name, state, currentBest, currentBestScore) => {
  for (let i = 0; i < governmentArray.length; i++) {
    let currentName = cleanName(governmentArray[i].NAME);
    let thisScore = compareTwoStrings(name, currentName);
    let thisState = governmentArray[i].STATE;
    if (thisScore === 1 && thisState == state) {
      currentBestScore = thisScore;
      currentBest = governmentArray[i];
      continue;
    }
    if (thisScore > currentBestScore && thisState == state) {
      currentBestScore = thisScore;
      currentBest = governmentArray[i];
    }
  }

  return [currentBest, currentBestScore]
}

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}   