const expect = require("expect-puppeteer");
const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./e2e/features/manageFriends.feature");
const puppeteer = require("puppeteer");

jest.setTimeout(100000);
let page = null;

function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}

defineFeature(feature, (test) => {
  beforeEach(async () => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    await delay(5000);
    page = await browser.newPage();
    await page.goto("http://localhost:3000");

    await delay(5000);
    await page.waitForSelector('input[name="idp"]');
    const firstpage = await expect(page).toMatchElement('input[name="idp"]');
    if (firstpage !== null) {
      await page.click('input[name="idp"]');
      await expect(page).toFill(
        'input[name="idp"]',
        "https://en2aviade.inrupt.net/profile/card#me"
      );
      await page.click('[type="submit"]');
      await page.waitForSelector('input[name="username"]');
      const loggedin = await expect(page).toMatchElement(
        'input[name="username"]'
      );
      if (loggedin !== null) {
        await expect(page).toFill('input[name="username"]', "en2aviade");
        await expect(page).toFill('input[name="password"]', "Viadeen2aasw!");
        await page.click('[type="submit"]');
      }
    }
    await page.waitForSelector('a[href="#/manageFriends"]');
    await page.click('a[href="#/manageFriends"]');

    await delay(5000);
  });

  test("Alice wants to delete a friend", ({ given, when, then }) => {
    given("Alice has Bob as a friend", async () => {
      await delay(5000);
      await page.waitForSelector('input[id="webId"]');
      await expect(page).toFill(
        'input[id="webId"]',
        "https://podejemplo2.inrupt.net/profile/card#me"
      );
      await page.click('button[id="addFriendButton"]');
      await delay(50000);
      await page.waitForSelector(
        'button[id="buttonFriendhttps://podejemplo2.inrupt.net/profile/card#me"]'
      );
      await expect(page).toMatchElement(
        'button[id="buttonFriendhttps://podejemplo2.inrupt.net/profile/card#me"]'
      );
    });

    when("Alice clicks the button delete", async () => {
      await page.waitForSelector(
        'button[id="https://podejemplo2.inrupt.net/profile/card#medropdown"]'
      );
      await page.click(
        'button[id="https://podejemplo2.inrupt.net/profile/card#medropdown"]'
      );
      await page.waitForSelector(
        'button[id="https://podejemplo2.inrupt.net/profile/card#medropdownDelete"]'
      );
      await page.click(
        'button[id="https://podejemplo2.inrupt.net/profile/card#medropdownDelete"]'
      );
      await delay(10000);
    });

    then("Bob is no longer her friend", async () => {
      await delay(10000);
      await expect(page).not.toMatchElement(
        'button[id="buttonFriendhttps://podejemplo2.inrupt.net/profile/card#me"]'
      );
    });
  });
});
