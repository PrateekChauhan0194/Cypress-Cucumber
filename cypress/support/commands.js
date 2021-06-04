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
// Cypress.Commands.add('login', (email, password) => { ... })
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

/**
 * Chainable interfaces have to be extended if you need to use the the custom cy commands in typescript
 */
// declare namespace Cypress {
//     interface Chainable<Subject> {
//         selectProduct(value: string): Chainable<Subject>
//     }
// }

Cypress.Commands.add('selectProduct', function (productName) {
    cy.get('h4.card-title').each($cardTitle => {
        const currCardTitle = $cardTitle.text();
        if(currCardTitle.includes(productName)) {
            $cardTitle
                .parent('div.card-body')
                .siblings('div.card-footer')
                .find('button.btn')
                .click();
        }
    });
});