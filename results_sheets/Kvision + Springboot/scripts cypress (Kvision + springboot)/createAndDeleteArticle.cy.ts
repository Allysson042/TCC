describe('test article creation and deletion', () => {
    before(() => {
      // Usar o comando customizado para simular autenticação
      const jwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZSIsImV4cCI6MTc0Mjg1NjA4MiwiaWF0IjoxNzQyNzY5NjgyfQ.8dD-fTtmvhZbjDNue6wxx1KUSo-01cm0EsTa150vVzw'; 
      window.localStorage.setItem('jwtToken', jwtToken);
    });
  
    it('Create article and then delete it', () => {
      const timestamp = Date.now();
      const title = `title_teste_${timestamp.toString()}`;
      const description = `description_teste_${timestamp.toString()}`;
      const body = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      const tag = `tag_teste_${timestamp.toString()}`;

      cy.intercept('POST', '/kv/routeArticleServiceManager8').as('deleteArticleRequest');

      cy.visit('http://localhost:3000/#/editor');

      cy.get('input[placeholder="Article Title"]').type(title);
      cy.get('input[placeholder="What\'s this article about?"]').type(description); 
      cy.get('textarea[placeholder="Write your article (in markdown)"]').type(body);
      cy.get('input[placeholder="Enter tags"]').type(tag);
      cy.get('button').contains('Publish Article').click();
      
      cy.get('h1').contains(title);
      

      cy.get('button').contains('Delete Article').click();
      

      cy.get('.nav-link').contains('Global Feed').click();


      cy.get('h1').contains(title).should('not.exist');
      
    });
  });