/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {

  if (!isFinite(size)) {
    return string;
  }

  if (string.length === 0 || size === 0) {
    return '';
  }

  let prevSymbol = '';
  let matchedSymbolIndex = 0;

  return string
    .split('')
    .map(currentSymbol => {

      let symbol = currentSymbol;

      if (prevSymbol !== currentSymbol) {
        matchedSymbolIndex = 0;
      }
      if (prevSymbol === currentSymbol) {
        ++matchedSymbolIndex;
        if (matchedSymbolIndex === size) {
          matchedSymbolIndex = 0;
          symbol = '';
        }
      }
      prevSymbol = currentSymbol;

      return symbol;

    })
    .join('');
}
