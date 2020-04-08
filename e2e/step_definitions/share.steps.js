const{defineFeature, loadFeature} = require('jest-cucumber');
const feature = loadFeature('./e2e/features/share.feature');

defineFeature(feature, test=>{

    beforeEach(async()=>{
       // await page.goto('http://localhost:3000');
    })

    test('Alice wants to share a route and she is Bob\'s friend', ({given, when, then}) => {
        
        given('Alice has a route and Alice is Bob\'s friend', function () {
            return 'pending';
        });

        when('Alice shares the route with Bob', function () {
            return 'pending';
        });

        then('Bob can see Alice\'s route', function () {
            return 'pending';
        });
                
    });

    test('Alice wants to share a route and she is not Bob\'s friend', ({given, when, then}) => {
        

        given('Alice has a route and Alice is not Bob\'s friend', function () {
            return 'pending';
        });

        when('Alice shares the route with Bob', function () {
            return 'pending';
        });

        then('Bob can\'t see Alice\'s route', function () {
            return 'pending';
        });

        
    });

    test('Alice wants to share a route with a group that exists', ({given, when, then}) => {
       
        given('Alice has a route and Alice has the group created', function () {
            return 'pending';
        });

        when('Alice shares the route with the group', function () {
            return 'pending';
        });

        then('every member that has Alice as friend can see the route', function () {
            return 'pending';
        });

        
    });

    test('Alice wants to share a route with a group that does not exist', ({given, when, then}) => {
    
        given('Alice has a route and Alice doesn\'t have the group created', function () {
            return 'pending';
        });

        when('Alice shares the route with the group', function () {
            return 'pending';
        });

        then('a message appears warning such group does not exist', function () {
            return 'pending';
        });
        
    }); 
    
    test('Alice wants to share a route with a person that does not exist', ({given, when, then}) => {
        
        given('Alice has a route and the person\'s webId does not exist', function () {
            return 'pending';
        });

        when('Alice shares the route with the person', function () {
            return 'pending';
        });

        then('a message appears warning such person does not exist', function () {
            return 'pending';
        });

    });
    
});





