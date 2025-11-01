import { Then } from "steps/fixtures";


Then('I should be on page path {string}', async ({ page }, url: string) => {
    await page.waitForURL(url);
});