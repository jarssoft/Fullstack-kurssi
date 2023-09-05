describe('Blog app', () => {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/tests/reset')

    const user = {
      name: 'Yllapitäjä',
      username: 'root',
      password: 'asd'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)       

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Log in to application')    
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {

      const username = {
        username: "root",
        password: "asd"
      }

      cy.contains('login').click()
      cy.get('#username').type(username.username)
      cy.get('#password').type(username.password)
      cy.get('#login-button').click()

      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {

      const username = {
        username: "hakkeri",
        password: "lol"
      }

      cy.contains('login').click()
      cy.get('#username').type(username.username)
      cy.get('#password').type(username.password)
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })

})