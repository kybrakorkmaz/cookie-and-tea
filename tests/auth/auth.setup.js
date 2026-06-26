import {test as setup, expect} from "@playwright/test";
import {loginUserViaUI, registerUserViaApi} from "./register.js";
const authFile = "playwright/.auth/user.json";

setup("authenticate and seed user session context", async ({page, request}) => {
    await page.context().setExtraHTTPHeaders({
        'x-test-bypass': process.env.BYPASS_SECRET
    });
    // 1. Instantly spin up a backend test user using your existing API helper
    const credentials = await registerUserViaApi(request);

    const loginResponsePromise = page.waitForResponse(response =>
    response.url().includes("api/v1/auth/login") && response.request().method() === "POST");

    // 2. Perform UI login execution
    await loginUserViaUI(page, credentials.username, credentials.password);

    const response = await loginResponsePromise;
    expect(response.status()).toBe(200);

    // 3. Confirm route matching
    await page.waitForURL(/\/feed\/[^/]+\/?$/);
    await expect(page).toHaveURL(/\/feed\/[^/]+\/?$/);

    // 4. save cookies and localStorage states cleanly into the JSON state map
    await page.context().storageState({ path: authFile });
})