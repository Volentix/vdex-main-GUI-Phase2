const PEGGED_ASSETS = [
  'BTC',
  'ETH'
]

const CONTRACTS = {
  EOS: 'eosvdexadm22',
  VTX: 'vtxvdexadmin',
  BTC: 'btcvdexadmin'
}

const ASSETS = {
  EOS: {
    contract: 'eosio.token',
    precision: 4
  },

  VTX: {
    contract: 'vtxvdextoken',
    precision: 4
  },

  BTC: {
    contract: 'btcvdextoken',
    precision: 8,
    min: 0.0002,
    fee: 0.0001
  },

  ETH: {
    contract: 'ethvdextoken',
    precision: 8,
    min: 0.01,
    fee: 0.0005
  }
}

const PRICE_SCALE = 100000000

const networks = {
  local: {
    name: 'local',
    contract: 'eostokensdex',

    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    host: 'http://localhost:8888',
    port: 8888,
    protocol: 'http',
    monitor: 'http://jungle.bloks.io',
    lightapi: 'https://lightapi.eosgeneva.io',
    hyperion: 'https://api.eossweden.org/v2/',
    api: 'http://127.0.0.1:8000/api/'
  },

  jungle: {
    name: 'jungle',
    contract: 'eostokensdex',

    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    host: 'https://api.jungle.alohaeos.com',
    port: 443,
    protocol: 'https',
    monitor: 'http://jungle.bloks.io',
    lightapi: 'https://lightapi.eosgeneva.io',
    hyperion: 'https://jungle.eossweden.org/v2',
    api: 'http://127.0.0.1:8000/api/'
  },

  eos: {
    name: 'eos',
    contract: 'eostokensdex',

    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',

    host: 'https://api.main.alohaeos.com:443',
    port: 443,
    protocol: 'https',
    monitor: 'http://bloks.io',
    lightapi: 'https://api.light.xeos.me',
    hyperion: 'https://api.eossweden.org/v2/',
    api: 'http://127.0.0.1:8000/api/'
  }
}

export default {
  APP_NAME: 'EOS Tokens',
  PRICE_SCALE,
  CONTRACTS,
  ASSETS,
  PEGGED_ASSETS,
  //PRICE_DIGITS: PRICE_SCALE.toString().length - 1,
  PRICE_DIGITS: 4,

  ...networks[process.env.NETWORK] || networks.local
}
