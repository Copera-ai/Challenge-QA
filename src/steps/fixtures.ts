import type { Locator, Page } from "playwright";
import { test as bddTest, createBdd } from "playwright-bdd";



type Fixture = {
    ctx: {
        containerCleanup?: () => Promise<void>;
    };
};

export const test = bddTest.extend<Fixture>({
    ctx: async ({ }, use) => {
        await use({});
    },
});

export const {
    Given,
    When,
    Then,
    BeforeWorker,
    AfterWorker,
    BeforeScenario,
    AfterScenario,
} = createBdd(test);
