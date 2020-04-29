const expect = require('expect-puppeteer');
const{defineFeature, loadFeature} = require('jest-cucumber');
const feature = loadFeature('./e2e/features/share.feature');
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

    test('Alice wants to share a route with Bob', ({given, when, then}) => {

        given('Alice has a route', async () => {
            //await expect(page).toClick('button', { text: route })
        });

        when('Alice shares the route with Bob', async () => {
            /*
            await expect(page).toClick('button', { text: 'Share route' });
            await expect(page).toFill('input[name="inputShare"]', bob );
            */
        });

        then('a message appears saying that the route was shared', async () => {
            //await expect(page).toMatch('The route was shared succesfully');
        });
                
    });


    test('Alice wants to share a route with a group', ({given, when, then}) => {

        given('Alice has a route and Alice has the group created', async () => {
            /*
            await expect(page).toClick('button', { text: route });
            */
        });

        when('Alice shares the route with the group', async () => {
            /* 
            await expect(page).toClick('button', { text: 'Share route' });
            await expect(page).toFill('input[name="inputShare"]', group );
            */
        });

        then('a message appears saying that the route was shared', async () => {
          //  await expect(page).toMatch('The route was shared succesfully');
        });
               
        
    });


});