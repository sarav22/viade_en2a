Feature: Search among friends

	Scenario: Alice wants to search for a specific friend
		Given Alice has Bob as a friend
		When Alice writes a string which matches Bob's user
		Then only Bob's friend button is displayed

    Scenario: Alice wants to search for all friends which match a certain substring
		Given Alice wants to search for all friends whose user contains a certain substring
		When Alice writes that substring
		Then the buttons for all friends whose user match that substring are displayed
    