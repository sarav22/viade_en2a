const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./e2e/features/searchFriends.feature");
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

    await delay(30000);
    page = await browser.newPage();
    await page.goto("http://localhost:3000");

    await delay(10000);
    await page.waitForSelector('input[name="idp"]');
    const firstpage = await expect(page).toMatchElement('input[name="idp"]');
    if (firstpage !== null) {
      await page.click('input[name="idp"]');
      await expect(page).toFill(
        'input[name="idp"]',
        "https://usuarioviadeen2a.inrupt.net/profile/card#me"
      );
      await page.click('[type="submit"]');
      await page.waitForSelector('input[name="username"]');
      const loggedin = await expect(page).toMatchElement(
        'input[name="username"]'
      );
      if (loggedin !== null) {
        await expect(page).toFill('input[name="username"]', "usuarioviadeen2a");
        await expect(page).toFill('input[name="password"]', "Viade-en2a");
        await page.click('[type="submit"]');
      }
    }
    await page.waitForSelector('a[href="#/manageFriends"]');
    await page.click('a[href="#/manageFriends"]');

    await delay(5000);
  });

  test("Alice wants to search for a specific friend", ({
    given,
    when,
    then,
  }) => {
    given("Alice has Bob as a friend", async () => {
      await delay(5000);
      await page.waitForSelector('input[id="webId"]');
      await expect(page).toFill(
        'input[id="webId"]',
        "https://raulpemol.inrupt.net/profile/card#me"
      );
      await page.click('button[id="addFriendButton"]');
      await delay(10000);
      await page.waitForSelector(
        'button[id="buttonFriendhttps://raulpemol.inrupt.net/profile/card#me"]'
      );
      await expect(page).toMatchElement(
        'button[id="buttonFriendhttps://raulpemol.inrupt.net/profile/card#me"]'
      );
      await delay(5000);
      await page.waitForSelector('input[id="webId"]');
      await expect(page).toFill(
        'input[id="webId"]',
        "https://mariaflorez.solid.community/profile/card#me"
      );
      await page.click('button[id="addFriendButton"]');
      await delay(10000);
      await page.waitForSelector(
        'button[id="buttonFriendhttps://mariaflorez.solid.community/profile/card#me"]'
      );
      await expect(page).toMatchElement(
        'button[id="buttonFriendhttps://mariaflorez.solid.community/profile/card#me"]'
      );
    });

    when("Alice writes a string which matches Bob's user", async () => {
      await delay(5000);
      await page.waitForSelector('input[id="inputSearch"]');
      await expect(page).toFill('input[id="inputSearch"]', "raul");
    });

    then("only Bob's friend button is displayed", async () => {
      await delay(5000);
      await expect(page).toMatchElement(
        'button[id="buttonFriendhttps://raulpemol.inrupt.net/profile/card#me"]'
      );
      await expect(page).not.toMatchElement(
        'button[id="buttonFriendhttps://mariaflorez.inrupt.net/profile/card#me"]'
      );

      await delay(5000);

      await expect(page).toFill('input[id="inputSearch"]', "");

      await delay(5000);
    });
  });

  test("Alice wants to search for all friends which match a certain substring", ({
    given,
    when,
    then,
  }) => {
    given(
      "Alice wants to search for all friends whose user contains a certain substring",
      async () => {
        await delay(5000);
        await page.waitForSelector('input[id="webId"]');
        await expect(page).toFill(
          'input[id="webId"]',
          "https://raulpemol.inrupt.net/profile/card#me"
        );
        await page.click('button[id="addFriendButton"]');
        await delay(10000);
        await page.waitForSelector(
          'button[id="buttonFriendhttps://raulpemol.inrupt.net/profile/card#me"]'
        );
        await expect(page).toMatchElement(
          'button[id="buttonFriendhttps://raulpemol.inrupt.net/profile/card#me"]'
        );
        await delay(5000);
        await page.waitForSelector('input[id="webId"]');
        await expect(page).toFill(
          'input[id="webId"]',
          "https://mariaflorez.solid.community/profile/card#me"
        );
        await page.click('button[id="addFriendButton"]');
        await delay(10000);
        await page.waitForSelector(
          'button[id="buttonFriendhttps://mariaflorez.solid.community/profile/card#me"]'
        );
        await expect(page).toMatchElement(
          'button[id="buttonFriendhttps://mariaflorez.solid.community/profile/card#me"]'
        );
      }
    );

    when("Alice writes that substring", async () => {
      await delay(5000);
      await page.waitForSelector('input[id="inputSearch"]');
      await expect(page).toFill('input[id="inputSearch"]', "profile");
    });

    then(
      "the buttons for all friends whose user match that substring are displayed",
      async () => {
        await expect(page).toMatchElement(
          'button[id="buttonFriendhttps://raulpemol.inrupt.net/profile/card#me"]'
        );
        await expect(page).toMatchElement(
          'button[id="buttonFriendhttps://mariaflorez.solid.community/profile/card#me"]'
        );

        await delay(5000);
      }
    );
  });
});
