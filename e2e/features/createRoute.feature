Feature: Create route

	Scenario: Alice wants to create a valid route 
		Given Alice wants to create a route
		When Alice writes the name, description, points and clicks the button Create
		Then a message is displayed indicating that the route was uploaded correctly

