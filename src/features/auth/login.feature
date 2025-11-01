Feature: Login

    Scenario: Login with valid credentials
        Given I start the application with the fixture "basic.db"
        And I navigate to the login page
        And I type "matheus@copera.ai" into field with label "Username"
        And I type "12345678" into field with label "Password"
        And I click the "Login" button
        Then I should be on page path "/"
        And I should see the "Overview" element
        And I should see the "Upcoming" element