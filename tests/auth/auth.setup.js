// tests/auth/auth.setup.js
import { test as setup, expect } from "@playwright/test";
import { loginUserViaUI, registerUserViaApi } from "./register.js";
const authFile = "playwright/.auth/user.json";

setup("authenticate and seed user session context", async ({ page, request }) => {
    //  Fail fast by requiring the env variable to be present instead of falling back to a committed string
    const bypassSecret = process.env.BYPASS_SECRET;
    if (!bypassSecret) {
        throw new Error("CRITICAL: BYPASS_SECRET environment variable is missing in auth.setup.js configuration.");
    }

    await page.context().setExtraHTTPHeaders({
        'x-test-bypass': bypassSecret
    });

    const credentials = await registerUserViaApi(request, {
        headers: { 'x-test-bypass': bypassSecret }
    });

    const loginResponsePromise = page.waitForResponse(response =>
        response.url().includes("api/v1/auth/login") && response.request().method() === "POST"
    );

    await loginUserViaUI(page, credentials.username, credentials.password);

    const response = await loginResponsePromise;
    expect(response.status()).toBe(200);

    await page.waitForURL(/\/feed\/[^/]+\/?$/);
    await expect(page).toHaveURL(/\/feed\/[^/]+\/?$/);

    await page.context().storageState({ path: authFile });
});