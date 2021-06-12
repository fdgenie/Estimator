/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

// Use `cy.dataCy` custom command for more robust tests
// See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements

// ** This file is an example of how to write Cypress tests, you can safely delete it **

// This test will pass when run against a clean Quasar project
describe("Vessel ETA Dialog", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("render vessel eta dialog", () => {
    cy.get("body").then(body => {
      if (body.find(".q-table > .q-table__bottom--nodata").length > 1) {
        Cypress.runner.stop();
      } else {
        cy.get(
          ":nth-child(1) > .text-right > .q-btn > .q-btn__wrapper > .q-btn__content > .mdi"
        )
          .click()
          .get(".q-item")
          .contains("Get vessel ETA")
          .click();
        cy.get(".q-dialog__title").contains("ETA Alert");
      }
    });
  });
});
