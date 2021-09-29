let store = Object.create(null)

export const KEYS = {

}

export function setData (key, value) {
  store[key] = value
}

export function getData (key) {
  return store[key] || null
}

export function removeData (key) {
  store[key] = null
}

export function clear () {
  store = Object.create(null)
}

export default {
  setData,
  getData,
  removeData,
  clear
}
