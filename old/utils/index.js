import { Serialize } from 'eosjs'
import Big from 'big.js'

import config from '~/config'

export const sort_by_price = (a, b) => (a.unit_price < b.unit_price) ? 1 : ((b.unit_price < a.unit_price) ? -1 : 0)

export function amountToFloat(amount, precision) {
  const scale = new Big(10).pow(precision)
  const prefix = Big(amount).div(scale)

  return Number.parseFloat(prefix).toFixed(precision)
}


export function assetToAmount(amount, precision) {
  const scale = new Big(10).pow(precision)

  return parseInt(new Big(Number(amount)).times(scale))
}

export function calculatePrice(sell, buy) {
  let first = parseAsset(buy)
  let second = parseAsset(sell)

  if (second.symbol == 'EOS' && sell.contract == 'eosio.token')
    // EOS main token as main in price
    [first, second] = [second, first]

    const price = (first.amount / second.amount).toFixed(config.PRICE_DIGITS)

  return `${price} EOS`
}

export function parseExtendedAsset(asset) {
  const symbol = Serialize.stringToSymbol(asset.symbol)


  return {
    contract: asset.contract,
    symbol,

    str: symbol.name + '@' + asset.contract
  }
}


export function parseAsset(asset) {
  if (asset.hasOwnProperty('symbol')) return asset

  let [amount, symbol] = asset.split(' ')
  const precision = amount.split('.')[1] ? amount.split('.')[1].length : 0

  const scale = new Big(10).pow(precision)
  amount = parseInt(new Big(amount).times(scale))

  return {
    symbol: {
      symbol,
      precision
    },

    amount,

    get prefix () {
        return amountToFloat(this.amount, this.symbol.precision)
    },

    get quantity () {
        return this.prefix + ' ' + this.symbol.symbol
    }
  }
}
