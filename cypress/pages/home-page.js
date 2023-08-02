class HomePage { 
    
    elements = {

        signUpLink : () => cy.get('#signin2'),
        signInLink : () => cy.get('#login2'),
        logoutLink : () => cy.get('#logout2'),        
        phonesCategoryLink : () => cy.get('[onclick="byCat(\'phone\')"]'),
        notebooksCategoryLink : () => cy.get('[onclick="byCat(\'notebook\')"]'),
        monitorsCategoryLink : () => cy.get('[onclick="byCat(\'monitor\')"]'),
        mainCategoryLink : () => cy.get('#cat'),
        phoneLink : () => cy.get('.card > .card-block > .card-title > .hrefch'),
        homePageLink : () =>  cy.get('.active > .nav-link'),
        cartPageLink : () => cy.get(':nth-child(4) > .nav-link'),
        productName : () => cy.get('.card-title > .hrefch'),
        nextBtn : () => cy.get('#next2'),

    };

    validateThatAllMainCategoryContainsAllProducts() {

        let subCatProducts = 0;
        let mainCatProducts = 0;
        cy.wait(1200)

        this.elements.monitorsCategoryLink()
                        .click();
        cy.wait(1200)
        
        this.elements.productName()
            .then(($value => {

                subCatProducts = $value.length

                this.elements.notebooksCategoryLink()
                                .click()
                cy.wait(1200);

                this.elements.productName()
                    .then(($value => {

                        subCatProducts = subCatProducts + $value.length
                        cy.log(subCatProducts)
                        this.elements.phonesCategoryLink()
                                        .click();
                        cy.wait(1200);

                        this.elements.productName()
                            .then(($value => {
                                subCatProducts = subCatProducts + $value.length
                                cy.log(subCatProducts)
                                this.elements.mainCategoryLink()
                                                .click();
                                cy.wait(1200);

                                this.elements.productName()
                                    .then($value => {
                                        cy.log(subCatProducts)
                                        mainCatProducts = $value.length
                                        subCatProducts = subCatProducts - mainCatProducts
                                        this.elements.nextBtn()
                                                        .click()
                                        cy.wait(1200);

                                        this.elements.productName()
                                            .then(($value) => {
                                            mainCatProducts = $value.length
                                            cy.log(subCatProducts)

                                            cy.wait(1200);
                                            subCatProducts = subCatProducts - mainCatProducts
                                            cy.log(subCatProducts)
                                            expect(subCatProducts).to.be.equals(0)
                                        })
                                    })                                  
                            }))
                    }))
            }))

    }

    clickOnCartPageLink() {

        return this.elements.cartPageLink()
                                .click();

    }

    clickOnARandomPhone() {

        return this.elements.phoneLink()
                                .should('have.length.greaterThan', 0 )
                                .its('length')
                                .then((n) => Cypress._.random( 0, n - 1))
                                .then((i) => {
                                    this.elements.phoneLink()
                                    .eq(i)
                                    .click()
                                })

    }
    clickOnHomePageLink() {

        return this.elements.homePageLink()
                                .click();

    }

    clickOnPhonesCategory() {

        return this.elements.phonesCategoryLink()
                                .click();

    }

    clickOnLogoutLink() {

        return this.elements.logoutLink()
                                .click();

    }

    clickOnSignUpLink() {

        return this.elements.signUpLink()
                                .click();
                                
    };

    clickOnSignInLink() {

        return this.elements.signInLink()
                                .click();

    };
    

}
module.exports = new HomePage();