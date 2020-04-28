  
import { setDefaultOptions } from 'expect-puppeteer';
const expect = require('expect-puppeteer');
const{defineFeature, loadFeature} = require('jest-cucumber');
const feature = loadFeature('./e2e/features/manageFriends.feature');
setDefaultOptions({ timeout: 100000 }) 

defineFeature(feature, test => {

    beforeEach(async () => {
        await page.goto('http://localhost:3000');
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
     //   await page.waitForSelector('a[id="manageFriends"]');
    //    await page.click('a[id="manageFriends"]');
        

    });

    test('Alice wants to delete a friend', ({given, when, then}) => {
        given('Alice has Bob as a friend', async () => {
            await expect(page).toMatchElement('button[id="buttonFriendhttps://podejemplo2.inrupt.net/profile/card#me"]');
      
        });
        
        when('Alice clicks the button delete', async () => {
            await page.waitForSelector('button[id="https://podejemplo2.inrupt.net/profile/card#medropdown"]');
            await page.click('button[id="https://podejemplo2.inrupt.net/profile/card#medropdown"]');
            await page.click('button[text="Delete"]');
            
        });
        
        then('Bob is no longer her friend', async () => {
            await expect(page).not.toMatchElement('button[id="buttonFriendhttps://podejemplo2.inrupt.net/profile/card#me"]');
    
        });
    });
});





