describe('Article Flow', () => {
    before(() => {
        cy.visit('/destroy_all')
    })

    it('Signs Up a new user', () => {
        cy.fixture('user').then((user) => {
            const { email, password } = user
            cy.signup(email, password)
        })

        cy.get('[data-cy="current-user"]').should(
            'include.text',
            'Logged in as pepe@test.com.'
        )
        cy.logout()
    })

    describe('Creates three articles', () => {
        beforeEach(() => {
            cy.visit('/')
            cy.fixture('user').then((user) => {
                const { email, password } = user
                cy.login(email, password)
            })
        })
        afterEach(() => {
            cy.logout()
        })
        it('creates a new article #1', () => {
            cy.get('[data-cy="new-article"]').click()

            cy.fixture('article').then(({ article1 }) => {
                const { title, body } = article1
                cy.get('[data-cy="title-field"]').type(title)
                cy.get('[data-cy="body-field"]').type(body)
            })
            cy.get('[data-cy="status-select-field"]')
                .select('private')
                .should('have.value', 'private')
                .select('public')
            cy.get('[data-cy="submit-button"]').click()
            cy.url().should('include', '/articles/')
            cy.get('[data-cy="home-link"]').click()
        })

        it('creates a new article #2', () => {
            cy.get('[data-cy="new-article"]').click()

            cy.fixture('article').then(({ article2 }) => {
                const { title, body } = article2
                cy.get('[data-cy="title-field"]').type(title)
                cy.get('[data-cy="body-field"]').type(body)
            })
            cy.get('[data-cy="status-select-field"]')
                .select('private')
                .should('have.value', 'private')
            cy.get('[data-cy="submit-button"]').click()
            cy.url().should('include', '/articles/')
            cy.get('[data-cy="home-link"]').click()
        })

        it('creates a new article #3', () => {
            cy.get('[data-cy="new-article"]').click()
            cy.fixture('article').then(({ article3 }) => {
                const { title, body } = article3
                cy.get('[data-cy="title-field"]').type(title)
                cy.get('[data-cy="body-field"]').type(body)
            })
            cy.get('[data-cy="status-select-field"]')
                .select('private')
                .should('have.value', 'private')
            cy.get('[data-cy="submit-button"]').click()
            cy.url().should('include', '/articles/')
            cy.get('[data-cy="home-link"]').click()
        })
    })

    describe('Test authentication', () => {
        it('Fails to delete an article when no user is logged in', () => {
            // cy.logout()
            cy.get('[data-cy="index-articles"]>li>a').first().click()
            cy.get('[data-cy="delete-article"]').click()
            cy.get('[data-cy="devise-alert"]', { timeout: 4000 })
                .should('be.visible')
                .should(
                    'have.text',
                    'You need to sign in or sign up before continuing.'
                )
        })

        // it('Signs Up a new user', () => {
        //     cy.fixture('user').then((user) => {
        //         const { email, password } = user
        //         cy.signup(email, password)
        //     })

        //     cy.get('[data-cy="current-user"]').should(
        //         'include.text',
        //         'Logged in as pepe@test.com.'
        //     )
        //     cy.logout()
        // })

        it('Logs in the user', () => {
            cy.fixture('user').then((user) => {
                const { email, password } = user
                cy.login(email, password)
            })
            cy.get('[data-cy="current-user"]').should(
                'include.text',
                'Logged in as pepe@test.com.'
            )
            cy.logout()
        })

        it('Deletes an article when the user is authenticated', () => {
            cy.fixture('user').then((user) => {
                const { email, password } = user
                cy.login(email, password)
            })
            cy.get('[data-cy="index-articles"]>li>a').first().click()
            cy.get('[data-cy="delete-article"]').click()
        })
    })
})
