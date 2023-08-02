class LoginPage {

    elements = {

        usernameField : () => cy.get('#loginusername'),
        passwordField : () => cy.get('#loginpassword'),
        logInBtn : () => cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary'),

    }

    enterUsername(username) {
        
        return this.elements.usernameField()
                                .type(username);

    };


    enterPassword(password) {
        
        return this.elements.passwordField()
                                .type(password);

    };

    clickOnLoginBtn() {

        return this.elements.logInBtn()
                                .click();

    };


}
module.exports = new LoginPage();