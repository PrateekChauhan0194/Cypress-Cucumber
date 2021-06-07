describe('This test is to see the network interception concept', () => {

    it('EA post login error', () => {
        cy.intercept({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/Accounts/14/LiveBalances'
        }, {
            statusCode: 200,
            body: {
                "oia":null,
                "pendingPayments":0.0,
                "lastBill":null,
                "unbilledCharges":0.0,
                "estimatedCharges":0.0,
                "standingCharges":66.68,
                "discountCharges":0.0,
                "cclCharges":0.0,
                "heldCharges":0.0,
                "total":{
                    "gross":73.35,
                    "net":66.68,
                    "tax":6.67,
                    "taxDetails":[
                        {
                            "net":66.68,
                            "tax":6.67,
                            "description":"GST at 10%",
                            "Gross":73.35
                        }
                    ]
                },
                "lastUpdated":"2021-06-07T17:59:42.228+10:00",
                "newTransactions":-30.00,
                "currentBalance":43.35,
                "balance":200000,
                "lastTransactionBalance":200000
            }
        }).as('differentBalanceData');

        // cy.intercept({
        //     method: 'GET',
        //     url: 'http://localhost:3000/api/v1/Accounts/14/LiveBalances'
        // }, {
        //     statusCode: 500
        // }).as('failedBalanceCall');

        cy.visit('http://localhost:4200/overview');
        localStorage.setItem('auth-token', window.btoa('DualFuel_ThreeBnP'));
        cy.visit('http://localhost:4200/overview');
        cy.wait('@differentBalanceData');
    });

});