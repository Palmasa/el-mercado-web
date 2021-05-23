export const dateConverter = (date) => {
  let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  let month = date.slice(5, 7)
  if (month.toString().startsWith('0')) {
    month = date.slice(6, 7)
  }
  return `${date.slice(8, 10)} de ${months[month - 1]}`

}