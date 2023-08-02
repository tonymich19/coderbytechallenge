class PlaceOrderPage {

    elements = {
        
        nameField : () => cy.get('#name'),
        countryField : () => cy.get('#country'),
        cityField : () => cy.get('#city'),
        creditCardField : () => cy.get('#card'),
        monthField : () => cy.get('#month'),
        yearField : () => cy.get('#year'),
        puchaseBtn : () => cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary'),
        orderInfo : () => cy.get('.lead'),

    }

    clickOnPurchaseBtn() {

        return this.elements.puchaseBtn()
                                .click();
    }

    enterYear(year) {
        
        return this.elements.yearField()
                                .click()
                                .type(year, { force : true });

    }

    enterMonth(month) {
        
        return this.elements.monthField()
                                .click()
                                .type(month, { force : true });

    }

    enterCreditCard(creditCard) {
        
        return this.elements.creditCardField()
                                .click()
                                .type(creditCard, { force : true });

    }

    enterCity(city) {
        
        return this.elements.cityField()
                                .click()
                                .type(city, { force : true });

    }

    enterCountry(country) {
        
        return this.elements.countryField()
                                .click()
                                .type(country, { force : true });

    }

    enterName(name) {
        
        return this.elements.nameField()
                                .click()
                                .type(name, { force : true });


    }

}
module.exports = new PlaceOrderPage();