import { faker } from "@faker-js/faker";
let userEmail = faker.internet.email();
let userName = faker.internet.userName();
describe("Registration", () => {
    it("Registration with valid values", () => { 
    cy.request({
      method: "POST",
      url: "https://calypso-one.vercel.app/auth/registration",
      body: {         
        "email": userEmail,
        "login": userName,
        "password": "123456"},
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
})
