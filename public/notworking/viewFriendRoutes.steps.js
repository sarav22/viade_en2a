
const feature = loadFeature('./e2e/features/viewFriendRoutes.feature');
const expect = require('expect-puppeteer');
const{defineFeature, loadFeature} = require('jest-cucumber');
const puppeteer = require('puppeteer');

jest.setTimeout(100000);
let page = null;

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

defineFeature(feature, test => {
    beforeEach(async () => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        
        await delay(5000);
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
        
        await delay(5000);
        await page.waitForSelector('input[name="idp"]');
        const firstpage = await expect(page).toMatchElement('input[name="idp"]');
        if(firstpage!==null){
            await page.click('input[name="idp"]');
            await expect(page).toFill('input[name="idp"]', 'https://en2aviade.inrupt.net/profile/card#me')
            await page.click('[type="submit"]');         
            await page.waitForSelector('input[name="username"]');
            const loggedin = await expect(page).toMatchElement('input[name="username"]');
            if(loggedin!==null){
                await expect(page).toFill('input[name="username"]', 'en2aviade' )
                await expect(page).toFill('input[name="password"]', 'Viadeen2aasw!' )
                await page.click('[type="submit"]');
            }
        } 
        await page.waitForSelector('a[href="#/manageFriends"]');
        await page.click('a[href="#/manageFriends"]');
        
        await delay(5000);
        

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
});