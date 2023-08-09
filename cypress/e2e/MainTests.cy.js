import { faker } from "@faker-js/faker";
const loginPage = require("../fixtures/pages/loginPage.json");
const profilePage = require("../fixtures/pages/profilePage.json");
const registration = require("../fixtures/pages/registration.json");
const users = require("../fixtures/users.json");

let userName = faker.string.alpha(6).substring(0, 6);
let password = users.mainUserForRegistration.password;

describe("Registration", () => {
  const serverId = "ao5jzr45";
  const serverDomain = "ao5jzr45.mailosaur.net";
  require("cypress-mailosaur");
  const emailAddress = userName + "@" + serverDomain;
  const password = users.mainUserForRegistration.password;
  let passwordConfirmationLink;

  it("Registration with valid values", () => {
    cy.visit("/ru/auth/registration");
    cy.get(registration.nameField).type(userName);
    cy.get(registration.emailField).type(emailAddress);
    cy.get(registration.passwordField).type(password);
    cy.get(registration.passwordConfirationField).type(password);
    cy.get(registration.registrationButton).click({ force: true });

    cy.get(registration.emailSentConfirmation).should("be.visible").click();

    cy.mailosaurGetMessage(serverId, {
      sentTo: emailAddress,
    }).then((email) => {
      cy.log(email.subject);
      const emailLink = email.html.links[0].href;
      passwordConfirmationLink = emailLink;
      cy.log(passwordConfirmationLink);
      cy.visit(passwordConfirmationLink).wait(500);
    });
  });
});

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/ru/auth/login");
  });

  it("New user login ", () => {
    cy.login(userName, password);
    cy.get(profilePage.nameField).should((username) => {
      expect(username).to.have.value(userName);
    });
  });
    it("Authorization with short password", () => {
      cy.login(
        users.userWithShortPassword.name,
        users.userWithShortPassword.password
      );
      cy.get(loginPage.errorMessage).should("be.visible");
    });
    it("Authorization with wrong data", () => {
      cy.login(users.userWithWrongName.name, users.userWithWrongName.password);
      cy.get(loginPage.errorMessage).should("be.visible");
    });
  });
