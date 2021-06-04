describe('My First Test Suite', function() {
    beforeEach('Navigate to the test page', function () {
        /**
         * Navigating to a specific URL
         */
        cy.visit('https://rahulshettyacademy.com/seleniumPractise');
    });

    it('Validate Number of visible elements matching the search string', () => {
        /**
         * 1. Using 'get' method to find the web element by passing a css selector.
         * 2. Using 'type' method to type text in a textfield
         */
        cy.get('.search-keyword').type('ca');

        /**
         * Hard wait provided by cypress test controller using 'wait' method
         */
        cy.wait(500);

        /**
         * 1. Using 'should' method to using chainer 'have length' to validate the
         * number of elements available matching the passed css selector in get method.
         *
         * 2. Using ':visible' to only get the elements that are visible.
         */
        cy.get('.product:visible').should('have.length', 4);

        /**
         * Using dynamic smart css selectors to find the elements withing a specific block
         */
        cy.get('div.products-wrapper div.product').should('have.length', 4);

        /**
         * Web element chaining using the 'find' method.
         */
        cy.get('div.products-wrapper').find('div.product').should('have.length', 4);
    });

    it('Click third ADD TO CARD button', () => {
        cy.get('.search-keyword').type('ca');
        cy.wait(500);
        /**
         * 1. Using 'eq' method to get the element present at a specific index out of the identified ones.
         * 2. Using 'contains' method to identify an element with a specific text.
         * 3. Using 'click' methods to click on the identified element
         */
        cy.get('div.products-wrapper').find('div.product').eq(2).contains('ADD TO CART').click();

        /**
         * Following statement will cause an error because 'click' method can only be called on a single element by default.
         */
        // cy.get('div.products-wrapper').find('div.product').click();
    });

    // it('Clicking on all the available add to cart buttons', () => {
    //     cy.get('.search-keyword').type('ca');
    //     cy.wait(1000);
    //
    //     /**
    //      * Using multiple options of click method to click on all the identified web elements
    //      */
    //     cy.get('div.products-wrapper').find('div.product').click({ multiple: true });
    // });

    it(`Iterating through the elements and clicking on the add to cart button of 'Cashews'`, () => {
        cy.get('.search-keyword').type('ca');
        cy.wait(500);

        /**
         * 1. Iterating through the elements matching the given css selector using 'each' method.
         * 2. Using the 'text' method to fetch the text of an element.
         */
        cy.get('div.products-wrapper').find('div.product').each(($ele) => {
            const productName = $ele.find('h4.product-name').text();
            if(productName.includes('Cashews')) {
                $ele.find('button').click();
            }
        });
    });

    it('Saving web element in a variable', () => {
        /**
         * Following code will not work because `text` is a JQuery method which needs the promise to be resolved.
         * Which means, we need to handle the promise explicitly.
         */
        // const logo = cy.get('.brand');
        // cy.log(logo.text());

        /**
         * Storing an element in a const variable
         * @type {Cypress.Chainable<JQuery<HTMLElement>>}
         */
        const logo = cy.get('.brand');
        logo.click();

        /**
         * Handling the promise explicitly using 'then' and passing the identified element in the arrow function.
         */
        cy.get('.brand').then( ($logo) => {
            const btnText = $logo.text();
            cy.log(btnText);
        });
    });

    it('Using alias', () => {
        /**
         * 1. Using 'as' keyword to create alias of an identified element.
         * 2. Accessing the created alias using format '@<alias-name>'
         */
        cy.get('.brand').as('brandLogo');
        cy.get('@brandLogo').then(($ele) => {
            cy.log($ele.text());
        });
    });

    it('Text assertion', () => {
        cy.get('.brand').should('have.text', 'GREENKART');
    });


});