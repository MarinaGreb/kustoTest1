import { faker } from "@faker-js/faker";
const users = require("../fixtures/users.json");
const mailServer = require("../fixtures/mailServer.json");

let userName = faker.string.alpha(6).substring(0, 6);
const password = users.mainUserForRegistration.password;
const emailAddress = userName + "@" + mailServer.serverDomain;

describe("Registration", () => {
    it("Registration with valid values", () => {
    cy.request({
      method: "POST",
      url: "https://calypso-one.vercel.app/auth/registration",
      body: {
        "email": emailAddress,
        "login": userName,
        "password": password},
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
  it('Confirmation registration', () => {
    cy.getMessageAndFollowingLink(mailServer.serverId, emailAddress)
  });
  it('Login', () => {
    cy.request({
      method: "POST",
      url: "https://calypso-one.vercel.app/auth/login",
      body: {
        "email": emailAddress,
        "password": password},
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    })
})
