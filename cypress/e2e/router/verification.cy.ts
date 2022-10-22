describe('On verified pages, a verified tick appears', () => {
    it('passes', () => {
        cy.visit(`http://localhost:3000/collections/zil1are7e6t7258ksdl55y7hgpv6vurcyhtnk9098r`)
        cy.get('[data-cy=verified-check]').should('exist');
    })
})

describe('On non verified pages, a no verified tick appears', () => {
    it('passes', () => {
        cy.visit(`http://localhost:3000/collections/zil1are7e6t7258ksdl55y7hgpv6vurcyhtnk9098r`)
        cy.get('[data-cy=verified-check]').should('not.exist');
    })
})