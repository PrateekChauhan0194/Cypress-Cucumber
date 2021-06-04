class HomePage {
    private lblName: string = 'Name';
    private tfName: string = 'input[name="name"]';
    private tfDataBindingName: string = 'h4 input[name="name"]';
    private rbEntrepreneur: string = 'input#inlineRadio3';
    private linkShop: string = 'a[href*="/shop"]';

    getNameTextField() { return cy.contains(this.lblName).siblings(this.tfName, {timeout: 10000}); }

    getDataBindingName() { return cy.get(this.tfDataBindingName, {timeout: 10000}); }

    getRbEntrepreneur() { return cy.get(this.rbEntrepreneur, {timeout: 10000}); }

    getLinkShop() { return cy.get(this.linkShop, {timeout: 10000}) }

    enterName(value) { this.getNameTextField().type(value); }

    clickLinkShop() { this.getLinkShop().click(); }

}

export default HomePage;