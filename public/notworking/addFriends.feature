Feature: Manage friends

	Scenario: Alice wants to add an existing user as a friend
		Given Alice does not have Bob as a friend and Bob's webID exists
		When Alice writes Bob's webID and clicks the button Add Friend
		Then Bob is made Alice's friend and the "Manage Friends" view is reloaded

    Scenario: Alice wants to add a non-existing user as a friend
		Given Alice wants to add NonExistingUser as a friend
		When Alice writes NonExistingUser's webID and clicks the button Add Friend
		Then an alert indicating the error is shown and the user is not added as a friend
    