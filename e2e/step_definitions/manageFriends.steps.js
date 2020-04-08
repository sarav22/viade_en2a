const{defineFeature, loadFeature} = require('jest-cucumber');
const feature = loadFeature('./e2e/features/manageFriends.feature');
defineFeature(feature, test=>{

    beforeEach(async()=>{
       // await page.goto('http://localhost:3000');
    })

    test('Alice wants to delete a friend', ({given, when, then}) => {
        given('Alice has Bob as a friend', function () {
            return 'pending';
        });
        
        when('Alice clicks the button delete', function () {
            return 'pending';
        });
        
        then('Bob is no longer her friend', function () {
            return 'pending';
        });
    });

    test('Alice wants to see Bob\'s profile', ({given, when, then}) => {
        given('Alice has Bob as a friend', function () {
            return 'pending';
        });
        
        when('Alice clicks the button view profile', function () {
            return 'pending';
        });
        
        then('Alice sees his card at the pod', function () {
            return 'pending';
        });
    });

    test('Alice wants to see Bob\'s routes way 1', ({given, when, then}) => {
        given('Alice has Bob as a friend', function () {
            return 'pending';
        });
        
        when('Alice clicks the button view routes', function () {
            return 'pending';
        });
        
        then('Alice sees his list of routes', function () {
            return 'pending';
        });
        
    });

    test('Alice wants to see Bob\'s routes way 2', ({given, when, then}) => {
        given('Alice has Bob as a friend', function () {
            return 'pending';
        });
        
        when('Alice clicks Bob\'s button', function () {
            return 'pending';
        });
        
        then('Alice sees his list of routes', function () {
            return 'pending';
        });
        
        
    });
});





