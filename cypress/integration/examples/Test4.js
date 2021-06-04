import HomePage from '../../support/pageObjects/HomePage';

const homePage = new HomePage();

describe('Angular Practice', () => {
    let selectors;
    let testData;
    let pageUrl;

    before('Setup', () => {
        cy.fixture('angularPracticeData').then((data) => {
            selectors = data.selectors;
            testData = data.data;
            pageUrl = data.url;
        });
    });

    beforeEach('Open AUT', () => {
        cy.visit(pageUrl, {timeout: 10000});
    });

    it('Validate angular two way data binding', () => {
        cy.contains('Name').siblings(selectors.tfName, {timeout: 10000}).as('tfName');
        cy.get('@tfName').type(testData.name);
        cy.get(selectors.dataBindingName).should('have.value', testData.name);
    });

    it('Validate the min length attr of name textfield', () => {
        cy.contains('Name').siblings(selectors.tfName, {timeout: 10000}).as('tfName');
        cy.get('@tfName').each($ele => {
            const minLength = $ele.attr('minlength');
            expect(testData.expectedMinLength).equal(minLength);
        });
        /**
         * Using 'have.attr' chainer in should function of chai assertion library to validate the attribute of any web element
         * - It's definition is '(chainer: 'have.attr', value: string, match?: string)'
         *      - chainer is `have.attr` which means it is going to validate the attribute of the web element
         *      - value is the name of attribute you want to validate
         *      - match is an optional parameter
         *          - If not passed, then the statement will assert the existence of the passes attribute in the 'value' parameter
         *          - If passes, then the statement will assert that the passed value matches the actual value of the attribute passed in the 'value' parameter
         */
        cy.get('@tfName').should('have.attr', 'minlength', testData.expectedMinLength);
    });

    it('Validate if an element (radiobutton) is disabled', () => {
        /**
         * Validating if a given web element is disabled or not.
         *  - If an element is defined to be disabled, it will have an attribute called 'disabled'
         *  - Ex: <input type="checkbox" disabled>Sample checkbox</input>
         * To assert this, we have 3 ways.
         */

        /**
         * First way:
         *      - Identify the web element using 'get' function
         *      - Write each function and use 'attr()' function to fetch any attribute of the given web element.
         *      - Then we can use the 'expect()' function of chai assertion library to validate the returned value (returned from 'attr()' function)
         *          - should('have.attr', 'disabled') => chainer is 'have.attr' ==> attributeName is 'disabled'
         *          - This assertion will pass if the given web element has the attribute 'disabled' in the DOM
         */
        cy.get(selectors.rbEntrepreneur, {timeout: 10000}).as('rbEntrepreneur');
        cy.get('@rbEntrepreneur').each($ele => {
            const attrDisabled = $ele.attr('disabled');
            expect('disabled').equal(attrDisabled);
        })

        /**
         * Second way:
         *      - Using 'should' function of chai assertion library to validate the presence of an attribute for a given web element (In our case, presence of 'disabled' attribute)
         *      - Passing two parameters does the job
         *          - chainer = 'have.attr'
         *          - value (which is the attribute name itself) = 'disabled'
         *      - This assertion will pass if the given web element contains the attribute 'disabled'
         */
        cy.get('@rbEntrepreneur').should('have.attr', 'disabled');

        /**
         * Third way:
         *      - This is the shortest and most optimised way to validate if the element is disabled or not.
         *      - Being disabled the behaviour of a web element
         *      - To validate the behaviour of any web element, we have 'be' chainers available to be passed to the `should()` function
         *      - In our case, we will pass `be.disabled` to the 'should()' function of chai assertion library
         *          - This assertion will pass if the given web element is defined as disabled in the DOM
         */
        cy.get('@rbEntrepreneur').should('be.disabled');
    });

    it('Add Element to cart', async () => {
        /**
         * Defining reusable methods.
         *      1. One way is to define a local reusable method
         *      2. Another way is to defining a command under 'cypress/support' directory
         *          - Definition: Cypress.Commands.add(<<command/function name>>, (<<optional parameter>>) => {... <<Implementation>> ...});
         *          - This defined command is accessible globally using 'cy.<<command/function name>>()'
         */
        cy.get('a[href*="/shop"]', {timeout: 10000}).click();
        cy.selectProduct('iphone X');
        await selectPd('Blackberry');
    });

    it('Selecting the given products through json (multiple parameters using each)', () => {
        cy.get('a[href*="/shop"]', {timeout: false}).click();
        testData.productsToSelect.forEach(value => {
            cy.selectProduct(value);
        });
    });

    async function selectPd(productName) {
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
    }

});