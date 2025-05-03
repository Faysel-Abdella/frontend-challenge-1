
describe('Todo App', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
    // Visit the app
    cy.visit('/');
  });

  it('should add a new todo', () => {
    // Type in a new todo
    cy.get('input[placeholder="What needs to be done?"]')
      .type('Test Todo Item');
    
    // Submit the form
    cy.contains('button', 'Add Task').click();
    
    // Verify todo was added
    cy.contains('Test Todo Item').should('exist');
  });

  it('should mark a todo as complete', () => {
    // Add a todo
    cy.get('input[placeholder="What needs to be done?"]')
      .type('Complete This Task');
    cy.contains('button', 'Add Task').click();
    
    // Find and click the checkbox
    cy.contains('Complete This Task')
      .parents('[draggable="true"]')
      .find('[type="checkbox"]')
      .click();
    
    // Verify task is marked as complete (check for strikethrough class)
    cy.contains('Complete This Task')
      .should('have.class', 'line-through');
  });

  it('should delete a todo', () => {
    // Add a todo
    cy.get('input[placeholder="What needs to be done?"]')
      .type('Delete This Task');
    cy.contains('button', 'Add Task').click();
    
    // Find and click the delete button
    cy.contains('Delete This Task')
      .parents('[draggable="true"]')
      .find('button[aria-label="Delete"]')
      .click();
    
    // Verify task was deleted
    cy.contains('Delete This Task').should('not.exist');
  });

  it('should filter todos', () => {
    // Add two todos
    cy.get('input[placeholder="What needs to be done?"]')
      .type('Task 1');
    cy.contains('button', 'Add Task').click();
    
    cy.get('input[placeholder="What needs to be done?"]')
      .clear()
      .type('Task 2');
    cy.contains('button', 'Add Task').click();
    
    // Complete one task
    cy.contains('Task 1')
      .parents('[draggable="true"]')
      .find('[type="checkbox"]')
      .click();
    
    // Filter by completed
    cy.contains('button', 'Completed').click();
    
    // Verify only completed task is visible
    cy.contains('Task 1').should('exist');
    cy.contains('Task 2').should('not.exist');
    
    // Filter by active
    cy.contains('button', 'Active').click();
    
    // Verify only active task is visible
    cy.contains('Task 1').should('not.exist');
    cy.contains('Task 2').should('exist');
  });

  it('should search for todos', () => {
    // Add todos with distinct names
    cy.get('input[placeholder="What needs to be done?"]')
      .type('Buy groceries');
    cy.contains('button', 'Add Task').click();
    
    cy.get('input[placeholder="What needs to be done?"]')
      .clear()
      .type('Pay bills');
    cy.contains('button', 'Add Task').click();
    
    // Search for "groceries"
    cy.get('input[placeholder="Search tasks..."]')
      .type('groceries');
    
    // Verify filtered results
    cy.contains('Buy groceries').should('be.visible');
    cy.contains('Pay bills').should('not.exist');
  });
});
