class Shop {

    private cardTitleSelector: string = 'h4.card-title';
    private btnCheckout: string = 'div#navbarResponsive a';
    private itemAmounts: string = 'table.table tbody tr td:nth-child(4) strong';
    private totalAmount: string = 'table.table tbody tr td[class="text-right"] h3';

    getCardTitleSelector() {
        return cy.get(this.cardTitleSelector);
    }

    getElementBtnCheckout() {
        return cy.get(this.btnCheckout);
    }

    getElementItemAmounts() {
        return cy.get(this.itemAmounts);
    }

    getElementTotalAmount() {
        return cy.get(this.totalAmount);
    }

    selectProduct(productName: string) {
        this.getCardTitleSelector().each($cardTitle => {
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

    openCart() {
        this.getElementBtnCheckout().click();
    }

    getTotalAmount() {
        return this.getElementTotalAmount().then(ele => {
           return ele.text();
        });
    }
}

export default Shop;