describe('Homepage returns 200 when requested', () => {
  it('passes', () => {
    cy.visit(`http://localhost:3000/`)
  })
})

describe('Marketplace page returns 200 when requested', () => {
  it('passes', () => {
    cy.visit(`http://localhost:3000/marketplace`)
  })
})

describe('Collections page returns 200 when requested', () => {
  it('passes', () => {
    cy.visit(`http://localhost:3000/collections`)
  })
})

describe('Wallet-Activity page returns 200 when requested', () => {
  it('passes', () => {
    cy.visit(`http://localhost:3000/wallet-activity`)
  })
})

describe('An NFT collection page returns 200 when requested', () => {
  it('passes', () => {
    cy.visit(`http://localhost:3000/collections/0xb5e17ace300f843eb2fa359c0f52894a4954a1f5`)
  })
})

describe('A Single NFT page returns 200 when requested', () => {
  it('passes', () => {
    cy.visit(`http://localhost:3000/collections/0xb5e17ace300f843eb2fa359c0f52894a4954a1f5/1`)
  })
})


  