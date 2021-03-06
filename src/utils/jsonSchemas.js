/**
 * Created by Paul Puey 2017/11/09.
 * @flow
 */

export const EarnComFeesSchema = {
  type: 'object',
  properties: {
    fees: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          minFee: { type: 'number' },
          maxFee: { type: 'number' },
          dayCount: { type: 'number' },
          memCount: { type: 'number' },
          minDelay: { type: 'number' },
          maxDelay: { type: 'number' },
          minMinutes: { type: 'number' },
          maxMinutes: { type: 'number' }
        },
        required: [
          'minFee',
          'maxFee',
          'dayCount',
          'memCount',
          'minDelay',
          'maxDelay',
          'minMinutes',
          'maxMinutes'
        ]
      }
    }
  },
  required: ['fees']
}

export const arrayOfStringScheme = {
  type: 'array',
  items: { type: 'string' }
}

export const electrumHeaderSchema = {
  type: 'object',
  properties: {
    block_height: { type: 'number' },
    version: { type: 'number' },
    prev_block_hash: { type: 'string' },
    merkle_root: { type: 'string' },
    timestamp: { type: 'number' },
    bits: { type: 'number' },
    nonce: { type: 'number' }
  },
  required: ['block_height', 'timestamp']
}

export const electrumSubscribeHeadersSchema = {
  type: 'object',
  properties: {
    method: { type: 'string' },
    params: {
      type: 'array',
      items: electrumHeaderSchema
    }
  },
  required: ['method', 'params']
}

export const electrumSubscribeScriptHashSchema = {
  type: 'object',
  properties: {
    method: { type: 'string' },
    params: arrayOfStringScheme
  },
  required: ['method', 'params']
}

export const electrumFetchHeaderSchema = {
  type: 'object',
  properties: {
    block_height: { type: 'number' },
    version: { type: 'number' },
    prev_block_hash: { type: 'string' },
    merkle_root: { type: 'string' },
    timestamp: { type: 'number' },
    bits: { type: 'number' },
    nonce: { type: 'number' }
  },
  required: [
    'block_height',
    'version',
    'prev_block_hash',
    'merkle_root',
    'timestamp',
    'bits',
    'nonce'
  ]
}

export const electrumFetchHistorySchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      tx_hash: { type: 'string' },
      height: { type: 'number' },
      fee: { type: 'number' }
    },
    required: ['height', 'tx_hash']
  }
}

export const electrumFetchUtxoSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      tx_hash: { type: 'string' },
      tx_pos: { type: 'number' },
      height: { type: 'number' },
      value: { type: 'number' }
    },
    required: ['height', 'tx_hash', 'tx_pos', 'value']
  }
}
