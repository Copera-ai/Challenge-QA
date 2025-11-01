import { AfterScenario, BeforeScenario } from "steps/fixtures";


AfterScenario(async ({ ctx }) => {
    await ctx.containerCleanup?.();
});