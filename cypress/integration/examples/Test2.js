describe('GREENKART Order e2e journey', () => {
   beforeEach('Opening the homepage', () => {
       cy.visit('https://rahulshettyacademy.com/seleniumPractise');
   });

   it('Place and order for the cashews', () => {
       // Search
       cy.get('input.search-keyword').type('ca');
       cy.wait(500);

       // Add Cashews to the cart
       cy.get('div.products-wrapper div.product').then(($products) => {
           const productName = $products.find('h4.product-name').text();
           if (productName.includes('Cashews')) {
               $products.find('button').click();
           }
       });

       // Open cart
       cy.get('a.cart-icon').click();

       // Validate the number of products in the cart and print it
       cy.get('a.cart-icon span.cart-count').should('have.text', '4');
       cy.get('a.cart-icon span.cart-count').then(($cartCount) => {
           cy.log($cartCount.text());
       });

       // Print all the available items in the cart
       cy.get('li.cart-item:visible').should('have.length', '4');
       cy.get('li.cart-item:visible').then(($cartItems) => {
           cy.log($cartItems.find('p.product-name').text());
       });

       // Click on proceed to checkout
       cy.get('.cart-preview.active').find('div.action-block').find('button[type="button"]').click();

       // Click on place order
       cy.contains('Place Order').click();
   });
});