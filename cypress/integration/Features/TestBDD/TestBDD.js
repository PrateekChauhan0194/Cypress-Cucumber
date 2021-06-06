import { Then } from "cypress-cucumber-preprocessor/steps";

Then(/^This is a test step$/,
    async() => {
    cy.visit('https://google.com/');
    cy.get('input[name="q"]', {timeout: 10000}).type('test search');
    cy.get('input[value="Google Search"]:visible').click();
    expect(true).eq(true, 'This is a test assertion.');
});