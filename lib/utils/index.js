export const get = (object, keys, defaultVal) => {
  keys = Array.isArray(keys) ? keys : keys.split('.');
  object = object ? object[keys[0]] : undefined;

  if (object && keys.length > 1) {
    return get(object, keys.slice(1), defaultVal);
  }

  return object === undefined ? defaultVal : object;
}

export const set = (object, keys, value) => {
  keys = Array.isArray(keys) ? keys : keys.split('.');
  const key = keys[0];
  
  if (keys.length > 0) {
    return Object.assign({}, object, { [key]: set(object[key] || {}, keys.slice(1), value) });
  }

  return value;
}