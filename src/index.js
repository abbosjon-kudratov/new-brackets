module.exports = function check(str, bracketsConfig) {
  const flattedBrackets = bracketsConfig.reduce((acc, val) => acc.concat(val), []); // .flat() alternative
  const splittedString = str.split('');
  const similarBrackets = {};
  const brackets = [];
  const rules = {};

  for (let i = 0; i < flattedBrackets.length; i += 2) {
    const closeBracket = flattedBrackets[i + 1];
    const openBracket = flattedBrackets[i];

    rules[openBracket] = closeBracket;

    if (closeBracket === openBracket) similarBrackets[openBracket] = false;
  }

  for (const char of splittedString) {
    if (rules[char] !== char) {
      if (rules.hasOwnProperty(char)) brackets.push(char);
      else if (char !== rules[brackets.pop()]) return false;
    } else {
      similarBrackets[char] = !similarBrackets[char];

      if (similarBrackets[char]) brackets.push(char);
      else if (char !== rules[brackets.pop()]) return false;
    }
  }

  if (Object.values(similarBrackets).includes(true)) return false;
  if (brackets.length) return false;

  return true;
};