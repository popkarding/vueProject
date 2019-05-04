export function saveToLocal(id, key, val) {
  console.log(id, key, val);
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    console.log(seller);
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = val;
  localStorage.__seller__ = JSON.stringify(seller);
};
/**
 * @param {id} id
 * @param {key} key
 * @param {默认值} def
 */
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
};
