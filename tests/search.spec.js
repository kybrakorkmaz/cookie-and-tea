// tests/search.spec.js
import { test, expect } from "@playwright/test";
import { registerUserViaApi } from "./auth/register.js";

test.describe("Live People Search Integration", () => {

    test("should suggest a seeded user in the navbar dropdown and navigate to their profile", async ({ page, request }) => {
        // Seed a fresh active user straight through the backend (bypass header auto-verifies)
        const target = await registerUserViaApi(request);

        // 'domcontentloaded' instead of 'load' — the feed's background polling
        // keeps the load event from settling
        await page.goto("/feed", { waitUntil: 'domcontentloaded' });

        const searchInput = page.locator("#search");
        await expect(searchInput).toBeVisible();

        // Wait for the debounced search request to fire and return a hit
        const searchResponsePromise = page.waitForResponse(response =>
            response.url().includes("/api/v1/search/users") && response.status() === 200
        );
        await searchInput.fill(target.username);
        await searchResponsePromise;

        const option = page.locator("li", { hasText: `@${target.username}` });
        await option.waitFor({ state: "visible", timeout: 10000 });
        await option.click();

        await expect(page).toHaveURL(new RegExp(`/profile/${target.username}/?$`));
    });

    test("should show an empty state when nobody matches the query", async ({ page }) => {
        await page.goto("/feed", { waitUntil: 'domcontentloaded' });

        const searchInput = page.locator("#search");
        await expect(searchInput).toBeVisible();

        const searchResponsePromise = page.waitForResponse(response =>
            response.url().includes("/api/v1/search/users") && response.status() === 200
        );
        await searchInput.fill("zzz-no-such-person-zzz");
        await searchResponsePromise;

        await expect(page.getByText(/no people found/i)).toBeVisible({ timeout: 10000 });
    });
});
