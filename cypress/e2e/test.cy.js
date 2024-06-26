describe('Futuboard Home Page Test', () => {
    it('should have the correct title', () => {
      // Visit the Futuboard URL
      cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
  
      // Assert that the page title is "FutuBoard"
      cy.get('.MuiTypography-root').should('contain', 'FutuBoard');
    });
  });

  describe('Creating new board Test', () => {

    beforeEach(() => {
      // Visit the Futuboard URL before each test
      cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
    });
    it('should create a new board', () => {
      cy.get('button').contains('Create board').click();

      // Assert that the board creation dialog is visible
      cy.get('.MuiDialog-root').should('be.visible');
  
      // Enter the board name and password
      cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('Project Alpha');
      cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('alpha123');
  
      // Submit the board creation form
      cy.get('.MuiDialog-root').contains('button', 'Submit').click();
      });
    });

    describe('Log in to the newly created board Test', () => {

        beforeEach(() => {
      cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
      cy.get('button').contains('Create board').click();
      cy.get('.MuiDialog-root').should('be.visible');
      cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('Project Alpha');
      cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('alpha123');
      cy.get('.MuiDialog-root').contains('button', 'Submit').click();
        });
        it('should log in', () => {
            // Log in to the newly created board
        cy.get('.MuiTypography-root', { timeout: 10000 }).should('contain', 'Enter Board Password');
        cy.get('input[name="password"]').type('alpha123');
        cy.get('form').submit();
          });
        });


        describe(' Add a new column tasks Test', () => {

          beforeEach(() => {
        cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
        cy.get('button').contains('Create board').click();
        cy.get('.MuiDialog-root').should('be.visible');
        cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('Project Alpha');
        cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('alpha123');
        cy.get('.MuiDialog-root').contains('button', 'Submit').click();
        cy.get('.MuiTypography-root', { timeout: 10000 }).should('contain', 'Enter Board Password');
        cy.get('input[name="password"]').type('alpha123');
        cy.get('form').submit();
          });
          it('should add a new column for "To Do" tasks', () => {
          cy.get('button[aria-label="add column"]').click();
          cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('To Do');
          cy.get('.MuiDialog-root').contains('button', 'Submit').click();
            });
          });


        describe('Edit the column to set work-in-progress limits Test', () => {

          beforeEach(() => {
        cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
        cy.get('button').contains('Create board').click();
        cy.get('.MuiDialog-root').should('be.visible');
        cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('Project Alpha');
        cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('alpha123');
        cy.get('.MuiDialog-root').contains('button', 'Submit').click();
        cy.get('.MuiTypography-root', { timeout: 10000 }).should('contain', 'Enter Board Password');
        cy.get('input[name="password"]').type('alpha123');
        cy.get('form').submit();
        cy.get('button[aria-label="add column"]').click();
        cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('To Do');
        cy.get('.MuiDialog-root').contains('button', 'Submit').click();
          });
          it('should edit the  column', () => {
            cy.get('[data-testid="EditIcon"]').click();
            cy.get('[name="columnTitle"]').clear().type('To Do');
            cy.get('[name="columnWipLimit"]').type('5');
            cy.get('[name="columnWipLimitStory"]').type('8');
            cy.contains('Submit').click();
            });
          });

          describe('Add a task to the  column Test', () => {

            beforeEach(() => {
          cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
          cy.get('button').contains('Create board').click();
          cy.get('.MuiDialog-root').should('be.visible');
          cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('Project Alpha');
          cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('alpha123');
          cy.get('.MuiDialog-root').contains('button', 'Submit').click();
          cy.get('.MuiTypography-root', { timeout: 10000 }).should('contain', 'Enter Board Password');
          cy.get('input[name="password"]').type('alpha123');
          cy.get('form').submit();
          cy.get('button[aria-label="add column"]').click();
          cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('To Do');
          cy.get('.MuiDialog-root').contains('button', 'Submit').click();
          cy.get('[data-testid="EditIcon"]').click();
          cy.get('[name="columnTitle"]').clear().type('To Do');
          cy.get('[name="columnWipLimit"]').type('5');
          cy.get('[name="columnWipLimitStory"]').type('8');
          cy.contains('Submit').click();
            });
            it('should add a task to the column', () => {
              // Add a task to the "To Do" column
          cy.get('button[aria-label="add task"]').click();
          cy.get('textarea[name="taskTitle"]').type('Design Homepage');
          cy.get('input[placeholder="size"]').type('3');
          cy.get('textarea[name="description"]').type('Create a mockup for the homepage');
          cy.get('input[name="cornerNote"]').type('Urgent');
          cy.contains('button', 'Submit').click();
              });
            });


            describe('Edit the task to update details Test', () => {

              beforeEach(() => {
            cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
            cy.get('button').contains('Create board').click();
            cy.get('.MuiDialog-root').should('be.visible');
            cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('Project Alpha');
            cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('alpha123');
            cy.get('.MuiDialog-root').contains('button', 'Submit').click();
            cy.get('.MuiTypography-root', { timeout: 10000 }).should('contain', 'Enter Board Password');
            cy.get('input[name="password"]').type('alpha123');
            cy.get('form').submit();
            cy.get('button[aria-label="add column"]').click();
            cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('To Do');
            cy.get('.MuiDialog-root').contains('button', 'Submit').click();
            cy.get('[data-testid="EditIcon"]').click();
            cy.get('[name="columnTitle"]').clear().type('To Do');
            cy.get('[name="columnWipLimit"]').type('5');
            cy.get('[name="columnWipLimitStory"]').type('8');
            cy.contains('Submit').click();
            cy.get('button[aria-label="add task"]').click();
            cy.get('textarea[name="taskTitle"]').type('Design Homepage');
            cy.get('input[placeholder="size"]').type('3');
            cy.get('textarea[name="description"]').type('Create a mockup for the homepage');
            cy.get('input[name="cornerNote"]').type('Urgent');
            cy.contains('button', 'Submit').click();
              });
              it('should edit the task to update details', () => {
                // Edit the task to update details
            cy.get('[data-testid="EditNoteIcon"]').click();
            cy.get('textarea[name="taskTitle"]').clear().type('Design Homepage - Revised');
            cy.get('input[placeholder="size"]').clear().type('4');
            cy.get('textarea[name="description"]').clear().type('Update the homepage mockup with new requirements');
            cy.get('input[name="cornerNote"]').clear().type('High Priority');
            cy.contains('button', 'Save Changes').click();
                });

              });


              describe('Add another task to the in the swim column test', () => {

                beforeEach(() => {
              cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
              cy.get('button').contains('Create board').click();
              cy.get('.MuiDialog-root').should('be.visible');
              cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('Project Alpha');
              cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('alpha123');
              cy.get('.MuiDialog-root').contains('button', 'Submit').click();
              cy.get('.MuiTypography-root', { timeout: 10000 }).should('contain', 'Enter Board Password');
              cy.get('input[name="password"]').type('alpha123');
              cy.get('form').submit();
              cy.get('button[aria-label="add column"]').click();
              cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('To Do');
              cy.get('.MuiDialog-root').contains('button', 'Submit').click();
              cy.get('[data-testid="EditIcon"]').click();
              cy.get('[name="columnTitle"]').clear().type('To Do');
              cy.get('[name="columnWipLimit"]').type('5');
              cy.get('[name="columnWipLimitStory"]').type('8');
              cy.contains('Submit').click();
              cy.get('button[aria-label="add task"]').click();
              cy.get('textarea[name="taskTitle"]').type('Design Homepage');
              cy.get('input[placeholder="size"]').type('3');
              cy.get('textarea[name="description"]').type('Create a mockup for the homepage');
              cy.get('input[name="cornerNote"]').type('Urgent');
              cy.contains('button', 'Submit').click();
               cy.get('[data-testid="EditNoteIcon"]').click();
               cy.get('textarea[name="taskTitle"]').clear().type('Design Homepage - Revised');
               cy.get('input[placeholder="size"]').clear().type('4');
               cy.get('textarea[name="description"]').clear().type('Update the homepage mockup with new requirements');
               cy.get('input[name="cornerNote"]').clear().type('High Priority');
               cy.contains('button', 'Save Changes').click();
                });
                it('should add another task to the column', () => {
                  cy.get('button[aria-label="add task"]').click();
                  cy.get('textarea[name="taskTitle"]').clear().type('Research Competitors');
                  cy.get('input[placeholder="size"]').clear().type('2');
                  cy.get('textarea[name="description"]').clear().type('Analyze competitor websites for features and design');
                  cy.get('input[name="cornerNote"]').clear().type('Normal');
                  cy.contains('button', 'Submit').click();
                  });
  
                });

                describe('Add users to the board test', () => {

                  beforeEach(() => {
                cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
                cy.get('button').contains('Create board').click();
                cy.get('.MuiDialog-root').should('be.visible');
                cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('Project Alpha');
                cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('alpha123');
                cy.get('.MuiDialog-root').contains('button', 'Submit').click();
                cy.get('.MuiTypography-root', { timeout: 10000 }).should('contain', 'Enter Board Password');
                cy.get('input[name="password"]').type('alpha123');
                cy.get('form').submit();
                cy.get('button[aria-label="add column"]').click();
                cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('To Do');
                cy.get('.MuiDialog-root').contains('button', 'Submit').click();
                cy.get('[data-testid="EditIcon"]').click();
                cy.get('[name="columnTitle"]').clear().type('To Do');
                cy.get('[name="columnWipLimit"]').type('5');
                cy.get('[name="columnWipLimitStory"]').type('8');
                cy.contains('Submit').click();
                cy.get('button[aria-label="add task"]').click();
                cy.get('textarea[name="taskTitle"]').type('Design Homepage');
                cy.get('input[placeholder="size"]').type('3');
                cy.get('textarea[name="description"]').type('Create a mockup for the homepage');
                cy.get('input[name="cornerNote"]').type('Urgent');
                cy.contains('button', 'Submit').click();
                cy.get('[data-testid="EditNoteIcon"]').click();
                cy.get('textarea[name="taskTitle"]').clear().type('Design Homepage - Revised');
                cy.get('input[placeholder="size"]').clear().type('4');
                cy.get('textarea[name="description"]').clear().type('Update the homepage mockup with new requirements');
                cy.get('input[name="cornerNote"]').clear().type('High Priority');
                cy.contains('button', 'Save Changes').click();
                cy.get('button[aria-label="add task"]').click();
                cy.get('textarea[name="taskTitle"]').clear().type('Research Competitors');
                cy.get('input[placeholder="size"]').clear().type('2');
                cy.get('textarea[name="description"]').clear().type('Analyze competitor websites for features and design');
                cy.get('input[name="cornerNote"]').clear().type('Normal');
                cy.contains('button', 'Submit').click();
    
                  });
                  it('should add users to the board', () => {

                    cy.get('button[aria-label="Add User"]').click();
                    cy.get('input[name="name"]').clear().type('Antonio');
                    cy.get('button').contains('Submit').click();
                    cy.get('button[aria-label="Add User"]').click();
                    cy.get('input[name="name"]').clear().type('Samuli');
                    cy.get('button').contains('Submit').click();
                    cy.get('button[aria-label="Add User"]').click();
                    cy.get('input[name="name"]').clear().type('Alex');
                    cy.get('button').contains('Submit').click()
                    });
                  });


                  describe('Add new column in swim task', () => {

                    beforeEach(() => {
                      cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
                cy.get('button').contains('Create board').click();
                cy.get('.MuiDialog-root').should('be.visible');
                cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('Project Alpha');
                cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('alpha123');
                cy.get('.MuiDialog-root').contains('button', 'Submit').click();
                cy.get('.MuiTypography-root', { timeout: 10000 }).should('contain', 'Enter Board Password');
                cy.get('input[name="password"]').type('alpha123');
                cy.get('form').submit();
                cy.get('button[aria-label="add column"]').click();
                cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('To Do');
                cy.get('.MuiDialog-root').contains('button', 'Submit').click();
                cy.get('[data-testid="EditIcon"]').click();
                cy.get('[name="columnTitle"]').clear().type('To Do');
                cy.get('[name="columnWipLimit"]').type('5');
                cy.get('[name="columnWipLimitStory"]').type('8');
                cy.contains('Submit').click();
                cy.get('button[aria-label="add task"]').click();
                cy.get('textarea[name="taskTitle"]').type('Design Homepage');
                cy.get('input[placeholder="size"]').type('3');
                cy.get('textarea[name="description"]').type('Create a mockup for the homepage');
                cy.get('input[name="cornerNote"]').type('Urgent');
                cy.contains('button', 'Submit').click();
                cy.get('[data-testid="EditNoteIcon"]').click();
                cy.get('textarea[name="taskTitle"]').clear().type('Design Homepage - Revised');
                cy.get('input[placeholder="size"]').clear().type('4');
                cy.get('textarea[name="description"]').clear().type('Update the homepage mockup with new requirements');
                cy.get('input[name="cornerNote"]').clear().type('High Priority');
                cy.contains('button', 'Save Changes').click();
                cy.get('button[aria-label="add task"]').click();
                cy.get('textarea[name="taskTitle"]').clear().type('Research Competitors');
                cy.get('input[placeholder="size"]').clear().type('2');
                cy.get('textarea[name="description"]').clear().type('Analyze competitor websites for features and design');
                cy.get('input[name="cornerNote"]').clear().type('Normal');
                cy.contains('button', 'Submit').click();
                cy.get('button[aria-label="Add User"]').click();
                    cy.get('input[name="name"]').clear().type('Antonio');
                    cy.get('button').contains('Submit').click();
                    cy.get('button[aria-label="Add User"]').click();
                    cy.get('input[name="name"]').clear().type('Samuli');
                    cy.get('button').contains('Submit').click();
                    cy.get('button[aria-label="Add User"]').click();
                    cy.get('input[name="name"]').clear().type('Alex');
                    cy.get('button').contains('Submit').click()

                    });
                    it('should add a new column for "In Progress" tasks', () => {
                      cy.get('button[aria-label="add column"]').click();
                      cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('In Progress');
                      cy.get('.MuiCheckbox-root').click(); // Optionally check a checkbox if needed
                      cy.get('.MuiDialog-root').contains('button', 'Submit').click();
                      cy.get('button[aria-label="add task"]').eq(1).click(); // Use eq(1) to click the second "Add task" button
                      cy.get('textarea[name="taskTitle"]').type('Develop Homepage');
    cy.get('input[placeholder="size"]').type('5');
    cy.get('textarea[name="description"]').type('Implement the homepage based on the design mockup');
    cy.get('input[name="cornerNote"]').type('Critical');
    cy.contains('button', 'Submit').click();
                      });
                    });
    
    
                    describe('Add a task to the swim column test', () => {
    
                      beforeEach(() => {
                    cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
                    cy.get('button').contains('Create board').click();
                    cy.get('.MuiDialog-root').should('be.visible');
                    cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('Project Alpha');
                    cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('alpha123');
                    cy.get('.MuiDialog-root').contains('button', 'Submit').click();
                    cy.get('.MuiTypography-root', { timeout: 10000 }).should('contain', 'Enter Board Password');
                    cy.get('input[name="password"]').type('alpha123');
                    cy.get('form').submit();
                    cy.get('button[aria-label="add column"]').click();
                    cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('To Do');
                    cy.get('.MuiDialog-root').contains('button', 'Submit').click();
                    cy.get('[data-testid="EditIcon"]').click();
                    cy.get('[name="columnTitle"]').clear().type('To Do');
                    cy.get('[name="columnWipLimit"]').type('5');
                    cy.get('[name="columnWipLimitStory"]').type('8');
                    cy.contains('Submit').click();
                    cy.get('button[aria-label="add task"]').click();
                    cy.get('textarea[name="taskTitle"]').type('Design Homepage');
                    cy.get('input[placeholder="size"]').type('3');
                    cy.get('textarea[name="description"]').type('Create a mockup for the homepage');
                    cy.get('input[name="cornerNote"]').type('Urgent');
                    cy.contains('button', 'Submit').click();
                    cy.get('[data-testid="EditNoteIcon"]').click();
                    cy.get('textarea[name="taskTitle"]').clear().type('Design Homepage - Revised');
                    cy.get('input[placeholder="size"]').clear().type('4');
                    cy.get('textarea[name="description"]').clear().type('Update the homepage mockup with new requirements');
                    cy.get('input[name="cornerNote"]').clear().type('High Priority');
                    cy.contains('button', 'Save Changes').click();
                    cy.get('button[aria-label="add task"]').click();
                    cy.get('textarea[name="taskTitle"]').clear().type('Research Competitors');
                    cy.get('input[placeholder="size"]').clear().type('2');
                    cy.get('textarea[name="description"]').clear().type('Analyze competitor websites for features and design');
                    cy.get('input[name="cornerNote"]').clear().type('Normal');
                    cy.contains('button', 'Submit').click();
                    cy.get('button[aria-label="Add User"]').click();
                    cy.get('input[name="name"]').clear().type('Antonio');
                    cy.get('button').contains('Submit').click();
                    cy.get('button[aria-label="Add User"]').click();
                    cy.get('input[name="name"]').clear().type('Samuli');
                    cy.get('button').contains('Submit').click();
                    cy.get('button[aria-label="Add User"]').click();
                    cy.get('input[name="name"]').clear().type('Alex');
                    cy.get('button').contains('Submit').click();
                    cy.get('button[aria-label="add column"]').click();
                  cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('In Progress');
                  cy.get('.MuiCheckbox-root').click(); // Optionally check a checkbox if needed
                  cy.get('.MuiDialog-root').contains('button', 'Submit').click();
                  cy.get('button[aria-label="add task"]').eq(1).click(); // Use eq(1) to click the second "Add task" button
                  cy.get('textarea[name="taskTitle"]').type('Develop Homepage');
                  cy.get('input[placeholder="size"]').type('5');
                  cy.get('textarea[name="description"]').type('Implement the homepage based on the design mockup');
                  cy.get('input[name="cornerNote"]').type('Critical');
                  cy.contains('button', 'Submit').click();
        
                      });
                      it('should add a task to the swim column', () => {
                        cy.get('[data-testid="ArrowForwardIosIcon"]').click();
                        cy.get('[data-testid="AddIcon"]').eq(2).click();
                        cy.get('label').contains('Name').next('div').find('input').type('Syödä');
                        cy.get('button').contains('Submit').click();
                        });
                      });

 

                      


                        describe('Downloading the CSV and Delete the board test', () => {
    
                          beforeEach(() => {
                        cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
                        cy.get('button').contains('Create board').click();
                        cy.get('.MuiDialog-root').should('be.visible');
                        cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('Project Alpha');
                        cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('alpha123');
                        cy.get('.MuiDialog-root').contains('button', 'Submit').click();
                        cy.get('.MuiTypography-root', { timeout: 10000 }).should('contain', 'Enter Board Password');
                        cy.get('input[name="password"]').type('alpha123');
                        cy.get('form').submit();
                        cy.get('button[aria-label="add column"]').click();
                        cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('To Do');
                        cy.get('.MuiDialog-root').contains('button', 'Submit').click();
                        cy.get('[data-testid="EditIcon"]').click();
                        cy.get('[name="columnTitle"]').clear().type('To Do');
                        cy.get('[name="columnWipLimit"]').type('5');
                        cy.get('[name="columnWipLimitStory"]').type('8');
                        cy.contains('Submit').click();
                        cy.get('button[aria-label="add task"]').click();
                        cy.get('textarea[name="taskTitle"]').type('Design Homepage');
                        cy.get('input[placeholder="size"]').type('3');
                        cy.get('textarea[name="description"]').type('Create a mockup for the homepage');
                        cy.get('input[name="cornerNote"]').type('Urgent');
                        cy.contains('button', 'Submit').click();
                        cy.get('[data-testid="EditNoteIcon"]').click();
                        cy.get('textarea[name="taskTitle"]').clear().type('Design Homepage - Revised');
                        cy.get('input[placeholder="size"]').clear().type('4');
                        cy.get('textarea[name="description"]').clear().type('Update the homepage mockup with new requirements');
                        cy.get('input[name="cornerNote"]').clear().type('High Priority');
                        cy.contains('button', 'Save Changes').click();
                        cy.get('button[aria-label="add task"]').click();
                        cy.get('textarea[name="taskTitle"]').clear().type('Research Competitors');
                        cy.get('input[placeholder="size"]').clear().type('2');
                        cy.get('textarea[name="description"]').clear().type('Analyze competitor websites for features and design');
                        cy.get('input[name="cornerNote"]').clear().type('Normal');
                        cy.contains('button', 'Submit').click();
                        cy.get('button[aria-label="Add User"]').click();
                        cy.get('input[name="name"]').clear().type('Antonio');
                        cy.get('button').contains('Submit').click();
                        cy.get('button[aria-label="Add User"]').click();
                        cy.get('input[name="name"]').clear().type('Samuli');
                        cy.get('button').contains('Submit').click();
                        cy.get('button[aria-label="Add User"]').click();
                        cy.get('input[name="name"]').clear().type('Alex');
                        cy.get('button').contains('Submit').click();
                        cy.get('button[aria-label="add column"]').click();
                        cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('In Progress');
                        cy.get('.MuiCheckbox-root').click(); // Optionally check a checkbox if needed
                        cy.get('.MuiDialog-root').contains('button', 'Submit').click();
                        cy.get('button[aria-label="add task"]').eq(1).click(); // Use eq(1) to click the second "Add task" button
                        cy.get('textarea[name="taskTitle"]').type('Develop Homepage');
                        cy.get('input[placeholder="size"]').type('5');
                        cy.get('textarea[name="description"]').type('Implement the homepage based on the design mockup');
                        cy.get('input[name="cornerNote"]').type('Critical');
                        cy.contains('button', 'Submit').click();
                        cy.get('[data-testid="ArrowForwardIosIcon"]').click();
                        cy.get('[data-testid="AddIcon"]').eq(2).click();
                        cy.get('label').contains('Name').next('div').find('input').type('Syödä');
                        cy.get('button').contains('Submit').click();
                          
                          });
                          it('should work', () => {
                            cy.get('[data-testid="MoreVertIcon"]').click();
                            cy.get('[data-testid="DownloadIcon"]').click();
                            cy.get('[data-testid="MoreVertIcon"]').click();
                            cy.get('[data-testid="DeleteIcon"]').click();
                            cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('alpha123');
                            cy.get('.MuiDialog-root').contains('button', 'Submit').click();
                            cy.get('.MuiDialog-root').contains('button', 'Confirm Deletion').click();
                            
                            });
                          });

                      
            