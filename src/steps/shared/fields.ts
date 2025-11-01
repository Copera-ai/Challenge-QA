import { When } from "steps/fixtures";


When('I type {string} into field with label {string}', async ({ page }, value: string, label: string,) => {
    await page.getByRole('textbox', { name: label }).fill(value);
});