const users = require("../fixtures/users.json");
const loginPage = require("../fixtures/pages/loginPage.json");
const profilePage = require("../fixtures/pages/profilePage.json");

describe("Authorization", () => {
  beforeEach(() => {
    cy.visit("/ru/auth/login");
  });

  it("Authorization with valid values", () => {
    cy.login(users.mainUser.name, users.mainUser.password);
    cy.get(profilePage.profileSettingsButton).should("be.visible");
  });

  it("Authorization with short password", () => {
    cy.login(users.userWithShortPassword.name, users.userWithShortPassword.password);
    cy.get(loginPage.errorMessage).should("be.visible");
  });

  it("Authorization with wrong data", () => {
    cy.login(users.userWithWrongName.name, users.userWithWrongName.password);
    cy.get(loginPage.errorMessage).should("be.visible");
  });
});
