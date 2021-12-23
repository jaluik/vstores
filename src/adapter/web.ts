export default {
  set(key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    try {
      const result = window.localStorage.getItem(key);
      if (result) {
        return JSON.parse(result);
      } else {
        return result;
      }
    } catch (err) {
      console.log('err', err);
      return void 0;
    }
  },
  del(key) {
    return window.localStorage.removeItem(key);
  },
  clear() {
    return window.localStorage.clear();
  },
};
