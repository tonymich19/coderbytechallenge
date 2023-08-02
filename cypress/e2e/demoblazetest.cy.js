/// <reference types='cypress' />
import HomePage from '../pages/home-page'
import SignUpPage from '../pages/signup-page'
import LoginPage from '../pages/login-page'
import ProductPage from '../pages/product-page'
import CartPage from '../pages/cart-page'
import PlaceOrderPage from '../pages/place-order-page'
import Utils from '../support/utils'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('demoblaze challenge', () => {

    let orderdata;
    beforeEach('visit demoblaze.com', () => {

        //Go to https://www.demoblaze.com/
        cy.visit('/');
        cy.fixture('orderdata').then((data) => { 
            
            orderdata = data;

        }); 

    });

    //generate new user
    const usernametc1 = 'username' + Utils.generateRandomNumber();
    const passwordtc1 = 'password' + Utils.generateRandomNumber();

    const username = 'username';
    const password = 'password';


    it('Test 1', () => {

        const invaliduser = 'wrongusern';
        const invalidpsw = 'wrongpssw';

        //Sign Up as a new user
        HomePage.clickOnSignUpLink(0);
        cy.wait(500);
        SignUpPage.enterUsername(usernametc1);
        SignUpPage.enterPassword(passwordtc1);
        SignUpPage.clickOnSignUPBtn();
        SignUpPage.clickOnSignUpCloseBtn();

        //Log in
        HomePage.clickOnSignInLink();
        cy.wait(500);
        LoginPage.enterUsername(usernametc1);
        LoginPage.enterPassword(passwordtc1);
        LoginPage.clickOnLoginBtn();

        //Log out
        HomePage.clickOnLogoutLink();

        //Try logging in with invalid user 
        HomePage.clickOnSignInLink();
        cy.wait(500);
        LoginPage.enterUsername(invaliduser);
        LoginPage.enterPassword(invalidpsw);

        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert');
        });
        LoginPage.clickOnLoginBtn();
        cy.get('@alert').should('have.been.calledOnceWith', 'User does not exist.');

    });

    it('Test 2', () => {

        //Log in
        HomePage.clickOnSignInLink()
        cy.wait(500);
        LoginPage.enterUsername(username);
        LoginPage.enterPassword(password);
        LoginPage.clickOnLoginBtn();

        //Go to Phones
        HomePage.clickOnPhonesCategory();

        //Click on Any phone
        HomePage.clickOnARandomPhone();

        //Add to cart
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert');
        });
        ProductPage.clickOnAddToCartBtn();
        cy.get('@alert').should('have.been.calledOnceWith', 'Product added.');

        //Go to another phone and add it to cart
        HomePage.clickOnHomePageLink();
        HomePage.clickOnPhonesCategory();
        HomePage.clickOnARandomPhone();
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert');
        });
        ProductPage.clickOnAddToCartBtn();
        cy.get('@alert').should('have.been.calledOnceWith', 'Product added.')

        //Go to cart and remove one item
        HomePage.clickOnCartPageLink();
        cy.wait(500);
        CartPage.removeRandomProductFromCart();
        cy.wait(500);

        //Place order and populate modal
        CartPage.clickOnPlaceOrderBtn();
        PlaceOrderPage.enterName(orderdata.name);
        PlaceOrderPage.enterCountry(orderdata.country);
        PlaceOrderPage.enterCity(orderdata.city);
        PlaceOrderPage.enterCreditCard(orderdata.creditcard);
        PlaceOrderPage.enterMonth(orderdata.month);
        PlaceOrderPage.enterYear(orderdata.year);
        PlaceOrderPage.clickOnPurchaseBtn();
        cy.get('.sweet-alert > h2').should('be.visible')
            .and('contain.text', 'Thank you for your purchase!');

    });

    it('Test 3', () => {

        //Log in
        HomePage.clickOnSignInLink();
        cy.wait(500);
        LoginPage.enterUsername(username);
        LoginPage.enterPassword(password);
        LoginPage.clickOnLoginBtn();

        //Go to Phones
        HomePage.clickOnPhonesCategory();

        //Click on Any phone
        HomePage.clickOnARandomPhone();
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert');
        });

        //Add to cart
        ProductPage.clickOnAddToCartBtn();
        cy.get('@alert').should('have.been.calledOnceWith', 'Product added.');

        //Go to another phone and add it to cart
        HomePage.clickOnHomePageLink();
        HomePage.clickOnPhonesCategory();
        HomePage.clickOnARandomPhone();
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alert');
        });
        ProductPage.clickOnAddToCartBtn();
        cy.get('@alert').should('have.been.calledOnceWith', 'Product added.');

        //Go to cart and remove one item
        HomePage.clickOnCartPageLink();
        cy.wait(500);
        CartPage.removeRandomProductFromCart();
        cy.wait(500);

        //Place order and populate modal
        CartPage.clickOnPlaceOrderBtn();
        PlaceOrderPage.enterName(orderdata.name);
        PlaceOrderPage.enterCountry(orderdata.country);
        PlaceOrderPage.enterCity(orderdata.city);
        PlaceOrderPage.enterCreditCard(orderdata.creditcard);
        PlaceOrderPage.enterMonth(orderdata.month);
        PlaceOrderPage.enterYear(orderdata.year);
        PlaceOrderPage.clickOnPurchaseBtn();

        //Validate charged information is correct as well as other info in confirmation popup
        cy.get('.sweet-alert > h2').should('be.visible')
            .and('contain.text', 'Thank you for your purchase!');

        PlaceOrderPage.elements.orderInfo()
                                .should('contain', 'Card Number: ' + orderdata.creditcard)
                                .and('contain', 'Name: ' + orderdata.name);

    });

    it('Test 4', () => {

        //Log in
        //Go to main categories level page (category tab on left)
        //Now go to each sub-category level
        //Validate that main category level page contains all items from subcategories
        HomePage.validateThatAllMainCategoryContainsAllProducts();

    });
})

