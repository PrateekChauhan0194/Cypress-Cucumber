import HomePage from '../../support/pageObjects/HomePage';
import Shop from '../../support/pageObjects/Shop';

const homePage = new HomePage();
const shopPage = new Shop();

describe('Angular Practice [Using POM ', () => {
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
        homePage.enterName(testData.name);
        homePage.getDataBindingName().should('have.value', testData.name);
    });

    it('Validate the min length attr of name textfield', () => {
        homePage.getNameTextField().each($ele => {
            const minLength = $ele.attr('minlength');
            expect(testData.expectedMinLength).equal(minLength);
        });
        homePage.getNameTextField()
            .should('have.attr', 'minlength', testData.expectedMinLength);
    });

    it('Validate if an element (radiobutton) is disabled', () => {
        homePage.getRbEntrepreneur().each($ele => {
            const attrDisabled = $ele.attr('disabled');
            expect('disabled').equal(attrDisabled);
        });
        homePage.getRbEntrepreneur().should('have.attr', 'disabled');
        homePage.getRbEntrepreneur().should('be.disabled');
    });

    it('Add Element to cart', async () => {
        /**
         * Cypress.config('<<property-name>>', '<<value>>');
         * This command is used to override the default value of the property defined in the cypress config file.
         * The scope of this overridden value is for the entire test/spec js file.
         * This takes into effect from the line where it is defined. And statement above this statement would still use the previously defined value (or default value, whatever is applicable).
         */
        Cypress.config('defaultCommandTimeout', 10000);

        /**
         * Cypress.config('<<property-name>>');
         * This command returns the value of that property defined in the cypress configuration file
         * If you have not defined that in the cypress configuration file, then it will return a default value.
         */
        cy.log(Cypress.config('defaultCommandTimeout').toString());
        console.log(Cypress.config('defaultCommandTimeout').toString());

        /**
         * Another way to define a timeout is by defining it in the options parameter of a function.
         * Ex: cy.get('#first-name', {timeout: 10000});
         */

        homePage.clickLinkShop();
        cy.selectProduct('iphone X');
        shopPage.selectProduct('Blackberry');

        Cypress.config('defaultCommandTimeout', 20000);
        console.log(Cypress.config('defaultCommandTimeout').toString());

    });

    it('Selecting the given products through json (multiple parameters using each)', async () => {
        homePage.clickLinkShop();
        testData.productsToSelect.forEach(value => {
            cy.selectProduct(value);
        });
    });

    it('Validate the total cart amount', () => {
        homePage.clickLinkShop();
        shopPage.selectProduct('iphone X');
        shopPage.selectProduct('Nokia Edge');
        shopPage.openCart();

        let expectedTotalAmount = 0;
        shopPage.getElementItemAmounts().each((itemAmount, index, list) => {
            const curItemAmount = parseInt(itemAmount.text().match(/\d+/).toString());
            expectedTotalAmount += curItemAmount;
        }).then(() => {
            cy.log(`expectedTotalAmount: ${expectedTotalAmount}`);
        });

        shopPage.getElementTotalAmount().then((element) => {
            const actualTotalAmount = Number(element.text().match(/\d+/).toString());
            expect(actualTotalAmount).equal(expectedTotalAmount);
        });
    });

//     export function checkIfEleExists(ele){
//         return new Promise((resolve,reject)=>{
//             /// here if  ele exists or not
//             cy.get('body').find( ele ).its('length').then(res=>{
//                 if(res > 0){
//                     //// do task that you want to perform
//                     cy.get(ele).select('100').wait(2000);
//                     resolve();
//                 }else{
//                     reject();
//                 }
//             });
//         })
//     }
//
//
// // here check if select[aria-label="rows per page"] exists
//     cy.checkIfEleExists('select[aria-label="rows per page"]')
//         .then(e=>{
//             //// now do what if that element is in ,,..
//         })
//         .catch(e=>{
//             ////// if not exists...
//         })

});