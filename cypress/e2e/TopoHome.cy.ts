describe('TopoHome', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('visits the app root url', () => {
    cy.contains('Topo Game')
  })

  it('shows error when try to star game without name', () => {
    cy.get('form').within(() => {
      cy.get('button').click()
    })
    cy.contains('Please enter your name').should('be.visible')
  })

  it('starts the game with valid name', () => {
    cy.get('#name').type('John Doe')
    cy.get('form').within(() => {
      cy.get('button').click()
    })
    cy.url().should('include', 'game')
  })
})
