function arrReplace(arr, x, y) {
  let index = arr.indexOf(x);
  if (index < 0) return;

  arr[index] = y;
}

export default function cleanName(n) {
  // Clean up any non alpha characters
  let name = n
    .toLowerCase().replace(".", "")
    .replace("-", "")
    .replace("_", "")
    .replace(" h s", " high school")
    .replace(" j h", " junior high")
    .split(" ");


  // replace common abbreviations
  arrReplace(name, 'hs', 'high school');
  arrReplace(name, 'shs', 'high school');
  arrReplace(name, 'ms', 'middle school');
  arrReplace(name, 'sch', 'school');
  arrReplace(name, 'el', 'elementary');
  arrReplace(name, 'elem', 'elementary');
  arrReplace(name, 'es', 'elementary');
  arrReplace(name, 'prek', 'preschool');
  arrReplace(name, 'prep', 'preparatory');

  arrReplace(name, 'st', 'saint');

  arrReplace(name, 'n', 'north');
  arrReplace(name, 's', 'south');
  arrReplace(name, 'e', 'east');
  arrReplace(name, 'w', 'west');

  if (name[name.length - 1] == "high" || name[name.length - 1] == "middle")
    name.push("school");

  // if (name[name.length - 1] == "middle")
  //   name.push("school");

  // if (name[name.length - 1] == "el" || name[name.length - 1] == "elem")
  //   name.push("school");

  // if (name[name.length - 1] == "middle")
  //   name.push("school");


  return name.join(" ")
}