/*import { setDefaultOptions } from 'expect-puppeteer';

const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./e2e/features/viewFriendRoutes.feature');

setDefaultOptions({ timeout: 10000 })

defineFeature(feature, test => {
    beforeEach(async () => {
        await page.goto('https://arquisoft.github.io/viade_en2a/');
        /*
        await expect(page).toFill('input[name="username"]', alice )
        await expect(page).toFill('input[name="password"]', "hayquecrearunpod" )
        await expect(page).toClick('button', { name: 'login' })*/
    });

    test("Listing the routes created by a friend", ({given, when, then}) => {
        given("I click on the 'Manage Friends' navbar option", async () => {
            //await expect(page).toClick('button', {id: 'manageFriends'});
            let alice = "https://en2aviade.inrupt.net/profile/card#me";
            await expect(page).toMatchElement('input', {name: 'idp'})
            await expect(page).toFill('input[name="idp"]', alice )
            await expect(page).toMatchElement('button', {type: 'submit'})
            await expect(page).toClick('button', {text: 'Log In'})
            await expect(page).toMatchElement('button', {text: 'Log In'})
            //submit
        });

        when("I click on one friend", async () => {
            //await expect(page).toClick('button', { text: 'https://raulpemol.inrupt.net/profile/card#me' })
        });

        then("A window with the name of that friend and a list of all his shared routes should appear", async () => {
            
        });
    });

    test("Viewing a shared route", ({given, when, then}) => {
        given("I already clicked on one friend", async () => {
            //await expect(page).toClick('button', {id: 'manageFriends'});
            //await expect(page).toClick('button', { text: 'https://raulpemol.inrupt.net/profile/card#me' })
        });

        when("I click on a route", async () => {
            //await expect(page).toClick('button', { text: 'Test Route' })
        });

        then("I see it displayed on the map", async () => {

        });
    });

    test("Clicking on the wrong friend", ({given, when, then}) => {
        given("I already clicked on one friend", async () => {
            //await expect(page).toClick('button', {id: 'manageFriends'});
            //await expect(page).toClick('button', { text: 'https://raulpemol.inrupt.net/profile/card#me' })
        });

        when("I click the 'Back' button", async () => {
            //await expect(page).toClick('button', { id: 'back' })
        });

        then("The 'Manage Friends' view should be shown", async () => {

        });
    });

    test("Viewing the profile of a friend", ({given, when, then}) => {
        given("I already clicked on one friend", async () => {
            //await expect(page).toClick('button', {id: 'manageFriends'});
            //await expect(page).toClick('button', { text: 'https://raulpemol.inrupt.net/profile/card#me' })
        });

        when("I click on the dropdown menu and select 'View Profile'", async () => {
            
        });

        then("A new window with its Solid profile should appear on the browser", async () => {

        });
    });

    test("Deleting a friend", ({given, when, then}) => {
        given("I already clicked on one friend", async () => {
            //await expect(page).toClick('button', {id: 'manageFriends'});
            //await expect(page).toClick('button', { text: 'https://raulpemol.inrupt.net/profile/card#me' })
        });

        when("I click on the dropdown menu and select 'Delete Friend'", async () => {
            
        });

        then("The 'Manage Friends' view should be shown, and the deleted friend will no longer appear there", async () => {

        });
    });
});
*/