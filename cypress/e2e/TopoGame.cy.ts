
describe('TopoGame', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#name').type('John Doe')
    cy.get('form').within(() => {
      cy.get('button').click()
    })
    cy.url().should('include', 'game')
  })

  it('starts the game when the button is clicked', () => {
    cy.contains('Start Game').click()
    cy.contains('Stop Game')
  })

  it('stops the game when the button is clicked', () => {
    cy.contains('Start Game').click()
    cy.contains('Stop Game').click()
    cy.contains('Start Game')
  })
  
  it('shows configuration panel when the gear is clicked', () => {
    cy.get('.configurator-button').click()
    cy.get('.configurator').should('be.visible')
  })

  it('change difficulty when the slider is changed', () => {
    cy.get('.configurator-button').click()
    cy.get('#difficulty').invoke('val', 1).trigger('input')
    cy.get('[data-test="difficulty-range"]').contains('Medium')
  })

  it('change quantity when the slider is changed', () => {
    cy.get('.configurator-button').click()
    cy.get('#quantity').invoke('val', 2).trigger('input')
    cy.get('[data-test="quantity-range"]').contains('2')
  })
  
  it('hides configuration panel when the close button is clicked', () => {
    cy.get('.configurator-button').click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(300)
    cy.get('.close-button').click()
    cy.get('.configurator').should('be.visible')
  })

  it('increments score when click on correct topo', () => {
    cy.log('Increment 10')
    cy.contains('Start Game').click()
    cy.get('.cell.active').click()
    cy.contains('Score: 10')

    cy.log('Increment 20')
    cy.get('.configurator-button').click()
    cy.get('#difficulty').invoke('val', 1).trigger('input')
    cy.get('.close-button').click()
    cy.contains('Start Game').click()
    cy.get('.cell.active').click()
    cy.contains('Score: 20')

    cy.log('Increment 30')
    cy.get('.configurator-button').click()
    cy.get('#difficulty').invoke('val', 2).trigger('input')
    cy.get('.close-button').click()
    cy.contains('Start Game').click()
    cy.get('.cell.active').click()
    cy.contains('Score: 30')
  });

  it('must have as topos active as quantity set', () => {
    cy.log('Quantity 1')
    cy.contains('Start Game').click()
    cy.get('.cell.active').should('have.length', 1)

    cy.log('Quantity 2')
    cy.get('.configurator-button').click()
    cy.get('#quantity').invoke('val', 2).trigger('input')
    cy.get('.close-button').click()
    cy.contains('Start Game').click()
    cy.get('.cell.active').should('have.length', 2)

    cy.log('Quantity 3')
    cy.get('.configurator-button').click()
    cy.get('#quantity').invoke('val', 3).trigger('input')
    cy.get('.close-button').click()
    cy.contains('Start Game').click()
    cy.get('.cell.active').should('have.length', 3)
  });
})