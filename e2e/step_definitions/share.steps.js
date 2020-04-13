const{defineFeature, loadFeature} = require('jest-cucumber');
const feature = loadFeature('./e2e/features/share.feature');
const puppeteer = require('puppeteer');

defineFeature(feature, test=> {

   // let route;
    beforeEach(async()=> {
        /*
        await page.goto('http://localhost:3000');
        let alice = "https://hayquecrearunpod.inrupt.net/profile/card#me";
        await expect(page).toFill('input[name="idp"]', alice )
        //submit
        await page.evaluate(()=>document.querySelector('#root > div.sc-hrWEMg.dyHRcO > div.sc-bdVaJa.jOKaIj.sc-bsbRJL.eGaoon > section > div > div > div > div > form > button.sc-gzVnrw.isbeaB.ids-link').click())
        await expect(page).toFill('input[name="username"]', alice )
        await expect(page).toFill('input[name="password"]', "hayquecrearunpod" )
        await expect(page).toClick('button', { name: 'login' })
        await expect(page).toClick('a', { href: 'viewRoutes' })
        await expect(page).toClick({type:'xpath', value:'\\a'}, {href: 'viewRoutes' })
        route= 'https://hayquecrearunpod.inrupt.net/viade/routes/ruta.txt';
        */
    })

    test('Alice wants to share a route with Bob', ({given, when, then}) => {
      //  let bob;
        given('Alice has a route', async () => {
         //   bob = '';
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


    test('Alice wants to share a route with a group that exists', ({given, when, then}) => {
       // let group ='';
        given('Alice has a route and Alice has the group created', async () => {
            /*
           group ='';
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

    test('Alice wants to share a route with a group that does not exist', ({given, when, then}) => {
      //  let group;
        given('Alice has a route and Alice doesn\'t have the group created', async () => {
           /* group='';
            await expect(page).toClick('button', { text: route });
            */
        });

        when('Alice shares the route with the group', async () => {
            /*
            await expect(page).toClick('button', { text: 'Share route' });
            await expect(page).toFill('input[name="inputShare"]', group );
            */
         
        });

        then('a message appears warning such group does not exist', async () => {
            //await expect(page).toMatch('The group does not exist');
        });
        
    }); 
});