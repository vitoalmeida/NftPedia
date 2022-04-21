/// <reference types="cypress" />

context('Home Page', () => {
  it('should search a wallet', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#walletAddressInput')
      .clear()
      .type('0xEA48812C576358402ac3CaC7AE7a281C6A67C2b4');
    cy.get('[data-cy="submitButton"]').eq(1).click();
  });

  it('should select second nft', () => {
    cy.get('#nft-list > :nth-child(2)').first().click();
  });
});
