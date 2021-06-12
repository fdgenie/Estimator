/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

// Use `cy.dataCy` custom command for more robust tests
// See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements

// ** This file is an example of how to write Cypress tests, you can safely delete it **

// This test will pass when run against a clean Quasar project
describe("Create Shipment Dialog", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.get(".q-btn")
      .contains("Add Shipment")
      .click();
  });

  it("render shipment dialog", () => {
    cy.get(".q-toolbar__title").contains("Create Shipment");
  });

  it("Validation on fields Customer", () => {
    cy.get(
      ".q-gutter-md > .q-select > .q-field__inner > .q-field__control > .q-field__append > .q-select__dropdown-icon"
    )
      .click()
      .get(".q-item")
      .contains("CMA-CGM-CONCORDE")
      .click();
    cy.get("[aria-label='Shipment Eta']").type("2021-07-21");
    cy.get(".q-btn")
      .contains("Create")
      .click();
    cy.get(".q-field__messages").contains("Field is required");
  });

  it("Validation on fields Vessel", () => {
    cy.get("[aria-label='Customer']").type("Test Customer 1");
    cy.get("[aria-label='Shipment Eta']").type("2021-07-21");
    cy.get(".q-btn")
      .contains("Create")
      .click();
    cy.get(".q-field__messages").contains("Field is required");
  });

  it("Validation on fields Shipment ETA", () => {
    cy.get("[aria-label='Customer']").type("Test Customer 1");
    cy.get(
      ".q-gutter-md > .q-select > .q-field__inner > .q-field__control > .q-field__append > .q-select__dropdown-icon"
    )
      .click()
      .get(".q-item")
      .contains("CMA-CGM-CONCORDE")
      .click();
    cy.get(".q-btn")
      .contains("Create")
      .click();
    cy.get(".q-field__messages").contains("Field is required");
  });

  it("invalid date on fields Shipment ETA", () => {
    cy.get("[aria-label='Customer']").type("Test Customer 1");
    cy.get(
      ".q-gutter-md > .q-select > .q-field__inner > .q-field__control > .q-field__append > .q-select__dropdown-icon"
    )
      .click()
      .get(".q-item")
      .contains("CMA-CGM-CONCORDE")
      .click();
    cy.get(".q-btn")
      .contains("Create")
      .click();
    cy.get("[aria-label='Shipment Eta']").type("invalid");
    cy.get(".q-field__messages").contains("Date is invalid");
  });

  it("Create new shipment", () => {
    cy.get("[aria-label='Customer']").type("Test Customer 1");
    cy.get(
      ".q-gutter-md > .q-select > .q-field__inner > .q-field__control > .q-field__append > .q-select__dropdown-icon"
    )
      .click()
      .get(".q-item")
      .contains("CMA-CGM-CONCORDE")
      .click();
    cy.get("[aria-label='Shipment Eta']").type("2021-07-21");
    cy.get(".q-btn")
      .contains("Create")
      .click();
  });
});

describe("Create Shipment Dialog", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Update new shipment", () => {
    cy.get(
      ":nth-child(1) > .text-right > .q-btn > .q-btn__wrapper > .q-btn__content > .mdi"
    )
      .click()
      .get(".q-item")
      .contains("Update Shipment ETA")
      .click();

    cy.get("[aria-label='Shipment Eta']").clear().type("2021-07-22");
    cy.get(".q-btn")
      .contains("Edit")
      .click();
  });
});
