describe('User Authentication and article creation', () => {
    it('User can log in and then create articles', () => {

      const timestamp = Date.now();
      const title = `title_teste_${timestamp.toString()}`;
      const description = `description_teste_${timestamp.toString()}`;
      const body = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      const tag = `tag_teste_${timestamp.toString()}`;
    
      cy.visit('http://localhost:4200/#/login'); 
      cy.get('input[placeholder="Email"]').type('teste@teste.com');
      cy.get('input[placeholder="Password"]').type('123');
      cy.get('button').contains('Sign in').click();
  
      cy.contains("teste");
      cy.wait(500);

      cy.visit('http://localhost:4200/#/editor');

      cy.get('input[placeholder="Article Title"]').type(title);
      cy.get('input[placeholder="What\'s this article about?"]').type(description); 
      cy.get('textarea[placeholder="Write your article (in markdown)"]').type(body);
      cy.get('input[placeholder="Enter tags"]').type(tag).type('{enter}');;
      cy.get('button').contains(' Publish Article ').click();
      
      cy.contains("Published successfully!");
    });
  });