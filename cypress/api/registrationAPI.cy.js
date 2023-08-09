import { faker } from "@faker-js/faker";
const users = require("../fixtures/users.json");
let userName = faker.string.alpha(6).substring(0, 6);
const serverDomain = "ao5jzr45.mailosaur.net";
const emailAddress = userName + "@" + serverDomain;
const password = users.mainUserForRegistration.password;

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
})