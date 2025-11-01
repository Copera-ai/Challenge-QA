import { Given } from "steps/fixtures";


Given('I navigate to the login page', async ({ page }) => {
    await page.goto('/login', { timeout: 10000 });
});