/* eslint-disable no-undef */
describe("DashboardPage", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config().baseUrl}/login`);

    cy.get("body").within(() => {
      cy.get("div").should(
        "contain.text",
        "Don`t have an account? Sign up"
      );
    });

    cy.get('div')
      .find('img')
      .should('be.visible')
      .should('have.attr', 'alt')
      .should('contain', 'IPhone with Instagram app');

    cy.get("form").within(() => {
      cy.get("input:first")
        .should("have.attr", "placeholder", "Email address")
        .type("test@mail.ru")

      cy.get("input:last")
        .should("have.attr", "placeholder", "Password")
        .type("test123");

      cy.get("button")
        .should("contain.text", "Login")

      cy.get("button").click();
    });

    cy.get("div")
      .find("img")
      .should("be.visible")
      .should("have.attr", "alt")
      .should("contain", "Instagram");
  });

  it(
    "logs the user in and shows the dashboard and does basic checks around the UI",
    () => {
      cy.get("body").within(() => {
        cy.get("div")
          .should("contain.text", "test");

        cy.get("div")
          .should("contain.text", "testing");

        cy.get("div")
          .should(
            "contain.text",
            "Suggestions for you"
          );
      });
    });

  it('logs the user in and add a comment to a photo', () => {
    cy.get('[data-testid="add-comment-GADFEsvKgC3kEQ5Ttp88"]')
      .should('have.attr', 'placeholder', 'Add a comment...')
      .type('Amazing photo!');
    cy.get('[data-testid="add-comment-submit-GADFEsvKgC3kEQ5Ttp88"]').submit();
  });

  it('logs the user in and likes a photo', () => {
    cy.get('[data-testid="like-photo-GADFEsvKgC3kEQ5Ttp88"]').click();
  });

  it("logs the user in and then signs out", () => {
    cy.get(
      "[data-testid='sign-out']"
    ).click();
    cy.wait(1000);
    cy.get("div").should(
      "contain.text",
      "Don`t have an account? Sign up"
    );
  });
});