let zipCode = window.localStorage.getItem('zDcde') || null

export const getZip = () => zipCode

export const setZip = zip => {
  window.localStorage.setItem('zDcde', zip)
  zipCode = zip
}

export const outZip = () => {
  window.localStorage.removeItem('zDde')
}