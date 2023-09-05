describe('Blog app', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
    //cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })
})