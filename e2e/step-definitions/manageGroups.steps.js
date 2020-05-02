const expect = require("expect-puppeteer");
const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./e2e/features/manageGroups.feature");
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

  test("Alice wants to create a group", ({ given, when, then }) => {
    given("Alice creates a new group named group1", async () => {
      await page.waitForSelector('div[id="seleccionarGrupo"]');
      await page.click('div[id="seleccionarGrupo"]');

      const newGroup = await page.$x("//span[contains(text(), 'newGroup')]");
      await newGroup[0].click();

      await page.waitForSelector('input[id="groupName"]');
      await expect(page).toFill('input[id="groupName"]', "group1");
      delay(1000);

      await page.waitForSelector('button[id="updateName"]');
      await page.click('button[id="updateName"]');
      delay(1000);
    });

    when("Alice adds Bob to the group", async () => {
      await page.waitForSelector('input[id="webIdGroupAdd"]');
      await expect(page).toFill(
        'input[id="webIdGroupAdd"]',
        "https://agm.inrupt.net/profile/card#me"
      );
      delay(1000);
      await page.waitForSelector('button[id="addToGroupButton"]');
      await page.click('button[id="addToGroupButton"]');
      delay(1000);
    });

    then("the group is stored in her pod", async () => {
      await delay(1000);
      await expect(page).toMatchElement(
        'div[id="https://agm.inrupt.net/profile/card#me"]'
      );
    });
  });

  test("Alice wants to delete a group", ({ given, when, then }) => {
    given("Alice has a group named group1", async () => {
      await page.waitForSelector('div[id="seleccionarGrupo"]');
      await page.click('div[id="seleccionarGrupo"]');

      const group1 = await page.$x("//span[contains(text(), 'group1')]");
      await group1[0].click();
    });

    when("Alice clicks on the delete button", async () => {
      await page.waitForSelector('button[id="deleteGroup"]');
      await page.click('button[id="deleteGroup"]');
      delay(1000);
    });

    then("the group deleted from the pod", async () => {
      await page.waitForSelector('div[id="seleccionarGrupo"]');
      await page.click('div[id="seleccionarGrupo"]');

      console.assert(0 === page.$x("//span[contains(text(), 'group1')]"));
    });
  });
});
