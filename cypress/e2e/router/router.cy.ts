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
    cy.visit(`http://localhost:3000/collections/zil1whwpm8gywvp7c5dhs7rf63qrf6pc5ahdgudn55`)
  })
})

describe('A Single NFT page returns 200 when requested', () => {
  it('passes', () => {
    cy.visit(`http://localhost:3000/collections/zil1whwpm8gywvp7c5dhs7rf63qrf6pc5ahdgudn55/1`)
  })
})

