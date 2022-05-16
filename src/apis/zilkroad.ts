type MetadataResponse = {
  result: Metadata
}

// listing for contract - DB 
export const zilkroad = (fetch: (info: RequestInfo, init?: RequestInit) => Promise<Response>) => {
  const getListings = async ({ contract, page = 1, perPage = 25 }: {contract?: string, page?: number, perPage?: number}) => {
    const response = await fetch(`https://test-api.zilkroad.io/listings/${contract ?? ''}?page=${page}&per-page=${perPage}`)
    const listings = await response.json() as { result:{ listings: Listing[], count: number } }
    return { ...listings.result, count: Number(listings.result.count) }
  }

  //get all featured - DB
  const getFeaturedListings = async () => {
    const response = await fetch('https://test-api.zilkroad.io/listings/featured')
    const listings = await response.json() as { result: Listing[] }
    return listings.result
  }

  // get all the users listings - db
  const getUserListings = async ({ user, page = 1, perPage = 25 }: {user: string, page?: number, perPage?: number}) => {
    console.time('get user listings')
    const response = await fetch(`https://test-api.zilkroad.io/listings?user=${user}&page=${page}&per-page=${perPage}`)
    const listings = await response.json() as { result: { listings: Listing[], count: number }}
    console.timeEnd('get user listings')
    return { ...listings.result, count: Number(listings.result.count) }
  }

  //get a listing for a specific contract/token db
  const getListing = async (contract: string, tokenId: string) => {
    const response = await fetch(`https://test-api.zilkroad.io/listings/${contract}/${tokenId}`)
    const listing = await response.json() as { result: SingleListing }
    return listing.result
  }

// get all the NFTs for a contract - prodpeak
  const getCollections = async () => {
    const response = await fetch('https://test-api.zilkroad.io/collections')
    const collections = await response.json() as { result: Collection[] }
    return collections.result
  }

// get a NFT for a contract - prodpeak
  const getCollection = async (contract: string) => {
    const response = await fetch(`https://test-api.zilkroad.io/collections/${contract}`)
    const collection = await response.json() as { result: Collection & CollectionData }
    return collection.result
  }

// get a NFT for a contract - prodpeak
  const getNftMetadata = async (contract: string, tokenId: string) => {
    const response = await fetch(`https://test-api.zilkroad.io/nfts/metadata/${contract}/${tokenId}?network=https://dev-api.zilliqa.com`)
    const metadata = await response.json() as MetadataResponse
    const attributes = metadata.result.token.attributes.map((attribute) => ({ traitType: attribute.trait_type, value: attribute.value })) // eslint-disable-line
    return { ...metadata.result, token: { ...metadata.result.token, attributes } }
  }

  //get all user nfts held in wallet. - prodpeak
  const getUserNfts = async (userAddress: string) => {
    const response = await fetch(`https://test-api.zilkroad.io/wallets/${userAddress}?network=https://dev-api.zilliqa.com`)
    const userNfts = await response.json() as { contract: string, tokenIds: string[], zrc6: boolean }[]
    return userNfts.filter((u) => u.zrc6).map((collection) => collection.tokenIds.map((tokenId) => ({ contract: collection.contract, tokenId }))).flat()
  }

  // get recent sales info for a contract/token - db (sales data)
  const getRecentSales = async (contract?: string, tokenId?: string) => {
    const response = await fetch(`https://test-api.zilkroad.io/sales/${contract ?? ''}${contract ? '/' : ''}${tokenId ?? ''}`)
    const sales = await response.json() as { result: Sale[] }
    return sales.result
  }


  // get all sales info for a contract/token - db (price chart)
  const getSalesHistory = async (contract: string, tokenId: string) => {
    const response = await fetch(`https://test-api.zilkroad.io/sales/${contract}/${tokenId}/history`)
    const history = await response.json() as { result: SaleHistory[] }
    return history.result
  }

  // for a list of contract/tokens return all metadata - prodpeak
  const batchGetNftMetadata = async (nfts: { contract: string, tokenId: string }[]) => {
    console.time('get nft metadata')
    const responses = nfts.map(async (nft) => getNftMetadata(nft.contract, nft.tokenId))
    console.timeEnd('get nft metadata')
    return Promise.all(responses)
  }

  // get address which holds token/contract
  const getNftOwner = async (contract: string, tokenId: string) => {
    const response = await fetch(`https://test-api.zilkroad.io/nfts/owner/${contract}/${tokenId}?network=https://dev-api.zilliqa.com`)
    const owner = await response.json() as { result: string }
    return owner.result
  }

  // return all verified - temporarily nulled pending deletion/refactor
  const getVerifiedContracts = async () => {
    // const response = await fetch('https://test-api.zilkroad.io/collections/verified')
    // const data = await response.json() as { result: { address: string }[] }
    // return data.result.map((r) => r.address)
  }

  // return all proxy

  // wallet data - db
  const getUserActivity = async (user: string) => {
    const response = await fetch(`https://test-api.zilkroad.io/wallets/${user}/activity`)
    const data = await response.json() as { result: UserActivity[] }
    return data.result
  }

  type BalanceFungible = {
    address: string
    name: string
    symbol: string
    decimals: number
    coingeckoId: string
    balance: string
    convertedBalance: string
  }

  // returns all tokens user holds
  const getUserBalances = async (user: string) => {
    const response = await fetch(`https://test-api.zilkroad.io/balances/${user}?network=https://dev-api.zilliqa.com`)
    const balances = await response.json() as { [key: string]: BalanceFungible }
    return balances
  }

  // get sales history/royalty
  const getUserDetails = async (user: string) => {
    console.time('get user details')
    const response = await fetch(`https://test-api.zilkroad.io/wallets/${user}/details`)
    const activity = await response.json() as { result: Details }
    console.timeEnd('get user details')
    return activity.result
  }

  return {
    getListings,
    getFeaturedListings,
    getListing,
    getUserListings,
    getCollections,
    getCollection,
    getNftMetadata,
    getUserNfts,
    getRecentSales,
    getSalesHistory,
    batchGetNftMetadata,
    getUserBalances,
    getUserDetails,
    getNftOwner,
    getVerifiedContracts,
    getUserActivity
  }
}
