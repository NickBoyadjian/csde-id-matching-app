export default function getAlphaMap() {
  const res = new Map();
  for (let i = 0; i < 26; i++)
    res.set(String.fromCharCode(97 + i), []);

  res.set('numerical', [])
  return res;
}