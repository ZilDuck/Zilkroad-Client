describe('On NFT pages which have valid project level metadata, have these exposed', () => {
    it('passes', () => {
        cy.visit(`http://localhost:3000/collections/zil1whwpm8gywvp7c5dhs7rf63qrf6pc5ahdgudn55`)
        cy.get('[data-cy=metadata-image]').should('exist');
        cy.get('[data-cy=metadata-discord]').should('exist');
        cy.get('[data-cy=metadata-twitter]').should('exist');
    })
})

describe('On NFT pages which have no metadata exposed, should have an unloaded image', () => {
    it('passes', () => {
        cy.visit(`http://localhost:3000/collections/zil1are7e6t7258ksdl55y7hgpv6vurcyhtnk9098r`)
        cy.get('[data-cy=metadata-image]').should('exist');
    })
})