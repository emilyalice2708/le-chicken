/// <reference types="cypress" />

context('Coop Actions', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
    cy.visit('http://localhost:19006')
  })

  it('allows user to type', () => {
    cy.get('input')
      .type('walk').should('have.value', 'walk')
  })

  it("moves the chicken to the top, when user types 'marche'", () => {
    cy.get('#chicken-right').should('have.css', 'top', '450px')
    cy.get('input')
      .type('marcher')
    cy.get('#chicken-up').should('have.css', 'top', '100px')
  })

  it("animates the chicken, when walking up", () => {
    cy.get('#chicken-right')
    cy.get('input')
      .type('marcher')
    cy.get('#chicken-walkUp')
  })

  it("resets chicken to idle when stopped", () => {
    cy.get('#chicken-right')
    cy.get('input')
      .type('marcher')
    cy.get('#chicken-walkUp')
    cy.get('#chicken-up')
  })

  it("chicken moves up when user types ouvrir", () => {
    cy.get('#chicken-right')
    cy.get('input')
      .type('marcher')
    cy.get('input')
      .type('ouvrir')
    cy.get('#chicken-up').should('have.css', 'top', '5px')
  })
})