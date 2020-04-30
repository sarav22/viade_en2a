Feature: View the routes of a friend

Scenario: Listing the routes created by a friend
    Given I click on the 'Manage Friends' navbar option
    When I click on one friend
    Then A window with the name of that friend and a list of all his shared routes should appear

Scenario: Viewing a shared route
    Given I already clicked on one friend
    When I click on a route
    Then I see it displayed on the map

Scenario: Clicking on the wrong friend
    Given I already clicked on one friend
    When I click the 'Back' button
    Then The 'Manage Friends' view should be shown
