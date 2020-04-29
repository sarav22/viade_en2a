const{defineFeature, loadFeature} = require('jest-cucumber');
const feature = loadFeature('./e2e/features/searchFriends.feature');
const puppeteer = require('puppeteer');

defineFeature(feature, test => {

    let alice;
    let bob;
    let browser;
    let page;

    beforeEach(async() => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/login');
        alice = "https://hayquecrearunpod.inrupt.net/profile/card#me";
        await expect(page).toFill('input[name="idp"]', alice );
        await expect(page).toClick('button', { type: 'submit' });
        await expect(page).toFill('input[name="username"]', alice );
        await expect(page).toFill('input[name="password"]', "hayquecrearunpod" );
        await expect(page).toClick('button', { name: 'login' });
        await expect(page).toClick('a', { href: 'manageFriends' });
        await expect(page).toClick({type:'xpath', value:'\\a'}, {href: 'manageFriends' });
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


 
});