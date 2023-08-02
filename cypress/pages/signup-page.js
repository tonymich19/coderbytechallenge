class SignUpPage {

    elements = {

        usernameField : () => cy.get('#sign-username'),
        passwordField : () => cy.get('#sign-password'),
        signUpBtn : () => cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary'),
        signUpCloseBtn : () => cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-secondary'),

    }

    enterUsername(username) {

        return this.elements.usernameField()
                                .type(username);

    };

    enterPassword(password) {

        return this.elements.passwordField()
                                .type(password);

    };

    clickOnSignUPBtn() {
        
        return this.elements.signUpBtn()
                                .click();

    };

    clickOnSignUpCloseBtn() {

        return this.elements.signUpCloseBtn()
                                .click();

    };

}
module.exports = new SignUpPage();