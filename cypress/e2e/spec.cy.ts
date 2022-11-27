describe('session login', () => {
  const url = 'http://localhost:4200/';
  const url_with_existing_session = `${url}35c334bc-9840-4b13-a8fe-189b00f166f6`;
  const url_with_invalid_session = `${url}INVALID`;

  it('creates a new session', () => {
    cy.visit(url)

    cy.get('app-start-screen')
      .should('not.have.class', 'entered')
      .click().then(($cntx) => {

        cy.wrap($cntx).should('have.class', 'entered')

        cy.get('div.avatar')
          .should('be.visible')
          .and('have.length.at.least', 1)
          .and('have.class', 'me')
      })
  })


  it('Creating a new session after trying to join an invalid session', () => {
    cy.visit(url_with_invalid_session)

    cy.get('app-start-screen')
      .should('not.have.class', 'entered')

    cy.get('.mat-simple-snack-bar-content')
      .should('be.visible')
      .contains('invalid session id');


    cy.get('app-start-screen').click()
      .then(($cntx) => {

      cy.wrap($cntx).should('have.class', 'entered')

      cy.get('div.avatar')
        .should('be.visible')
        .and('have.length.at.least', 1)
        .and('have.class', 'me')
    })
  })

  it('enter valid session', () => {
    cy.visit(url_with_existing_session)

    cy.get('app-start-screen')
      .should('not.have.class', 'entered')


    cy.get('.info.on')
      .should('be.visible')
      .contains('join active session as')
  })
})

