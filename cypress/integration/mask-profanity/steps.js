import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import allowedFillCharacters from '../../fixtures/fill-characters';

let baseUrl;
let format;
let profanityFillCharacter = null;

Given(/^I set the purgomalum API url variables$/, () => {
  baseUrl = Cypress.env('baseUrl');
  format = Cypress.env('format');
});

When(/^I have (.+) in content$/, (profanity) => {
  cy.request(`${baseUrl}/service/${format}?text=${profanity}`).as('output');
});

When(
  /^I replace default fill character in (\w+) with (.*)$/,
  (profanity, fillChar) => {
    profanityFillCharacter = fillChar;

    cy.request(
      `${baseUrl}/service/${format}?text=${profanity}&fill_char=${profanityFillCharacter}`
    ).as('output');
  }
);

When(/^I replace fill text in (.*) with (.*)$/, (profanity, fillText) => {
  cy.request(
    `${baseUrl}/service/${format}?text=${profanity}&fill_text=${fillText}`
  ).as('output');
});

Then(
  /^I should have (.*) with profanity masked out with asterisk$/,
  (result) => {
    cy.get('@output').should(({ body }) => {
      expect(body.result).to.eq(result);
      expect(body).to.not.have.property('error');
    });
  }
);

Then(
  /^I should have (.*) with profanity masked out with fill char$/,
  (result) => {
    if (allowedFillCharacters.includes(profanityFillCharacter)) {
      cy.get('@output').should(({ body }) => {
        expect(body.result).to.eq(result);
        expect(body).to.not.have.property('error');
      });
    } else {
      cy.get('@output').should(({ body }) => {
        expect(body.error).to.eq('Invalid User Replacement Characters');
        expect(body).to.not.have.property('result');
      });
    }

    profanityFillCharacter = null;
  }
);

Then(
  /^I should have (.*) with profanity replaced with fill text$/,
  (result) => {
    cy.get('@output').should(({ body }) => {
      expect(body.result).to.eq(result);
      expect(body).to.not.have.property('error');
    });
  }
);
