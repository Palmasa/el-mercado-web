export const priceConverter = (price) => {

  if (price.toString().endsWith('0')) {
    return `${price / 100}0 €`
  } else {
    return `${price / 100} €`
  }
}