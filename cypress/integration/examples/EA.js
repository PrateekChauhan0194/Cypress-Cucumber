describe('Energy Australia', () => {
    let eaTestData;
    let selectors;

    before('Setup', () => {
        cy.fixture('eaTestData').then(function(data) {
            eaTestData = data.data;
            selectors = data.selectors;
        });
    });

    it('Quote Tool E2E', () => {
        // Navigate to plans page
        cy.visit(eaTestData.planPageUrl, {failOnStatusCode: false}).then(resp => {
            cy.log(resp.status);
        });

        // Click on select plan page
        cy.get(selectors.btnAddBasicPlanToCart, {timeout: 10000}).click();

        // Click on continue button on cart page
        cy.get('button[id*="proceedBtn"]', {timeout: 10000}).click();

        // Wait for qualifier to open
        cy.get('div.qualifier', {timeout: 10000});

        // Click on new customer button
        // const newOrExistingCustomer = 'New';
        cy.get('sui-radio-option p', {timeout: 10000}).each(($buttonName) => {
            if($buttonName.text().includes(eaTestData.newOrExistingCustomer)) {
                $buttonName.parent('button').click();
            }
        });

        // Click on 'No' button on move home question
        const moveOption = 'No';
        cy.get('sui-radio-option label', {timeout: 10000}).each(($buttonName) => {
            if($buttonName.text().includes(moveOption)) {
                $buttonName.parent('button').click();
            }
        });

        // Enter address and select the desired address from the QAS dropdown
        const searchString = '42 Brownlow Drive';
        const addressToSelect = '42 Brownlow Drive, POINT COOK  VIC  3030'
        cy.get('div[data-component-name*="address"] div#ea-address-auto-input input').as('tfAddress');
        cy.get('@tfAddress').type(searchString);
        cy.get('#connection-address-auto-autocomplete ul li', {timeout: 10000})
            .should('be.visible')
            .each(($listItem) => {
                const itemText = $listItem.text();
                if (itemText.includes(addressToSelect)) {
                    $listItem.click();
                }
        });

        // Click continue button
        cy.get('button#addrBtn', {timeout: 10000}).click();

        // Select if you are an owner or renter of the property
        const ownerOrRenter = 'Owner';
        cy.get('sui-radio-option span', {timeout: 10000}).each(($buttonName) => {
            if($buttonName.text().includes(ownerOrRenter)) {
                $buttonName.parent('button').click();
            }
        });

        // Wait for Checkout details page to load
        const expectedPageHeading = 'Details';
        cy.get('div#checkout-progress-bar-subheading h3', {timeout: 10000}).as('pageHeading');
        cy.get('@pageHeading').then($ele => {
            const actualPageHeading = $ele.text();
            expect(actualPageHeading).equal(expectedPageHeading);
        });

        // Validate connection address
        const expectedConnectionAddressHeading = 'Connection address';
        cy.get('#connection-details-address-title', {timeout: 10000}).then($element => {
            const actualConnectionAddressHeading = $element.text().trim();
            expect(expectedConnectionAddressHeading).equal(actualConnectionAddressHeading);
        });

        const expectedConnectionAddressValue = '42 Brownlow Dr POINT COOK VIC 3030';
        cy.get('#connection-details-address', {timeout: 10000}).then($element => {
            const actualConnectionAddressValue = $element.text().trim();
            expect(expectedConnectionAddressValue).eq(actualConnectionAddressValue);
        });

        // Enter details in About me section
        cy.get('#edit-title-mr').click({force: true});
        cy.get('#firstname').type('test');
        cy.get('#lastname').type('test');
        cy.get('#dob').type('01/01/1990');

        // Enter details in contact details section
        cy.get('#email').type('test@gmail.com');
        cy.get('#phone').type('0444444444')
        cy.get('#edit-mailingmethod-connection-address')
            .check({force: true})
            .should('be.checked');

        // Enter details in identification section (Medicare)
        cy.get('#edit-id-type-medicare').click({force: true});
        const cardToSelect = 'blue';
        const cardSelector = `#edit-medicare-cards-${cardToSelect}`;
        cy.get(cardSelector).click({force: true}).should('be.checked');
        cy.get('#medicare-card-number').type('1234567890');
        cy.get('#medicare-reference-number').type('1');
        cy.get('#medicare-expiry').type('12/12/30');

        // Enter details in billing preference section (select 'post' option for bills)
        cy.get('#edit-bill-delivery-post').check({force: true}).should('be.checked');

        // Enter details in Solar power section
        cy.get('#edit--flat').check({force: true});

        // Click on 'Review your order' button
        cy.get('button#reviewAgreeConfirmButton').click();

        // Wait for checkout review page to open
        cy.get('#checkout-progress-bar-subheading h3', {timeout: 10000}).should('have.text', 'Review your details');

        // Select No for life support
        cy.get('#edit-life-support-required-no__label').click();

        // Assert that the carbon-neutral checkbox is not checked
        cy.get('#carbonNeutralOptIn').should('not.be.checked');

        // Assert that the Agree and confirm button is visible and clickable
        cy.get('#reviewAgreeConfirmButton')
            .should('be.visible')
            .and('have.text', 'Agree and confirm');

    });
});