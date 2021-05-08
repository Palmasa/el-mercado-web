export const priceConverter = (price) => {

  if (price.toString().endsWith('0')) {
    return `${price / 100}0 €`
  } else {
    return `${price / 100} €`
  }
}


export const toBackPrice = (num) => {
  let result = num
  let eur, cent
  if (num.toString().includes(',') || num.toString().includes('.')) {
    result = (result).toString().replace(',', '.')
    result = result.split('.')
    eur = result[0]
    cent = result[1]
    if (result[0].toString().length === 1) {
      eur = `0${result[0]}`
    }
    if (result[1]?.toString().length === 1) {
      cent = `${result[1]}0`
    }
    result = `${eur}${cent}`
    result = Number(result)
  } else {
    result = Number(result) * 100
  }
  return result
}

export const cashConverter = (num) => {
  return Number(num/100).toFixed(2)
}