Feature: Manage groups of friends

	Scenario: Alice wants to create a group
		Given Alice creates a new group named group1
		When Alice adds Bob to the group
		Then the group is stored in her pod
		
	
	Scenario: Alice wants to delete a group
		Given Alice has a group named group1
		When Alice clicks on the delete button
		Then the group deleted from the pod


		
