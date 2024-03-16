describe('Futuboard Home Page Test', () => {
  it('should have the correct title', () => {
    // Visit the URL
    cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');

    // Assert that the title is what you expect
   cy.get('.MuiTypography-root').should('contain', 'FutuBoard');

  })
});

describe('Board Creation Test', () => {

  beforeEach(() => {
    cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');
  });

  it('should open the dialog, allow entry, and submit the form', () => {
    // Replace with the correct URL
    cy.visit('https://ashy-sea-0c7c52603.4.azurestaticapps.net');

    // Click the "Create board" button
    cy.get('button').contains('Create board').click();

    cy.get('.MuiDialog-root').should('be.visible');
    // Find the input field by its label and type a name
    cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('New Board Name');
    cy.get('.MuiDialog-root').find('label').contains('Password').parent().find('input').type('123');

    // Click the "Submit" button within the form
    cy.get('.MuiDialog-root').contains('button', 'Submit').click();

    //log in part2
    cy.get('.MuiTypography-root', { timeout: 10000 }).should('contain', 'Enter Board Password');
    cy.get('input[name="password"]').type('123');
    cy.get('form').submit();

    //create column
    cy.get('button[aria-label="add column"]').click();
    cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('New Board Name');
    cy.get('.MuiDialog-root').contains('button', 'Submit').click();
    //todo Edit
    //cy.get('[data-testid="EditNoteIcon"]').click();
    
    //cy.get('.MuiDialog-root').find('label').contains('Name').parent().find('input').type('New Board Name2');



    cy.get('button[aria-label="add task"]').click();
    //todo this part 
    //cy.get('button[aria-label="edit editcolumn"]').click();


    //Creating Task
    cy.get('textarea[name="taskTitle"]').type('Your task title');
    cy.get('input[placeholder="size"]').type('5');
    cy.get('textarea[name="description"]').type('Test Description');
    cy.get('input[name="cornerNote"]').type('Test Corner Note');
    //Todo the color choose
    //cy.get('input[type="radio"][name="rk"]').first().check();
    cy.contains('button', 'Submit').click();

    //edit card
    cy.get('[data-testid="EditNoteIcon"]').click();
    cy.get('textarea[name="taskTitle"]').clear().type('Edit task title');
    cy.get('input[placeholder="size"]').clear().type('7');
    cy.get('textarea[name="description"]').clear().type('Test Edit Description');
    cy.get('input[name="cornerNote"]').clear().type('Edit Test Corner Note');
    cy.contains('button', 'Save Changes').click();


    cy.get('button[aria-label="add task"]').click();
    cy.get('textarea[name="taskTitle"]').clear().type('Toinen tehtävä');
    cy.get('input[placeholder="size"]').clear().type('5');
    cy.get('textarea[name="description"]').clear().type('Testi description');
    cy.get('input[name="cornerNote"]').clear().type(' Testi Corner Note');
    cy.contains('button', 'Submit').click();
    
    
  
    //Adding user 
    cy.get('button[aria-label="Add User"]').click();
    cy.get('input[name="name"]').clear().type('Antonio');
    cy.get('button').contains('Submit').click();
    cy.get('button[aria-label="Add User"]').click();
    cy.get('input[name="name"]').clear().type('Samuli');
    cy.get('button').contains('Submit').click();
    cy.get('button[aria-label="Add User"]').click();
    cy.get('input[name="name"]').clear().type('Alex');
    cy.get('button').contains('Submit').click();

    //Drag and Drop
    // Replace '.draggable' with the actual selector for Antonio in the draggable list
    //Todo Drag and Drop
    //cy.contains('.draggable', 'Antonio').should('exist');

    //cy.contains('.draggable', 'Antonio').trigger('dragstart');
    //cy.get('div[aria-label="Drop Target"]').trigger('dragover').trigger('drop');


    



    



    

  });
})


