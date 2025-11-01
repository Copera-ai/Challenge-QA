import { Then } from "steps/fixtures";


Then('I should see the {string} element', async ({ page }, element: string) => {
    await page.getByText(element).isVisible();
});
