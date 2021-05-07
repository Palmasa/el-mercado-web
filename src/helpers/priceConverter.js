export const priceConverter = (price) => {

  if (price.toString().endsWith('0')) {
    return `${price / 100}0 €`
  } else {
    return `${price / 100} €`
  }
}

export const cashConverter = (num) => {
  return (num/100).toFixed(2).replace('.', ',')
}

export const converterCash = (num) => {
  Number((num).toString().replace('.', ''))
}