describe('User Authentication fail', () => {
    it('User can not log in with invalid password', () => {

      cy.intercept('POST', '/api/auth/login').as('loginRequest');
    
      cy.visit('http://localhost:4000/#/login'); 
      cy.get('input[name="email"]').type('teste@teste.com');
      cy.get('input[name="password"]').type('000');
      cy.get('button').contains('Sign in').click();
  
      cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(401); 
      });
    });
  });