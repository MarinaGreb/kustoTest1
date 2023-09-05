// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-mailosaur";

const loginPage = require("../fixtures/pages/loginPage.json");
const registration = require("../fixtures/pages/registration.json");

Cypress.Commands.add("login", (userName, password) => {
  cy.get(loginPage.loginField).type(userName);
  cy.get(loginPage.loginField).should('have.value', userName);
  cy.get(loginPage.passwordField).type(password);
  cy.get(loginPage.loginButton).click({ force: true });
});

Cypress.Commands.add("registration", (userName, emailAddress, password) => {
  cy.get(registration.nameField).type(userName);
  cy.get(registration.emailField).type(emailAddress);
  cy.get(registration.passwordField).type(password);
  cy.get(registration.passwordConfirationField).type(password);
  cy.get(registration.registrationButton).click({ force: true });
});

Cypress.Commands.add("getMessageAndFollowingLink", (serverId, emailAddress) => {
  cy.mailosaurGetMessage(serverId, {
    sentTo: emailAddress,
  }).then((email) => {
    cy.log(email.subject);
    const emailLink = email.html.links[0].href;
    let passwordConfirmationLink = emailLink;
    cy.log(passwordConfirmationLink);
    cy.visit(passwordConfirmationLink).wait(500);
});
})