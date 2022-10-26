describe('On pages where banners are expected, banners are exposed', () => {
    it('passes', () => {
        cy.visit(`http://localhost:3000`);
        cy.get('[data-cy=banner-image]').should('exist');
    })
    it('passes', () => {
        cy.visit(`http://localhost:3000/marketplace`);
        cy.get('[data-cy=banner-image]').should('exist');
    })
    it('passes', () => {
        cy.visit(`http://localhost:3000/collections`);
        cy.get('[data-cy=banner-image]').should('exist');
    })
    it('passes', () => {
        cy.visit(`http://localhost:3000/wallet-activity`);
        cy.get('[data-cy=banner-image]').should('exist');
    })
})