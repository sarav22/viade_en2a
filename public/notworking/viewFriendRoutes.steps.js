/*const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./e2e/features/viewFriendRoutes.feature');

defineFeature(feature, test => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000');
        let alice = "https://hayquecrearunpod.inrupt.net/profile/card#me";
        await expect(page).toFill('input[name="idp"]', alice )
        //submit
        await page.evaluate(()=>document.querySelector('#root > div.sc-hrWEMg.dyHRcO > div.sc-bdVaJa.jOKaIj.sc-bsbRJL.eGaoon > section > div > div > div > div > form > button.sc-gzVnrw.isbeaB.ids-link').click());
        await expect(page).toFill('input[name="username"]', alice );
        await expect(page).toFill('input[name="password"]', "hayquecrearunpod" );
        await expect(page).toClick('button', { name: 'login' });
    });

    test("Listing the routes created by a friend", ({given, when, then}) => {
        given("I click on the 'Manage Friends' navbar option", async () => {
            await expect(page).toClick('button', {id: 'manageFriends'});
        });

        when("I click on one friend", async () => {
            await expect(page).toClick('button', { text: 'https://raulpemol.inrupt.net/profile/card#me' })
        });

        then("A window with the name of that friend and a list of all his shared routes should appear", async () => {
            
        });
    });

    test("Viewing a shared route", ({given, when, then}) => {
        given("I already clicked on one friend", async () => {
            await expect(page).toClick('button', {id: 'manageFriends'});
            await expect(page).toClick('button', { text: 'https://raulpemol.inrupt.net/profile/card#me' });
        });

        when("I click on a route", async () => {
            await expect(page).toClick('button', { text: 'Test Route' });
        });

        then("I see it displayed on the map", async () => {

        });
    });

    test("Clicking on the wrong friend", ({given, when, then}) => {
        given("I already clicked on one friend", async () => {
            await expect(page).toClick('button', {id: 'manageFriends'});
            await expect(page).toClick('button', { text: 'https://raulpemol.inrupt.net/profile/card#me' });
        });

        when("I click the 'Back' button", async () => {
            await expect(page).toClick('button', { id: 'back' });
        });

        then("The 'Manage Friends' view should be shown", async () => {

        });
    });

    test("Viewing the profile of a friend", ({given, when, then}) => {
        given("I already clicked on one friend", async () => {
            await expect(page).toClick('button', {id: 'manageFriends'});
            await expect(page).toClick('button', { text: 'https://raulpemol.inrupt.net/profile/card#me' });
        });

        when("I click on the dropdown menu and select 'View Profile'", async () => {
            
        });

        then("A new window with its Solid profile should appear on the browser", async () => {

        });
    });

    test("Deleting a friend", ({given, when, then}) => {
        given("I already clicked on one friend", async () => {
            await expect(page).toClick('button', {id: 'manageFriends'});
            await expect(page).toClick('button', { text: 'https://raulpemol.inrupt.net/profile/card#me' });
        });

        when("I click on the dropdown menu and select 'Delete Friend'", async () => {
            
        });

        then("The 'Manage Friends' view should be shown, and the deleted friend will no longer appear there", async () => {

        });
    });
});*/