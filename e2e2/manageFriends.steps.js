/*const{defineFeature, loadFeature} = require('jest-cucumber');
const feature = loadFeature('./e2e/features/manageFriends.feature');
defineFeature(feature, test=>{

    let alice;
    let bob;
    beforeEach(async()=>{
        await page.goto('http://localhost:3000/login');
        alice = "https://hayquecrearunpod.inrupt.net/profile/card#me";
        await expect(page).toFill('input[name="idp"]', alice )
        await expect(page).toClick('button', { type: 'submit' })
        await expect(page).toFill('input[name="username"]', alice )
        await expect(page).toFill('input[name="password"]', "hayquecrearunpod" )
        await expect(page).toClick('button', { name: 'login' })
        await expect(page).toClick('a', { href: 'manageFriends' })
        await expect(page).toClick({type:'xpath', value:'\\a'}, {href: 'manageFriends' })


    })

    test('Alice wants to delete a friend', ({given, when, then}) => {
        given('Alice has Bob as a friend', async () =>{
            bob = "https://uo265363.solid.community/profile/card#me";
        //    await expect(page).toMatch("https://uo265363.solid.community/profile/card#me");
      
        });
        
        when('Alice clicks the button delete', async () =>{
            await expect(page).toClick('button', { id: 'dropdown' });
            await expect(page).toClick('button', { text: 'Delete' });
        });
        
        then('Bob is no longer her friend', async () =>{
            await expect(page).toMatch( bob);
        });
    });


 
});*/





