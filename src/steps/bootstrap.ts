import { Given } from "steps/fixtures";
import { createAppContainer, ensureFixtureFileExists, getFixtureFilePath } from "lib";


Given('I start the application with the fixture {string}', async ({ ctx }, dbFileName: string) => {
    const dbFilePath = getFixtureFilePath(dbFileName);
    ensureFixtureFileExists(dbFilePath);

    const containerCleanup = await createAppContainer({
        dbFile: dbFilePath,
    });

    ctx.containerCleanup = containerCleanup;
});