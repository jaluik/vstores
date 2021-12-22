export default {
  set(key, value) {
    return window.localStorage.setItem(key, value);
  },
  get(key) {
    return window.localStorage.getItem(key);
  },
  del(key) {
    return window.localStorage.removeItem(key);
  },
  clear() {
    return window.localStorage.clear();
  },
};
[];
