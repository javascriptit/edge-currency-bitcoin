// @flow
import type { AbcCurrencyInfo } from 'airbitz-core-types'
// import bcashaddress from './bcashaddress.js'

const patchBachAddress = bcoin => {
  const addressProto = bcoin.primitives.Address.prototype
  const toBase58 = addressProto.toBase58
  addressProto.toBase58 = function (network) {
    // if (network && network.includes('bitcoincash')) {
    //   const version = this.version
    //   const hash = this.hash
    //   network = bcoin.network.get(network)
    //   const prefix = network.newAddressFormat.prefix

    //   return bcashaddress.encode(prefix, version, hash)
    // }
    return toBase58.call(this, network)
  }
}

const patchBcashTX = bcoin => {
  const txProto = bcoin.primitives.TX.prototype
  const signature = txProto.signature
  txProto.signature = function (index, prev, value, key, type, version) {
    if (type === -100) {
      // Patch bcoin with bitcoincash compatibility:
      // 1. Flip the FORKID bit in the sighash type
      // 2. Always use segwit's sighash digest algorithm (BIP 143)
      type = 0x01 | 0x40
      version = 1
    }
    return signature.call(this, index, prev, value, key, type, version)
  }
}

export const bcoinExtender = (
  bcoin: any,
  pluginsInfo: Array<AbcCurrencyInfo>
) => {
  let bcashPatch = false
  for (const { defaultSettings: { network } } of pluginsInfo) {
    const type = network.type
    bcoin.networks.types.push(type)
    for (const param in bcoin.networks.main) {
      if (!network[param]) {
        network[param] = bcoin.networks.main[param]
      }
    }
    bcoin.networks[type] = network
    if (!bcashPatch && type && type.includes('bitcoincash')) {
      patchBachAddress(bcoin)
      patchBcashTX(bcoin)
      bcashPatch = true
    }
  }
}
