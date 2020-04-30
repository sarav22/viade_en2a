/*
const expect = require('expect-puppeteer');
const{defineFeature, loadFeature} = require('jest-cucumber');
const feature = loadFeature('./e2e/features/addFriends.feature');
const puppeteer = require('puppeteer');

jest.setTimeout(100000);
let page = null;

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}


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

    
    test("Alice wants to add an existing user as a friend", ({given, when, then}) => {
        given("Alice does not have Bob as a friend and Bob's webID exists", async () => {
            bob = "https://mariaflorez.solid.community/profile/card#me";
            await expect(page).not.toMatch(bob); //it's supposed that the user is not among alice's friends
        //    await expect(page).toMatch("https://mariaflorez.solid.community/profile/card#me");
      
        });
        
        when("Alice writes Bob's webID and clicks the button 'Add Friend'", async () => {
            await expect(page).toFill('input[id="webId"]', bob);
            await expect(page).toClick('button', { id: 'addFriendButton' });
        });
        
        then("Bob is made Alice's friend and the 'Manage Friends' view is reloaded", async () => {
            await expect(page).toMatch(bob);
        });
    });

    test("Alice wants to add a non-existing user as a friend", ({given, when, then}) => {
        given("Alice wants to add NonExistingUser as a friend", async () => {
            bob = "https://ldufhuerfhffbveiluv.solid.community/profile/card#me";
            await expect(page).not.toMatch(bob); //it's supposed that the user is not among alice's friends
      
        });
        
        when("Alice writes NonExistingUser's webID and clicks the button 'Add Friend'", async () => {
            await expect(page).toFill('input[id="webId"]', bob);
            await expect(page).toClick('button', { id: 'addFriendButton' });
        });
        
        then("an alert indicating the error is shown and the user is not added as a friend", async () => {
            await expect(page).not.toMatch(bob);
        });
    });


 
});*/