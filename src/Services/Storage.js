export function Storage() {

  const add = (key, value) => {
    localStorage.setItem(key, value)
  }

  const get = (key) => {
    return localStorage.getItem(key)
  }

  return {
    add,
    get
  }
}