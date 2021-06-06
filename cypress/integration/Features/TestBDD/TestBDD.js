import { Given } from "cypress-cucumber-preprocessor/steps";

Given(/^This is a test step$/,
    async() => {
    cy.visit('https://google.com/');
    cy.title().should('eq', 'Google');
});

Given(/^This is a test step with data table$/,
    async (dataTable) => {
    const data = dataTable.hashes();
    cy.log(`data[0].key: ${data[0].key}`);
    cy.log(`data[0].value: ${data[0].value}`);
});