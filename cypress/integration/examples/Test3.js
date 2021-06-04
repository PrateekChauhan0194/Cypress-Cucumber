import 'cypress-iframe';

describe('Automation practice', () => {
    beforeEach('Navigating to the test page', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    });

    it('Handling checkboxes', () => {
        /**
         * 1. Saving the identified checkbox in a variable
         * 2. Calling 'check' function to check the identified checkbox
         * 3. Assertions using 'should' function
         *      a. 'be' (chai library) is used to validate the behaviour/state of an element
         *      b. 'have' (chai library) is used to validate the attributes of an element
         *      c. Instead of writing multiple 'should', 'and' function can be used to have multiple assertions in a single statement.
         * 4. Calling 'uncheck' function to uncheck the identified checkbox
         * 5. Passing parameter in 'check' function to check multiple checkboxes at a time
         * @type {Cypress.Chainable<JQuery<HTMLElement>>}
         */
        const cbOption1 = cy.get('#checkBoxOption1')
        cbOption1.check();
        cbOption1.should('be.checked').and('have.value', 'option1');
        cbOption1.uncheck();
        cbOption1.should('not.be.checked');

        const checkboxes = cy.get('input[type="checkbox"]');
        checkboxes.check(['option2', 'option3']);
    });

    it('Handling static dropdowns', () => {
        /**
         * 1. Selecting a dropdown value using 'select' function.
         * @type {Cypress.Chainable<JQuery<HTMLElement>>}
         */
        const dropdown = cy.get('#dropdown-class-example');
        dropdown.select('Option2');
        dropdown.should('have.value', 'option2');
    });

    it('Handling dynamic dropdowns', () => {
        /**
         * 1. Handling dynamic dropdowns.
         * 2. Used 'timeout' option of get method to set a default timeout to wait for an element to appear.
         * 3. Used regex in 'contains' function.
         * @type {Cypress.Chainable<JQuery<HTMLElement>>}
         */
        const dropdown = cy.get('#autocomplete');
        dropdown.type('In');
        cy.get('ul#ui-id-1', {timeout: 10000}).should('be.visible');
        cy.get('ul#ui-id-1').find('li.ui-menu-item div:visible').contains(/^India$/).click();
    });

    it('Validate visibility and invisibility of elements', () => {
        /**
         * Validating the visibility and invisibility of web element
         */
        cy.get('#displayed-text').as('textField');
        cy.get('#hide-textbox').as('btnHide');
        cy.get('#show-textbox').as('btnShow');

        cy.get('@textField').should('be.visible');
        cy.get('@btnHide').click();
        cy.get('@textField').should('not.be.visible');
        cy.get('@btnShow').click();
        cy.get('@textField').should('be.visible');
    });

    it('Handling radio button', () => {
        cy.get('[value="radio2"]').check().should('be.checked');
    });

    it('Handling alerts', () => {
        /**
         * Cypress has the capability of handling the alert boxes implicitly.
         * You don't have to write any line of code to handle the alerts.
         * The moment cypress detects an alert box, it automatically clicks on it's default button.
         */
        cy.get('#alertbtn').as('btnDisplayAlertMessage');
        cy.get('#confirmbtn').as('btnDisplayConfirmMessage');

        cy.get('@btnDisplayAlertMessage').click();
        cy.get('@btnDisplayConfirmMessage').click();

        /**
         * Getting the text out of alert box.
         * To do this you need to trigger the alert explicitly and then capture the text.
         * 1. Following code creates the events which will trigger when the defined event takes place
         *      Example: First event is defined using 'on' function which is 'window:alert'.
         *          Whenever the window alert event happens in the browser, this piece of code will be executed.
         */
        cy.on('window:alert', (actualText) => {
            const expectedText = 'Hello , share this practice page and share your knowledge';
            expect(actualText).to.equal(expectedText);
            console.log(actualText);
        });

        cy.on('window:confirm', (actualText) => {
            const expectedText = 'Hello , Are you sure you want to confirm?';
            expect(actualText).to.equal(expectedText);
            console.log(actualText);
        });
    });

    it('Handling tabs', () => {
        /**
         * Cypress does not support multiple tabs.
         * The workaround to handle such situations is to force the webapp to not open a new tab.
         * To achieve this,
         *      1. You need to validate the `target` attribute's value to be '_blank', and
         *      2. Then you need to remove the `target` attribute from that link/button element, so that the new page opens in the same tab
         *          a. One way is by resolving the promise in 'then' block, --> As you are resolving the promise explicitly, you need to take care of logging as well.
         *          b. Another way is by using the 'invoke' function. --> As cypress will handle the promises, cypress will take care of the logging as well.
         */

        // Removing the attribute by resolving the promise in 'then' block
        cy.get('a#opentab').as('btnOpenTab').then(($ele) => {
            const attrToRemove = 'target';
            $ele.removeAttr(attrToRemove);
            cy.log(`'${attrToRemove}' attribute removed from '${$ele.text()}' button`)
        });

        // Removing the attribute by using 'invoke' function
        cy.get('a#opentab').as('btnOpenTab').invoke('removeAttr', 'target');

        cy.get('@btnOpenTab').click();
        cy.get('ul.clearfix .fa-envelope').parent('li').should('have.text', ' contact@rahulshettyacademy.com');
    });

    it('Browser navigation', () => {
        /**
         * Using 'go' function to navigate in the browser
         */
        cy.get('body h1').as('mainPageHeading').should('be.visible');
        cy.get('button.btn-primary').contains('Home').click();
        cy.get('div#carousel-example-generic h2').as('secondPageHeading').should('be.visible');
        cy.go('back');
        cy.get('@mainPageHeading').should('be.visible');
        cy.go('forward');
        cy.get('@secondPageHeading').should('be.visible');
    });

    it('Getting the current URL', () => {
        /**
         * 1. Using 'url' function to fetch the current URL
         * 2. Using 'include' chainer in 'should' function to validate the substring
         */
        cy.url().should('include', 'AutomationPractice/');
    });

    it('Handling tables', () => {
        /**
         * Using 'each' function to traverse through all the identified web elements
         * Scenario: Assert the price of 'Master Selenium Automation in simple Python Language' course to be equal to '25'
         *      1. Assertion using 'expect' function of chai assertion library
         *      2. Assertion using 'assert' of chai assertion library
         */

        const expectedCourseName = 'Appium (Selenium) - Mobile Automation Testing from Scratch';
        const expectedPrice = '30';

        cy.get('table#product[name="courses"]').as('productTable');
        cy.get('@productTable').find('tr').each(($row) => {
            // $row.children('td').as('data');
            const data = $row.find('td');
            const curCourseName = data.eq(1).text();
            if(curCourseName.includes(expectedCourseName)) {
                cy.log(`curCourseName: ${curCourseName}`);
                const actualPrice = data.eq(2).text();
                cy.log(`curCoursePrice: ${actualPrice}`);
                expect(actualPrice).to.eq(expectedPrice);
                expect(actualPrice).to.equal(expectedPrice);
                assert.equal(actualPrice, expectedPrice);
            }
        });
    });

    it('Performing Mouse Hover action (Interacting with hidden elements) - Type 1', () => {
        cy.get('div.mouse-hover-content').as('hoverContent');
        cy.get('@hoverContent').invoke('show');
        cy.get('@hoverContent').contains('Top').click();
        cy.url().should('contain', '/#top');
    });

    it('Performing Mouse Hover action (Interacting with hidden elements) - Type 2', () => {
        cy.get('div.mouse-hover-content').as('hoverContent');
        cy.get('@hoverContent').contains('Top').click({force: true});
        cy.url().should('contain', '/#top');
    });

    it('Handling the case of new window (Using \'attr\' jquery function', () => {
        /**
         * By default cypress does not handle multiple windows.
         * Workaround:
         *      1. Get the href 'attr' of the link that opens a new window
         *      2. Navigate to the fetched link using 'cy.visit'
         */

        cy.get('#opentab').then(($element) => {
            cy.visit($element.attr('href'));
        });
    });

    it('Handling the case of new window (Using \'prop\' jquery function', () => {
        /**
         * By default cypress does not handle multiple windows.
         * Workaround:
         *      1. Get the href 'attr' of the link that opens a new window
         *      2. Navigate to the fetched link using 'cy.visit'
         *
         * Note: You cannot visit a URL that is on another domain due to same origin policy
         */
        cy.get('#opentab').then(($element) => {
            cy.visit($element.prop('href'));
        });
    });

    it('Handling iFrames', () => {
        /**
         * To interact with the iframes in cypress, we need another npm module called 'cypress-iframe'.
         * 1. 'frameLoaded' function of cypress-iframe lib switched the test controller's focus to the iframe. It accepts the selector of the iframe.
         * 2. once the cypress test controller knows about the iframe (using 'frameLoaded()'), you can interact with the elements present with the iframe using
         *      cy.iframe()
         * 3. cy.iframe().find() can be used to find the web elements present with the iframe.
         */
        cy.get('iframe#courses-iframe').as('iframe').should('be.visible');
        cy.frameLoaded('@iframe');
        cy.iframe().find('ul.navigation li a[href*="mentorship"]:visible').click();
        cy.iframe()
            .find('div.pricing-container.platinum-color')
            .find('div.pricing-header')
            .find('h1')
            .should('have.text', 'PLATINUM');
    });

});