Feature: Manage friends

	Scenario: Alice wants to delete a friend
		Given Alice has Bob as a friend
		When Alice clicks the button delete
		Then Bob is no longer her friend

		
		
