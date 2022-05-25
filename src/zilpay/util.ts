// Code taken from https://github.com/Zilliqa/zilliqa-js/

const CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'
const GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3]
// HRP is the human-readable part of zilliqa bech32 addresses
export const HRP = 'zil'

export const isAddress = (address: string) => {
  return isByteString(address, 40)
}

export const isBech32 = (raw: string) => {
  return !!raw.match(/^zil1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}$/)
}

export const isByteString = (str: string, len: number) => {
  return !!str.replace('0x', '').match(`^[0-9a-fA-F]{${len}}$`)
}

export const encode = (hrp: string, data: Buffer) => {
  const combined = Buffer.concat([data, createChecksum(hrp, data)])
  let ret = hrp + '1'
  for (let p = 0; p < combined.length; ++p) {
    ret += CHARSET.charAt(combined[p])
  }
  return ret
}

const hrpExpand = (hrp: string): Buffer => {
  const ret = []
  let p: number
  for (p = 0; p < hrp.length; ++p) {
    ret.push(hrp.charCodeAt(p) >> 5)
  }
  ret.push(0)
  for (p = 0; p < hrp.length; ++p) {
    ret.push(hrp.charCodeAt(p) & 31)
  }
  return Buffer.from(ret)
}

function createChecksum (hrp: string, data: Buffer) {
  const values = Buffer.concat([
    Buffer.from(hrpExpand(hrp)),
    data,
    Buffer.from([0, 0, 0, 0, 0, 0])
  ])
  // var values = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
  const mod = polymod(values) ^ 1
  const ret = []
  for (let p = 0; p < 6; ++p) {
    ret.push((mod >> (5 * (5 - p))) & 31)
  }
  return Buffer.from(ret)
}

const polymod = (values: Buffer): number => {
  let chk = 1
  for (let p = 0; p < values.length; ++p) {
    const top = chk >> 25
    chk = ((chk & 0x1ffffff) << 5) ^ values[p]
    for (let i = 0; i < 5; ++i) {
      if ((top >> i) & 1) {
        chk ^= GENERATOR[i]
      }
    }
  }
  return chk
}

/**
 * toBech32Address
 *
 * Encodes a canonical 20-byte Ethereum-style address as a bech32 zilliqa
 * address.
 *
 * The expected format is zil1<address><checksum> where address and checksum
 * are the result of bech32 encoding a Buffer containing the address bytes.
 *
 * @returns {string} 38 char bech32 encoded zilliqa address
 * @param address
 */
export const toBech32Address = (address: string): string => {
  if (!isAddress(address)) {
    throw new Error('Invalid address format.')
  }

  const addrBz = convertBits(
    Buffer.from(address.replace('0x', ''), 'hex'),
    8,
    5
  )

  if (addrBz === null) {
    throw new Error('Could not convert byte Buffer to 5-bit Buffer')
  }

  return encode(HRP, addrBz)
}

/**
 * convertBits
 *
 * groups buffers of a certain width to buffers of the desired width.
 *
 * For example, converts byte buffers to buffers of maximum 5 bit numbers,
 * padding those numbers as necessary. Necessary for encoding Ethereum-style
 * addresses as bech32 ones.
 *
 * @param {Buffer} data
 * @param {number} fromWidth
 * @param {number} toWidth
 * @param {boolean} pad
 * @returns {Buffer|null}
 */
export const convertBits = (
  data: Buffer,
  fromWidth: number,
  toWidth: number,
  pad = true
) => {
  let acc = 0
  let bits = 0
  const ret = []
  const maxv = (1 << toWidth) - 1
  for (let p = 0; p < data.length; ++p) {
    const value = data[p]
    if (value < 0 || value >> fromWidth !== 0) {
      return null
    }
    acc = (acc << fromWidth) | value
    bits += fromWidth
    while (bits >= toWidth) {
      bits -= toWidth
      ret.push((acc >> bits) & maxv)
    }
  }

  if (pad) {
    if (bits > 0) {
      ret.push((acc << (toWidth - bits)) & maxv)
    }
  } else if (bits >= fromWidth || (acc << (toWidth - bits)) & maxv) {
    return null
  }

  return Buffer.from(ret)
}
