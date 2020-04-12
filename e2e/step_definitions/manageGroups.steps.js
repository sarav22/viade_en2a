
const{defineFeature, loadFeature} = require('jest-cucumber');
const feature = loadFeature('./e2e/features/manageGroups.feature');

defineFeature(feature, test=>{
    beforeEach(async()=>{
        /*
        await page.goto('http://localhost:3000');
        let alice = "https://hayquecrearunpod.inrupt.net/profile/card#me";
        await expect(page).toFill('input[name="idp"]', alice )
        await expect(page).toClick('button', { type: 'submit' })
        await expect(page).toFill('input[name="username"]', alice )
        await expect(page).toFill('input[name="password"]', "hayquecrearunpod" )
        await expect(page).toClick('button', { name: 'login' })
        */
        //go to manage groups
    })

    test('Alice wants to create a group', ({given, when, then}) => {
        
        given('Alice has Bob and Claire as friends', async () =>{
            return 'pending';
        });

        when('Alice she selects them of them and writes as name group1', async () =>{
            return 'pending';
        });

        then('the group is stored in her pod', async () =>{
            //await expect(page).toMatch('The group was stored succesfully');
        });

    });

    test('Alice wants to delete a group', ({given, when, then}) => {
        given('Alice has a group named group1', async () =>{
            return 'pending';
        });
        
        when('Alice clicks on the delete button', async () =>{
            return 'pending';
        });
        
        then('the group deleted from the pod', async () =>{
            //await expect(page).toMatch('The group was deleted succesfully');
        });
        
    });
});

