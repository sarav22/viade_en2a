
const{defineFeature, loadFeature} = require('jest-cucumber');
const feature = loadFeature('./e2e/features/manageGroups.feature');

defineFeature(feature, test=>{

    beforeEach(async()=>{
        //await page.goto('http://localhost:3000');
    })

    test('Alice wants to create a group', ({given, when, then}) => {
        
        given('Alice has Bob and Claire as friends', function () {
            return 'pending';
        });

        when('Alice she selects them of them and writes as name group1', function () {
            return 'pending';
        });

        then('the group is stored in her pod', function () {
            return 'pending';
        });

    });

    test('Alice wants to delete a group', ({given, when, then}) => {
        given('Alice has a group named group1', function () {
            return 'pending';
        });
        
        when('Alice clicks on the delete button', function () {
            return 'pending';
        });
        
        then('the group deleted from the pod', function () {
            return 'pending';
        });
        
    });
});



