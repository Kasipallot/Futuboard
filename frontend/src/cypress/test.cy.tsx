describe('Futuboard Home Page Test', () => {
    it('should have the correct title', () => {
      // Visit the URL
      cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
  
      // Assert that the title is what you expect
     cy.get('.MuiTypography-root').should('contain', 'Futuboard home page');
 
    })
  });

  describe('Board Creation Test', () => {
    it('should open the dialog, allow entry, and submit the form', () => {
      // Replace with the correct URL
      cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
  
      // Click the "Create board" button
      cy.contains('button', 'Create board').click();
  
      cy.get('.MuiDialog-root').should('be.visible');
      // Find the input field by its label and type a name
      cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('New Board Name');
      cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('123');

      // Click the "Submit" button within the form
      cy.get('.MuiDialog-root').contains('button', 'Submit').click();
      cy.get('.MuiTypography-root').should('contain', 'Enter Board Password');
      cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('123');
      cy.get('.MuiIconButton-root').click();

    });
  })
  

