describe('test comment on articles', () => {
    before(() => {
      // Usar o comando customizado para simular autenticação
      const jwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZSIsImV4cCI6MTc0Mjk0NDQ1OSwiaWF0IjoxNzQyODU4MDU5fQ.jVEUZxK5dbA6ztZbIqw5UqFgPB4oYzRtGOVsEbe3MEY'; 
      window.localStorage.setItem('jwtToken', jwtToken);
    });
  
    it('User can creat and delete comment', () => {
      const timestamp = Date.now();

      const comment = ` - ${timestamp.toString()} test comment`

      cy.intercept('POST', '/kv/routeArticleServiceManager10').as('deleteCommentRequest');
      

      cy.visit('http://localhost:3000/#/article/article-test');

       // Espera até que o botão "Post Comment" esteja visível
      cy.contains('button', 'Post Comment').should('be.visible');

    // Espera até que o textarea esteja pronto
    cy.get('.card-block textarea.form-control[placeholder="Write a comment..."]')
      .should('exist') // Verifica se o elemento existe no DOM
      .should('be.visible') // Verifica se o elemento está visível
      .should('not.be.disabled'); // Verifica se o elemento não está desabilitado

    cy.wait(100)
    // Digita o comentário no textarea
    cy.get('.card-block textarea.form-control[placeholder="Write a comment..."]')
      .type(comment); // Adiciona um delay para garantir que a digitação seja concluída

      cy.get('button').contains('Post Comment').click();

      cy.reload() // atualiza página para o comentario aparecer

      cy.contains(timestamp);


      cy.contains('.card .card-text', comment) // Encontra o elemento com o texto
      .parents('.card') // Navega até o elemento pai com a classe .card
      .within(() => { // Limita o escopo para dentro do elemento .card
        // Localiza e clica no elemento com a classe .mod-options
        cy.get('.mod-options').click();
      });

      
      cy.wait('@deleteCommentRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(200); 
      });

      
    });
  });