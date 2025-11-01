import { Given } from "steps/fixtures";


Given('I click the {string} button', async ({ page }, buttonText: string) => {
    await page.getByRole('button', { name: buttonText }).click();
});