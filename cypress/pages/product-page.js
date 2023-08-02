class ProductPage {

    elements = {

        addToCartBtn : () => cy.get('.col-sm-12 > .btn'),

    }

    clickOnAddToCartBtn(){

        return this.elements.addToCartBtn()
                                .click();

    }

}
module.exports = new ProductPage()