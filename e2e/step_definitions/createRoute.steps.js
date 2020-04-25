
const{defineFeature, loadFeature} = require('jest-cucumber');
const feature = loadFeature('./e2e/features/manageGroups.feature');

defineFeature(feature, test => {
    beforeEach(async () => {
        /*
        await page.goto('http://localhost:3000');
        let alice = "https://hayquecrearunpod.inrupt.net/profile/card#me";
        await expect(page).toFill('input[name="idp"]', alice );
        await expect(page).toClick('button', { type: 'submit' });
        await expect(page).toFill('input[name="username"]', alice );
        await expect(page).toFill('input[name="password"]', "hayquecrearunpod" );
        await expect(page).toClick('button', { name: 'login' })
        */
        //go to create route
    });

    test('Alice wants to create a valid route', ({given, when, then}) => {
        
        given('Alice wants to create a route', async () => {
            return 'pending';
        });

        when('Alice writes the name, description, points and clicks the button Create', async () => {
            return 'pending';
        });

        then('a message is displayed indicating that the route was uploaded correctly', async () => {
            //await expect(page).toMatch('La ruta se ha guardado en el pod: OK!');
        });

    });

    
});

