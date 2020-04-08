Feature: Share a route with a friend

	Scenario: Alice wants to share a route and she is Bob's friend
		Given Alice has a route and Alice is Bob's friend
		When Alice shares the route with Bob
		Then Bob can see Alice's route
		
	Scenario: Alice wants to share a route and she is not Bob's friend
		Given Alice has a route and Alice is not Bob's friend
		When Alice shares the route with Bob
		Then Bob can't see Alice's route
		
	Scenario: Alice wants to share a route with a group that exists
		Given Alice has a route and Alice has the group created
		When Alice shares the route with the group
		Then every member that has Alice as friend can see the route
		
	Scenario: Alice wants to share a route with a group that does not exist
		Given Alice has a route and Alice doesn't have the group created
		When Alice shares the route with the group
		Then a message appears warning such group does not exist
		
	Scenario: Alice wants to share a route with a person that does not exist
		Given Alice has a route and the person's webId does not exist
		When Alice shares the route with the person
		Then a message appears warning such person does not exist
		
