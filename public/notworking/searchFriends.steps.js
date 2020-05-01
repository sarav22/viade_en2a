/*
const{defineFeature, loadFeature} = require('jest-cucumber');
const feature = loadFeature('./e2e/features/searchFriends.feature');
const puppeteer = require('puppeteer');

jest.setTimeout(100000);
let page = null;

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

defineFeature(feature, test => {

    
    let bob;
    let page;


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

    
    test("Alice wants to search for a specific friend", ({given, when, then}) => {
        given("Given Alice has Bob as a friend", async () => {
            bob = "https://mariaflorez.solid.community/profile/card#me"; //problem with the way the user name is displayed?
            await expect(page).toMatch(bob); //it's supposed that the user is among alice's friends
      
        });
        
        when("When Alice writes a string which matches Bob's user", async () => {
            await expect(page).toFill('input[id="inputSearch"]', bob);
        });
        
        then("Then only Bob's friend button is displayed", async () => {
            await expect(page).toMatch(bob); //make sure that he is the only button that is displayed?
        });
    });


    test("Alice wants to search for all friends which match a certain substring", ({given, when, then}) => {
        given("Alice wants to search for all friends whose user contains a certain substring", async () => {
            bob = "maria";
            await expect(page).toMatch(bob);
      
        });
        
        when("Alice writes that substring", async () => {
            await expect(page).toFill('input[id="inputSearch"]', bob);
        });
        
        then("the buttons for all friends whose user match that substring are displayed", async () => {
            await expect(page).toMatch(bob);
        });
    });


 
});*/