Feature: Manage friends

	Scenario: Alice wants to delete a friend
		Given Alice has Bob as a friend
		When Alice clicks the button delete
		Then Bob is no longer her friend
	
	Scenario: Alice wants to see Bob's profile
		Given Alice has Bob as a friend
		When Alice clicks the button view profile
		Then Alice sees his card at the pod
		
	Scenario: Alice wants to see Bob's routes way 1
		Given Alice has Bob as a friend
		When Alice clicks the button view routes
		Then Alice sees his list of routes
		
	Scenario: Alice wants to see Bob's routes way 2
		Given Alice has Bob as a friend
		When Alice clicks Bob's button
		Then Alice sees his list of routes
	
	
		
		
