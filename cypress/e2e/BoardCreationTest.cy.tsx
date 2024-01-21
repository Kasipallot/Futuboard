describe('Futuboard Home Page Test', () => {
    it('should have the correct title', () => {
      // Visit the URL
      cy.visit('http://localhost:5173/');
  
      // Assert that the title is what you expect
     cy.get('.MuiTypography-root').should('contain', 'Futuboard home page');

    })
  });

  describe('Board Creation Test', () => {
    it('should open the dialog, allow entry, and submit the form', () => {
      // Replace with the correct URL
      cy.visit('http://localhost:5173/');
  
      // Click the "Create board" button
      cy.contains('button', 'Create board').click();
  
      cy.get('.MuiDialog-root').should('be.visible');
      // Find the input field by its label and type a name
      cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('New Board Name');
      // Click the "Submit" button within the form
      cy.get('.MuiDialog-root').contains('button', 'Submit').click();
      cy.get('.MuiTypography-root').should('contain', 'New Board Name');


    });
  })

  describe('Board Table Test', () => {
    it('Adding tasks', () => {
      // Replae with the correct URL
      cy.visit('http://localhost:5173/board/1');
      cy.get('.MuiTypography-root').should('contain', 'Backlog');
      cy.get('.some-parent-class button[aria-label="add task"]').click();


    });
  })
  