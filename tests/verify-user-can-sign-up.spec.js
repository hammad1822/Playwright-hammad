import { test, expect } from '@playwright/test';
const { signUp } = require('./playwright-helpers/signup-helpers.js');


test.describe('Demo Sign Up Test', () => {
    
    let page;

    const randomUsername = Math.random().toString(36).substring(2,7);
    console.log(randomUsername);
    const randomPassword = Math.random().toString(36).substring(2,7);
    console.log(randomPassword);

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        const userSignUp = new signUp(page);
        await userSignUp.gotoSite();
    });

    test('Verify use can sign up a new account', async () => {
        const userSignUp = new signUp(page);
        await userSignUp.signUpNewUser(randomUsername, randomPassword);
        await userSignUp.login(randomUsername,randomPassword);
        //await expect(userSignUp.placeOrderFormSuccessfullyPurchasedPopup).toHaveText('Welcome ' + randomUsername);
    });
});