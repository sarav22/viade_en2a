import { setDefaultOptions } from "expect-puppeteer";
const expect = require("expect-puppeteer");
const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./e2e/features/share.feature");
const puppeteer = require("puppeteer");

jest.setTimeout(100000);
let page = null;

function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}

setDefaultOptions({ timeout: 100000 });

defineFeature(feature, (test) => {
  beforeEach(async () => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1366, height: 768 },
    });

    await delay(30000);
    page = await browser.newPage();
    await page.goto("http://localhost:3000");

    await delay(15000);
    await page.waitForSelector('input[name="idp"]');
    await expect(page).toMatchElement('input[name="idp"]');

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

    await page.waitForSelector('a[href="#/seeRoutes"]');
    await page.click('a[href="#/seeRoutes"]');

    await delay(10000);
  });

  test("Alice wants to share a route with Bob", ({ given, when, then }) => {
    given("Alice has a route", async () => {
      delay(3000);
      await page.waitForSelector(
        'a[href="/viade_en2a/#/map/ZW4yYXZpYWRlLmlucnVwdC5uZXQvdmlhZGUvcm91dGVzL01hcl9hYjM4OWU5Yi1kMTIyLTRhMmQtYjhiMS1mZTE2ZTYxNzIzNjIuanNvbmxk"]'
      );
      page.click(
        'a[href="/viade_en2a/#/map/ZW4yYXZpYWRlLmlucnVwdC5uZXQvdmlhZGUvcm91dGVzL01hcl9hYjM4OWU5Yi1kMTIyLTRhMmQtYjhiMS1mZTE2ZTYxNzIzNjIuanNvbmxk"]'
      );
    });

    when("Alice shares the route with Bob", async () => {
      delay(10000);
      await page.waitForSelector('button[id="buttonShare"]');
      await page.click('button[id="buttonShare"]');
      delay(1000);
      await page.waitForSelector('input[id="inputShare"]');
      await expect(page).toFill(
        'input[id="inputShare"]',
        "https://en2aviade2.inrupt.net/profile/card#me"
      );
      delay(1000);
      await page.waitForSelector('button[id="shareWith"]');
      await page.click('button[id="shareWith"]');
    });

    then("a message appears saying that the route was shared", async () => {
      await expect(page).toMatchElement(
        'div[class="Toastify__toast-container Toastify__toast-container--top-center sc-ipXKqB jwhyhx solid-toaster-container"]'
      );
    });
  });
});
