import { test, expect } from '@playwright/test';
const { signUp } = require('./playwright-helpers/signup-helpers.js');
const { purchaseItem } = require('./playwright-helpers/purshase-item-helpers.js');

test.describe('Purchase Items', () => {

    let page;

    const randomUsername = Math.random().toString(36).substring(2,7);
    console.log(randomUsername);
    const randomPassword = Math.random().toString(36).substring(2,7);
    console.log(randomPassword);

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        const userSignUp = new signUp(page);
        await userSignUp.gotoSite();
        await userSignUp.signUpNewUser(randomUsername, randomPassword);
        await userSignUp.login(randomUsername,randomPassword);
        //await expect(userSignUp.welcomeText).toHaveText('Welcome ' + randomUsername);
    });

    test('Verify use can purchase item', async () => {

        const userPurchaseItem = new purchaseItem(page);
        await userPurchaseItem.addFirstProductToCart();
        await userPurchaseItem.gotoCart();
        const totalAmountText = userPurchaseItem.totalAmount;
        await expect(userPurchaseItem.totalAmount).toEqual(totalAmountText);
        await userPurchaseItem.placeOrder();
        await expect(userPurchaseItem.placeOrderFormSuccessfullyPurchasedPopup).toHaveText('Thank you for your purchase!');
    });
});