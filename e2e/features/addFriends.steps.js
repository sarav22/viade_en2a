const{defineFeature, loadFeature} = require('jest-cucumber');
const feature = loadFeature('./e2e/features/addFriends.feature');
const puppeteer = require('puppeteer');

defineFeature(feature, test=>{

    let alice;
    let bob;
    let browser;
    let page;

    beforeEach(async()=>{
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/login');
        alice = "https://hayquecrearunpod.inrupt.net/profile/card#me";
        await expect(page).toFill('input[name="idp"]', alice )
        await expect(page).toClick('button', { type: 'submit' })
        await expect(page).toFill('input[name="username"]', alice )
        await expect(page).toFill('input[name="password"]', "hayquecrearunpod" )
        await expect(page).toClick('button', { name: 'login' })
        await expect(page).toClick('a', { href: 'manageFriends' })
        await expect(page).toClick({type:'xpath', value:'\\a'}, {href: 'manageFriends' })
    });

    
    test("Alice wants to add an existing user as a friend", ({given, when, then}) => {
        given("Alice does not have Bob as a friend and Bob's webID exists", async () =>{
            bob = "https://mariaflorez.solid.community/profile/card#me";
            await expect(page).not.toMatch(bob); //it's supposed that the user is not among alice's friends
        //    await expect(page).toMatch("https://mariaflorez.solid.community/profile/card#me");
      
        });
        
        when("Alice writes Bob's webID and clicks the button 'Add Friend'", async () =>{
            await expect(page).toFill('input[id="webId"]', bob);
            await expect(page).toClick('button', { id: 'addFriendButton' });
        });
        
        then("Bob is made Alice's friend and the 'Manage Friends' view is reloaded", async () =>{
            await expect(page).toMatch(bob);
        });
    });

    test("Alice wants to add a non-existing user as a friend", ({given, when, then}) => {
        given("Alice wants to add NonExistingUser as a friend", async () =>{
            bob = "https://ldufhuerfhffbveiluv.solid.community/profile/card#me";
            await expect(page).not.toMatch(bob); //it's supposed that the user is not among alice's friends
      
        });
        
        when("Alice writes NonExistingUser's webID and clicks the button 'Add Friend'", async () =>{
            await expect(page).toFill('input[id="webId"]', bob);
            await expect(page).toClick('button', { id: 'addFriendButton' });
        });
        
        then("an alert indicating the error is shown and the user is not added as a friend", async () =>{
            await expect(page).not.toMatch(bob);
        });
    });


 
});