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
 /*
  it('Login form is shown', () => {
    cy.contains('Log in to application')    
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {

      const username = {
        username: "root",
        password: "asd"
      }

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

      cy.get('#username').type(username.username)
      cy.get('#password').type(username.password)
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })


  describe('when logged in', function() {

    beforeEach(function() {

      const username = {
        username: "root",
        password: "asd"
      }

      cy.contains('login').click()
      cy.get('#username').type(username.username)
      cy.get('#password').type(username.password)
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('Add a blog...').click()
      cy.get('#title').type('This-is-title')
      cy.get('#author').type('Det-har-ar-author')
      cy.get('#url').type('Taa-on-URL')
      cy.contains('save').click()
      cy.contains('This-is-title')
    })
  })
  */

  describe('manipulate blogs', function() {

    beforeEach(function() {

      const username = {
        username: "root",
        password: "asd"
      }

      cy.get('#username').type(username.username)
      cy.get('#password').type(username.password)
      cy.get('#login-button').click()

      cy.contains('Add a blog...').click()
      cy.get('#title').type('This-is-title')
      cy.get('#author').type('Det-har-ar-author')
      cy.get('#url').type('Taa-on-URL')
      cy.get('#submit').click()

    })

    it('blogs can be liked', function() {
      cy.contains('This-is-title').contains('Näytä').click()
      cy.contains('Like').click()
    })
    
  })

})