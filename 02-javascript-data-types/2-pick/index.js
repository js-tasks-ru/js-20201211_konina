/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const keys = Array.from([...fields]);

  const filtered = {};

  Object.entries(obj)
    .forEach(([key, value]) => {
      if (keys.includes(key)) {
        filtered[key] = value;
      }
    });

  return filtered;
};
