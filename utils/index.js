/**
 * Remove all specified keys from an object, no matter how deep they are.
 * The removal is done in place, so run it on a copy if you don't want to modify the original object.
 * This function has no limit so circular objects will probably crash the browser
 *
 * @param obj The object from where you want to remove the keys
 * @param keys An array of property names (strings) to remove
 */
function removeKeys(obj, keys) {
  for (const property in obj) {
    // important check that this is objects own property
    // not from prototype prop inherited
    const hasProperty = Object.prototype.hasOwnProperty.call(obj, property);
    if (hasProperty) {
      switch (typeof obj[property]) {
        case 'string':
          if (keys.includes(property)) {
            delete obj[property];
          }
          break;
        case 'object':
          if (keys.includes(property)) {
            delete obj[property];
          } else {
            removeKeys(obj[property], keys);
          }
          break;
      }
    }
  }
}

export { removeKeys };
