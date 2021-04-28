let zip = window.localStorage.getItem('zip')

export const getZip = () => zip

export const setZip = (prov) => {
  window.localStorage.setItem('zip', prov)
  zip = prov
}


export const removeZip = () => {
  window.localStorage.removeItem('zip')
}