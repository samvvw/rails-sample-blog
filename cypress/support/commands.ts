// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
         */
        login(email: string, password: string): void
        signup(email: string, password: string): void
        logout(): void
    }
}

Cypress.Commands.add('login', (email, password) => {
    cy.get('[data-cy="login-link"]').click()
    cy.get('[data-cy="email-field"]').type(email)
    cy.get('[data-cy="password-field"]').type(password)
    cy.get('[data-cy="login-button"]').click()
})

Cypress.Commands.add('signup', (email, password) => {
    cy.get('[data-cy="signup-link"]').click()
    cy.get('[data-cy="email-field"]').type(email)
    cy.get('[data-cy="password-field"]').type(password)
    cy.get('[data-cy="password-confirmation-field"]').type(password)
    cy.get('[data-cy="sign-up-button"]').click()
})

Cypress.Commands.add('logout', () => {
    cy.get('[data-cy="logout-link"]', { timeout: 5000 }).click()
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
