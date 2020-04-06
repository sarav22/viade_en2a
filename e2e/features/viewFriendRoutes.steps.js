const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./e2e/features/viewFriendRoutes.feature');

defineFeature(feature, test => {
    beforeEach(async () => {
        //await page.goto('http://localhost:3000');
        //LOG IN
        //We need to create a dummy POD to test
    });

    test("Listing the routes created by a friend", ({given, when, then}) => {
        given("I click on the 'Manage Friends' navbar option", async () => {
            //await expect(page).toClick('button', {id: 'manageFriends'});
            //Ensure the page loaded
        });

        when("I click on one friend", async () => {
            
        });

        then("A window with the name of that friend and a list of all his routes should appear", async () => {

        });
    });

    test("Viewing a shared route", ({given, when, then}) => {
        given("I already clicked on one friend", async () => {
            //await expect(page).toClick('button', {id: 'manageFriends'});
            //Ensure the page loaded
            //Click on a friend
        });

        when("I click on a route", async () => {
            
        });

        then("If i have the right permissions I will see it displayed on the map", async () => {

        });
    });

    test("Viewing a non-shared route", ({given, when, then}) => {
        given("I already clicked on one friend", async () => {
            //await expect(page).toClick('button', {id: 'manageFriends'});
            //Ensure the page loaded
            //Click on a friend
        });

        when("I click on a route", async () => {
            
        });

        then("If i don't have the right permissions I won't see it displayed on a map", async () => {

        });
    });

    test("Viewing a non-shared route", ({given, when, then}) => {
        given("I already clicked on one friend", async () => {
            //await expect(page).toClick('button', {id: 'manageFriends'});
            //Ensure the page loaded
            //Click on a friend
        });

        when("I click the 'Back' button", async () => {
            
        });

        then("The 'Manage Friends' view should be shown", async () => {

        });
    });

    test("Viewing a non-shared route", ({given, when, then}) => {
        given("I already clicked on one friend", async () => {
            //await expect(page).toClick('button', {id: 'manageFriends'});
            //Ensure the page loaded
            //Click on a friend
        });

        when("I click on the dropdown menu and select 'View Profile'", async () => {
            
        });

        then("A new window with its Solid profile should appear on the browser", async () => {

        });
    });

    test("Viewing a non-shared route", ({given, when, then}) => {
        given("I already clicked on one friend", async () => {
            //await expect(page).toClick('button', {id: 'manageFriends'});
            //Ensure the page loaded
            //Click on a friend
        });

        when("I click on the dropdown menu and select 'Delete Friend'", async () => {
            
        });

        then("The 'Manage Friends' view should be shown, and the deleted friend will no longer appear there", async () => {

        });
    });
});