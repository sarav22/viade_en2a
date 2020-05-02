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



defineFeature(feature, test => {
    beforeEach(async () => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        
        await delay(30000);
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
        
        await delay(10000);
        await page.waitForSelector('input[name="idp"]');
        const firstpage = await expect(page).toMatchElement('input[name="idp"]');
        if (firstpage !== null) {
            await page.click('input[name="idp"]');
            await expect(page).toFill(
              'input[name="idp"]',
              "https://usuarioviadeen2a.inrupt.net/profile/card#me"
            );
            await page.click('[type="submit"]');
            await page.waitForSelector('input[name="username"]');
            const loggedin = await expect(page).toMatchElement(
              'input[name="username"]'
            );
            if (loggedin !== null) {
              await expect(page).toFill('input[name="username"]', "usuarioviadeen2a");
              await expect(page).toFill('input[name="password"]', "Viade-en2a");
              await page.click('[type="submit"]');
            }
          }
          await page.waitForSelector('a[href="#/manageFriends"]');
          await page.click('a[href="#/manageFriends"]');
      
          await delay(5000);
    });


    test("Alice wants to add an existing user as a friend", ({given, when, then}) => {
        given("Alice does not have Bob as a friend and Bob's webID exists", async () => {
            
              await delay(10000);
              await expect(page).not.toMatchElement(
                'button[id="buttonFriendhttps://podejemplo2.inrupt.net/profile/card#me"]'
            );
        });
        
        when("Alice writes Bob's webID and clicks the button Add Friend", async () => {
            await delay(10000);
            await page.waitForSelector('input[id="webId"]');
            await expect(page).toFill(
                'input[id="webId"]',
                "https://podejemplo2.inrupt.net/profile/card#me"
            );
            await page.click('button[id="addFriendButton"]');
            
        });
        
        then("Bob is made Alice's friend and the Manage Friends view is reloaded", async () => {
            await delay(50000);
            await page.waitForSelector(
                'button[id="buttonFriendhttps://podejemplo2.inrupt.net/profile/card#me"]'
            );
            await expect(page).toMatchElement(
                'button[id="buttonFriendhttps://podejemplo2.inrupt.net/profile/card#me"]'
            );

            //Delete the friend to make the test able to run again
            await page.click(
                'button[id="https://podejemplo2.inrupt.net/profile/card#medropdown"]'
              );
              await page.waitForSelector(
                'button[id="https://podejemplo2.inrupt.net/profile/card#medropdownDelete"]'
              );
              await page.click(
                'button[id="https://podejemplo2.inrupt.net/profile/card#medropdownDelete"]'
              );
              await delay(10000);
              await expect(page).not.toMatchElement(
                'button[id="buttonFriendhttps://podejemplo2.inrupt.net/profile/card#me"]'
              );
        });
    });

    test("Alice wants to add a non-existing user as a friend", ({given, when, then}) => {
        given("Alice wants to add NonExistingUser as a friend", async () => {
            await delay(10000);
            await expect(page).not.toMatchElement(
                'button[id="buttonFriendhttps://ldufhuerfhffbveiluv.solid.community/profile/card#me"]'
            );
        });
        
        when("Alice writes NonExistingUser's webID and clicks the button Add Friend", async () => {
            await delay(10000);
            await page.waitForSelector('input[id="webId"]');
            await expect(page).toFill(
                'input[id="webId"]',
                "https://ldufhuerfhffbveiluv.solid.community/profile/card#me"
            );
            await page.click('button[id="addFriendButton"]');
        });
        
        then("an alert indicating the error is shown and the user is not added as a friend", async () => {
            await delay(10000);
            await expect(page).not.toMatchElement(
                'button[id="buttonFriendhttps://ldufhuerfhffbveiluv.solid.community/profile/card#me"]'
              );
            
        });
    });



});