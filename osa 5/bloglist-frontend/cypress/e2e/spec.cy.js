describe('Blog app', () => {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/tests/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Log in to application')
    //cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

})