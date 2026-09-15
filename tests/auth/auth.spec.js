// tests/auth/auth.test.js
import { test, expect } from "@playwright/test";
import { loginUserViaUI, registerUserViaApi } from "./register.js";

test.describe("Sign Up & Login & Logout Full-Stack Integration", () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({ page }) => {
        page.on('console', msg => {
            if (msg.type() === 'error') console.log(`Browser Error: ${msg.text()}`);
        });
        page.on('requestfailed', request => {
            console.log(`Network Failure. ${request.url()} || Error: ${request.failure()?.errorText}`);
        });
    });

    test("should successfully communicate with cat_test_api on port 8001 to register a user", async ({ page }) => {
        const registerResponsePromise = page.waitForResponse(response =>
            response.url().includes("/api/v1/auth/sign-up") && response.request().method() === "POST"
        );

        await page.goto("/sign-up");
        const uniqueId = `tester_${Date.now()}`;

        await page.getByLabel('Name', { exact: true }).fill("Kubra Test");
        await page.getByLabel('Username', { exact: true }).fill(uniqueId);
        await page.getByLabel('Email', { exact: true }).fill(`${uniqueId}@cookieandtea.com`);

        await page.locator('input[name="password"]').fill("Secret123!");
        await page.locator('input[name="confirmPassword"]').fill("Secret123!");

        await expect(page.getByRole('alert')).not.toBeVisible();
        await page.getByRole('button', { name: /create my account!/i }).click();

        const response = await registerResponsePromise;
        expect(response.status()).toBe(201);
        await expect(page.getByLabel('Username', { exact: true })).toHaveValue('');

        // Green success toast points the user at their inbox for the verification link
        const successToast = page.getByRole('status');
        await expect(successToast).toBeVisible();
        await expect(successToast).toContainText(/account created!/i);
    });

    test("Should log in users using username as identifier", async ({ page, request }) => {
        const credentials = await registerUserViaApi(request);

        const loginResponsePromise = page.waitForResponse(response =>
            response.url().includes("/api/v1/auth/login") && response.request().method() === "POST"
        );

        await loginUserViaUI(page, credentials.username, credentials.password);

        const response = await loginResponsePromise;
        expect(response.status()).toBe(200);

        await page.waitForURL(/\/feed\/?$/);
        await expect(page).toHaveURL(/\/feed\/?$/);
    });

    test("Should log in users using email as identifier", async ({ page, request }) => {
        const credentials = await registerUserViaApi(request);

        const loginResponsePromise = page.waitForResponse(response =>
            response.url().includes("/api/v1/auth/login") && response.request().method() === "POST"
        );

        await loginUserViaUI(page, credentials.email, credentials.password);

        const response = await loginResponsePromise;
        expect(response.status()).toBe(200);

        await page.waitForURL(/\/feed\/?$/);
        await expect(page).toHaveURL(/\/feed\/?$/);
    });

    test("Should show a red error toast on invalid login credentials", async ({ page, request }) => {
        const credentials = await registerUserViaApi(request);

        const loginResponsePromise = page.waitForResponse(response =>
            response.url().includes("/api/v1/auth/login") && response.request().method() === "POST"
        );

        await loginUserViaUI(page, credentials.username, "DefinitelyWrong123!");

        const response = await loginResponsePromise;
        expect(response.status()).toBe(401);

        // Red server-error toast surfaces the backend message
        const errorToast = page.getByRole('alert');
        await expect(errorToast).toBeVisible();

        // Dismissing the toast clears it
        await errorToast.getByRole('button', { name: /close notification/i }).click();
        await expect(page.getByRole('alert')).not.toBeVisible();
    });

    test("Should show green banner on /login?verified=1 and clear it on dismiss", async ({ page }) => {
        await page.goto("/login?verified=1");
        await expect(page.getByRole('heading', { name: /^login$/i })).toBeVisible();

        const banner = page.getByText("Your email has been verified successfully! You can now log in.", { exact: true });
        await expect(banner).toBeVisible();

        const toast = page.locator('[role="status"]', { has: banner });
        await toast.getByRole('button', { name: /close notification/i }).click();
        await expect(banner).not.toBeVisible();
        // Dismissal also strips the query params from the URL
        await expect(page).not.toHaveURL(/verified=/);
    });

    test("Should show red banner on /login?verified=0&reason=invalid-or-expired", async ({ page }) => {
        await page.goto("/login?verified=0&reason=invalid-or-expired");

        const banner = page.getByRole('alert');
        await expect(banner).toBeVisible();
        await expect(banner).toContainText(/invalid or has expired/i);
    });
});
