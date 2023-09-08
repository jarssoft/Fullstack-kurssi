describe('Blog app', () => {

  const rootuser = {
    name: 'Yllapitäjä',
    username: 'root',
    password: 'asd'
  }

  const otheruser = {
    name: 'Other User',
    username: 'otheruser',
    password: 'asd'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/tests/reset')

    cy.request('POST', 'http://localhost:3003/api/users/', rootuser)
    cy.request('POST', 'http://localhost:3003/api/users/', otheruser)
 
    cy.visit('http://localhost:3000')
  })

  describe('Login',function() {
      
    it('Login form is shown', () => {
      cy.contains('Log in to application')    
    })

    it('succeeds with correct credentials', function() {

      cy.get('#username').type(rootuser.username)
      cy.get('#password').type(rootuser.password)
      cy.get('#login-button').click()

      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {

      const fakeuser = {
        username: "hakkeri",
        password: "lol"
      }

      cy.get('#username').type(fakeuser.username)
      cy.get('#password').type(fakeuser.password)
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })

    it('a new blog can be created', function() {

      cy.get('#username').type(rootuser.username)
      cy.get('#password').type(rootuser.password)
      cy.get('#login-button').click()

      cy.contains('Add a blog...').click()
      cy.get('#title').type('This-is-title')
      cy.get('#author').type('Det-har-ar-author')
      cy.get('#url').type('Taa-on-URL')
      cy.contains('save').click()
      cy.contains('This-is-title')
    })

  })

  describe('manipulate blogs', function() {

    beforeEach(function() {
     
      cy.get('#username').type(rootuser.username)
      cy.get('#password').type(rootuser.password)
      cy.get('#login-button').click()

      cy.contains('Add a blog...').click()
      cy.get('#title').type('This-is-title')
      cy.get('#author').type('Det-har-ar-author')
      cy.get('#url').type('Taa-on-URL')
      cy.get('#submit').click()

      cy.contains('A new blog This-is-title by Det-har-ar-author added.')

    })

    it('blogs can be liked', function() {
      cy.contains('Näytä').click()
      cy.get('#likes').contains('0')
      cy.contains('Like').click()
      cy.get('#likes').contains('1')
    })

    it('blogs can be removed', function() {
      cy.contains('Näytä').click()
      cy.get('#likes')
      cy.contains('Poista').click()
      cy.get('#likes').should('not.exist');
    })   

    it('user that created blog can see the remove button', function() {
      
      cy.contains('Log out').click()

      cy.get('#username').type(rootuser.username)
      cy.get('#password').type(rootuser.password)
      
      cy.get('#login-button').click()
 
      cy.contains('Näytä').click()
      cy.contains('Poista');
    })

    it('other user cannot see the remove button', function() {
      
      cy.contains('Log out').click()

      cy.get('#username').type(otheruser.username)
      cy.get('#password').type(otheruser.password)
      
      cy.get('#login-button').click()
 
      cy.contains('Näytä').click()
      cy.contains('Poista').should('not.exist');
    })

    it('blogs are in right order after like', function() {

      cy.contains('Add a blog...').click()
      cy.get('#title').type('This-is-an-other-blog')
      cy.get('#author').type('Det-har-ar-olika-author')
      cy.get('#url').type('Taa-on-uusi-URL')
      cy.get('#submit').click()
  
      cy.contains('A new blog This-is-an-other-blog by Det-har-ar-olika-author added.')
  
      cy.contains('This-is-an-other-blog').contains('Näytä').click()
      cy.contains('This-is-title').contains('Näytä').click()

      cy.get('#likes').eq(0).contains('0')
      
      cy.contains('This-is-an-other-blog').contains('Like').click()
      
      cy.get('#likes').eq(0).contains('1')

      cy.contains('This-is-title').contains('Like').click()
      cy.contains('This-is-title').contains('Like').click()

      cy.get('#likes').eq(0).contains('2')

    })

  })

})