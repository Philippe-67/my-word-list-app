// integration-tests/e2e/steps/my-feature-steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, expect, Browser, Page } from '@playwright/test';

let browser: Browser;
let page: Page;

Given('je suis sur la page d\'inscription', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('http://localhost:5173'); // Assurez-vous que l'URL est correcte
  await page.waitForLoadState('networkidle'); // Attendre que le réseau soit inactif
});

When('je remplis le formulaire avec les informations de connexion', async function () {
  await page.fill('input[placeholder="Email"]', 'philou@test.com');
  await page.fill('input[placeholder="Mot de passe"]', '123');
});

When('je clique sur le bouton {string}', async function (buttonText) {
  await page.click(`button:has-text("${buttonText}")`);
});

Then('je devrais voir le texte {string} sur la page', async function (expectedText: string) {
  await page.waitForLoadState('networkidle'); // Attendre que le réseau soit inactif
  await expect(page.locator('text=' + expectedText)).toBeVisible(); // Vérifier que le texte est visible sur la page
  //await browser.close();
});
