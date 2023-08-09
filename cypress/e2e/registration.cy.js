import { faker } from "@faker-js/faker";
const loginPage = require("../fixtures/pages/loginPage.json");
const profilePage = require("../fixtures/pages/profilePage.json");
const registration = require("../fixtures/pages/registration.json");
const users = require("../fixtures/users.json");
const mailServer = require("../fixtures/mailServer.json");

let userName = faker.string.alpha(6).substring(0, 6);
let password = users.mainUserForRegistration.password;
const emailAddress = userName + "@" + mailServer.serverDomain;

describe("Registration", () => {
  require("cypress-mailosaur");


  beforeEach(() => {
    cy.visit("/ru/auth/registration");
  });

  it.only("Registration with valid values", () => {
    cy.registration(userName, emailAddress, password)
    cy.get(registration.emailSentConfirmation).should("be.visible").click();
    cy.getMessageAndFollowingLink(mailServer.serverId, emailAddress)
  });
  it('Rigistration with short user name', () => {
    let shortUserName = faker.string.alpha(5).substring(0, 5);
    cy.registration(shortUserName, emailAddress, password)
    cy.get(registration.errorMessage).should("be.visible");
  });
  it('Rigistration with wrong email', () => {
    let wrongEmail = faker.internet.domainName()
    cy.registration(userName, wrongEmail, password)
    cy.get(registration.errorMessage).should("be.visible");
  });
  it('Rigistration with short password', () => {
    let shortPassword = users.userWithShortPassword.password;
    cy.registration(userName, emailAddress, shortPassword)
    cy.get(registration.errorMessage).should("be.visible");
  });
});

describe("Login after registration", () => {
  beforeEach(() => {
    cy.visit("/ru/auth/login");
  });
  it("New user login ", () => {
    cy.login(userName, password);
    cy.get(profilePage.nameField).should((username) => {
      expect(username).to.have.value(userName);
    });
  });
  });
