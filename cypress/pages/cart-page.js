class CartPage {
    
    elements = { 

        removeFromCartLink : () => cy.get('.success > :nth-child(4) > a'),
        placeOrderBtn : () => cy.get('.col-lg-1 > .btn'),

    }

    clickOnPlaceOrderBtn() {

        return this.elements.placeOrderBtn()
                                .click();

    }

    removeRandomProductFromCart() {

        return this.elements.removeFromCartLink()
                                .should('have.length.greaterThan', 0 )
                                .its('length')
                                .then((n) => Cypress._.random( 0, n - 1))
                                .then((i) => {
                                    this.elements.removeFromCartLink()
                                    .eq(i)
                                    .click()
                                })

    }


}
module.exports = new CartPage();