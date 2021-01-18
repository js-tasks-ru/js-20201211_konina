/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  let props = path.split('.');
  let propIndex = 0;

  return function getter(object, prop = props[propIndex]) {

    if (!object || !object[prop]) {
      return;
    }

    if (object[prop] && propIndex === (props.length - 1)) {
      return object[prop];
    }

    return getter(object[prop], props[++propIndex]);
  };
}
