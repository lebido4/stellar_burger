import * as orderFixture from '../fixtures/order.json';
const testUrl = 'http://localhost:4000';
const [bun, main, sauce, order] = ['[data-cy="bun"]', '[data-cy="main"]', '[data-cy="sauce"]','[data-cy="order-button"]'];
const modals = '#modals';

describe('cypress-test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testUrl);
  });

  it('Showing ingredients', () => {
    cy.get(bun).should('have.length.at.least', 1);
    cy.get(`${main},${sauce}`).should(
      'have.length.at.least',
      1
    );
  });

  describe('Modal test', () => {
    describe('Open Modal', () => {
      it('Click on Card', () => {
        cy.get(`${bun}:first-of-type`).click();
        cy.get(`${modals}`).children().should('have.length', 2);
      });

      it('After Reload', () => {
        cy.get(`${bun}:first-of-type`).click();
        cy.reload(true);
        cy.get(`${modals}`).children().should('have.length', 2);
      });
    });

    describe('Close Modal', () => {
      it('Cross', () => {
        cy.get(`${bun}:first-of-type`).click();
        cy.get(`${modals} button:first-of-type`).click();
        cy.wait(500);
        cy.get(`${modals}`).children().should('have.length', 0);
      });

      it('Click Overlay', () => {
        cy.get(`${bun}:first-of-type`).click();
        cy.get(`${modals}>div:nth-of-type(2)`).click({ force: true });
        cy.wait(500);
        cy.get(`${modals}`).children().should('have.length', 0);
      });

      it('Press Esc', () => {
        cy.get(`${bun}:first-of-type`).click();
        cy.get('body').type('{esc}');
        cy.wait(500);
        cy.get(`${modals}`).children().should('have.length', 0);
      });
    });
  });

  describe('Testing Creating Order', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.visit(testUrl);
    });

    it('Attempt to Create an Order', () => {
      cy.get(`${order}`).should('be.disabled');
      cy.get(`${bun}:first-of-type button`).click();
      cy.get(`${order}`).should('be.disabled');
      cy.get(`${main}:first-of-type button`).click();
      cy.get(`${order}`).should('be.enabled');
      cy.get(`${order}`).click();
      cy.get(`${modals}`).children().should('have.length', 2);
      cy.get(`${modals} h2:first-of-type`).should('have.text', orderFixture.order.number);
      cy.get(`${order}`).should('be.disabled');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});