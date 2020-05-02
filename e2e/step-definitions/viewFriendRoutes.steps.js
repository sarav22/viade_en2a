import { setDefaultOptions } from "expect-puppeteer";

const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./e2e/features/viewFriendRoutes.feature");
const expect = require("expect-puppeteer");
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
  beforeEach(
    async () => {
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1366, height: 768 },
      });

      await delay(30000);
      page = await browser.newPage();
      await page.goto("http://localhost:3000");

      await delay(10000);
      await page.waitForSelector('input[name="idp"]');
      /*const firstpage = */ await expect(page).toMatchElement(
        'input[name="idp"]'
      );
      //if (firstpage !== null) {
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
    //}
  );

  test("Listing the routes created by a friend", ({ given, when, then }) => {
    given("I click on the 'Manage Friends' navbar option", async () => {
      await page.waitForSelector('a[href="#/manageFriends"]');
      await page.click('a[href="#/manageFriends"]');
      await delay(5000);
    });

    when("I click on one friend", async () => {
      await page.waitForSelector(
        'button[id="buttonFriendhttps://en2aviade2.inrupt.net/profile/card#me"]'
      );
      await page.click(
        'button[id="buttonFriendhttps://en2aviade2.inrupt.net/profile/card#me"]'
      );
      await delay(10000);
    });

    then(
      "A window with the name of that friend and a list of all his shared routes should appear",
      async () => {
        await expect(page).toMatchElement(
          'a[href="/viade_en2a/#/map/ZW4yYXZpYWRlMi5pbnJ1cHQubmV0L3ZpYWRlL3JvdXRlcy9BdXN0cmFsaWFfMTQzN2NjNDEtMTcyOS00ODZlLTliNDAtNTcwZWE0ZGViODgwLmpzb25sZA=="]'
        );
      }
    );
  });

  test("Viewing a shared route", ({ given, when, then }) => {
    given("I already clicked on one friend", async () => {
      await page.waitForSelector('a[href="#/manageFriends"]');
      await page.click('a[href="#/manageFriends"]');
      await delay(5000);
      await page.waitForSelector(
        'button[id="buttonFriendhttps://en2aviade2.inrupt.net/profile/card#me"]'
      );
      await page.click(
        'button[id="buttonFriendhttps://en2aviade2.inrupt.net/profile/card#me"]'
      );
      await delay(10000);
    });

    when("I click on a route", async () => {
      await page.waitForSelector(
        'a[href="/viade_en2a/#/map/ZW4yYXZpYWRlMi5pbnJ1cHQubmV0L3ZpYWRlL3JvdXRlcy9BdXN0cmFsaWFfMTQzN2NjNDEtMTcyOS00ODZlLTliNDAtNTcwZWE0ZGViODgwLmpzb25sZA=="]'
      );
      await page.click(
        'a[href="/viade_en2a/#/map/ZW4yYXZpYWRlMi5pbnJ1cHQubmV0L3ZpYWRlL3JvdXRlcy9BdXN0cmFsaWFfMTQzN2NjNDEtMTcyOS00ODZlLTliNDAtNTcwZWE0ZGViODgwLmpzb25sZA=="]'
      );
      await delay(10000);
    });

    then("I see it displayed on the map", async () => {
      await expect(page).toMatchElement('div[id="mapView"]');
    });
  });

  test("Clicking on the wrong friend", ({ given, when, then }) => {
    given("I already clicked on one friend", async () => {
      await page.waitForSelector('a[href="#/manageFriends"]');
      await page.click('a[href="#/manageFriends"]');
      await delay(5000);
      await page.waitForSelector(
        'button[id="buttonFriendhttps://en2aviade2.inrupt.net/profile/card#me"]'
      );
      await page.click(
        'button[id="buttonFriendhttps://en2aviade2.inrupt.net/profile/card#me"]'
      );
      await delay(10000);
    });

    when("I click the 'Back' button", async () => {
      await page.waitForSelector('button[class="backButton btn btn-light"]');
      await page.click('button[class="backButton btn btn-light"]');
      await delay(5000);
    });

    then("The 'Manage Friends' view should be shown", async () => {
      await expect(page).toMatchElement(
        'button[id="buttonFriendhttps://en2aviade2.inrupt.net/profile/card#me"]'
      );
    });
  });
});
