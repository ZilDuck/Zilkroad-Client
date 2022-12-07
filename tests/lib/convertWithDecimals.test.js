import { convertWithDecimals } from "../../src/lib/fungibles.js";

const approvedFungibles = [
  { fungible_address: '', fungible_name: 'Testnet Zilliqa', fungible_symbol: 'ZIL', decimals: 12 },
  {
    fungible_address: '0x864895d52504c388a345ef6cd9c800dbbd0ef92a',
    fungible_name: 'Testnet Wrapped Zilliqa',
    fungible_symbol: 'WZIL',
    decimals: '12'
  },
  {
    fungible_address: '0x607d0ba69c3680ed07262e5d80be98c401fd612c',
    fungible_name: 'Testnet Governance Zilliqa',
    fungible_symbol: 'GZIL',
    decimals: '15'
  },
  {
    fungible_address: '0x56906c825a6df74032ea40b4ff882b5970f3d0a8',
    fungible_name: 'Testnet StraitsX Singapore Dollar',
    fungible_symbol: 'XSGD',
    decimals: '6'
  },
  {
    fungible_address: '0x75fA7D8BA6BEd4a68774c758A5e43Cfb6633D9d6',
    fungible_name: 'Testnet Wrapped Zilliqa Bitcoin',
    fungible_symbol: 'zWBTC',
    decimals: '8'
  },
  {
    fungible_address: '0x2e8e7d992c8dc04f89c4e5e798b2fa8345885b18',
    fungible_name: 'Testnet Wrapped Zilliqa Ethereum',
    fungible_symbol: 'zETH',
    decimals: '18'
  },
  {
    fungible_address: '0x9fe903bf7c48d6bf4bcc7c53e77d3d2a2ebbf5ae',
    fungible_name: 'Testnet Wrapped Zilliqa Tether Dollar',
    fungible_symbol: 'zUSDT',
    decimals: '6'
  },
  {
    fungible_address: '0x30832ed39781b7840485f79fb971bb67a595a2b2',
    fungible_name: 'Testnet Duck Duck',
    fungible_symbol: 'DUCK',
    decimals: '2'
  }
]

test('convertWithDecimals', () => {
  expect(convertWithDecimals(approvedFungibles, 'DUCK', 1)).toBe("100");
  expect(convertWithDecimals(approvedFungibles, '0x30832ed39781b7840485f79fb971bb67a595a2b2', 1)).toBe("100");
  expect(convertWithDecimals(approvedFungibles, 'DUCK', 100, true)).toBe("1");
  expect(convertWithDecimals(approvedFungibles, 'ZWBTC', 1)).toBe("100000000");
  expect(convertWithDecimals(approvedFungibles, '0x75fA7D8BA6BEd4a68774c758A5e43Cfb6633D9d6', 1)).toBe("100000000");
  expect(convertWithDecimals(approvedFungibles, 'ZWBTC', "100000000", true)).toBe("1");
  expect(convertWithDecimals(approvedFungibles, 'GZIL', 2)).toBe("2000000000000000");
  expect(convertWithDecimals(approvedFungibles, 'WZIL', 5, true)).toBe("0.000000000005");
  expect(convertWithDecimals(approvedFungibles, 'WZIL', "500000", true)).toBe("0.0000005");
  expect(convertWithDecimals(approvedFungibles, 'WZIL', "10000000")).toBe("10000000000000000000");
  expect(convertWithDecimals(approvedFungibles, 'WZIL', "")).toBe("0");
  expect(convertWithDecimals(approvedFungibles, 'WZIL', "anything")).toBe("0");
});