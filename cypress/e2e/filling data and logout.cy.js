import { faker } from "@faker-js/faker";
const loginPage = require("../fixtures/pages/loginPage.json");
const profilePage = require("../fixtures/pages/profilePage.json");
const registration = require("../fixtures/pages/registration.json");
const users = require("../fixtures/users.json");
const mailServer = require("../fixtures/mailServer.json");

let userName = faker.string.alpha(6).substring(0, 6);
let password = users.mainUserForRegistration.password;
const emailAddress = userName + "@" + mailServer.serverDomain;

describe("Filling in user data", () => {
  require("cypress-mailosaur");

  it("Registration with valid values", () => {
    cy.visit("/ru/auth/registration");
    cy.registration(userName, emailAddress, password)
    cy.get(registration.emailSentConfirmation).should("be.visible").click();
    cy.getMessageAndFollowingLink(mailServer.serverId, emailAddress)
  });
  it.only("Login new user", () => {
    cy.visit("/ru/auth/login");
    cy.login("MRRkdl@egnp6xwk.mailosaur.net", password);
    cy.get(profilePage.nameField).should((username) => {
      expect(username).to.have.value("MRRkdl");
    });
  })
    it.only('Filling in user data', () => {
        cy.get(profilePage.firstNameField).type("Namena"),
        cy.get(profilePage.lastNameField).type("Lastname"),
        cy.get(profilePage.cityField).type("Gdanskree"),
        cy.get(profilePage.aboutMeField).type("Text about me"),
        cy.get(profilePage.calendar).click(),
        cy.get(profilePage.arrowForYear).click(),
        cy.get(profilePage.saveButton).click({ force: true })

      //  cy.get(profilePage.confirmationChanges).click({ force: true })

    });
    // it('Logout new User', () => {
        
    // });
  });