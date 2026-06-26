// tests/comment.spec.js
import { test, expect } from "@playwright/test";
import { registerUserViaApi } from "./auth/register.js";

test.describe("Comment CRUD Operation Suit Test", () => {
    const testCommentPayload = "Very beautiful work, good job!";

    test.beforeEach(async ({ page, context }) => {
        const bypassSecret = process.env.BYPASS_SECRET;
        if (!bypassSecret) {
            throw new Error("❌ CRITICAL: BYPASS_SECRET environment variable is missing in comment.spec.js setup.");
        }

        await context.setExtraHTTPHeaders({
            'x-test-bypass': bypassSecret
        });

        page.on("console", msg => {
            if (msg.type() === "error") console.log(`Browser Error: ${msg.text()}`);
        });

        page.on("requestfailed", request => {
            console.log(`Network Failure. ${request.url()} || Error: ${request.failure()?.errorText}`);
        });
    });

    test("should log in newly registered user and create a comment", async ({ page, context, request }) => {
        const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8001';

        const targetProfile = await registerUserViaApi(request);
        expect(targetProfile.password, "registerUserViaApi must return the generated password").toBeTruthy();

        const loginResponse = await request.post(`${backendUrl}/api/v1/auth/login`, {
            data: {
                identifier: targetProfile.username,
                password: targetProfile.password
            }
        });
        expect(loginResponse.status()).toBe(200);

        const loginResponseBody = await loginResponse.json();

        // Route to base domain first to establish origin control, then seed storage securely
        await page.goto("/");
        if (loginResponseBody.token) {
            await page.evaluate((token) => {
                window.localStorage.setItem("token", token);
            }, loginResponseBody.token);
        }

        const postResponse = await request.post(`${backendUrl}/api/v1/feed/${targetProfile.username}`, {
            data: {
                header: "Automated Integration Test Post",
                content: "Verifying comment operations on profile views.",
                type: "text"
            }
        });
        expect(postResponse.status()).toBe(201);

        const postResponseBody = await postResponse.json();
        const dynamicPostId = postResponseBody.data.id;

        const commentResponsePromise = page.waitForResponse(response =>
            response.url().includes(`/api/v1/profile/${targetProfile.username}/posts/${dynamicPostId}/comment`)
            && response.request().method() === "POST"
        );

        // Initial direct navigation to target profile tab
        await page.goto(`/profile/${targetProfile.username}?tab=posts`);

        const postsTabButton = page.getByRole('button', { name: /^posts$/i });
        await postsTabButton.waitFor({ state: "visible" });
        await postsTabButton.click();

        // 🚀 FIXED: Robust cache recovery logic. Hard-route directly back to the tab query
        // to fully update synchronous hook parameters if a TanStack cache race occurs.
        try {
            await expect(page.getByText("Automated Integration Test Post")).toBeVisible({ timeout: 4000 });
        } catch (e) {
            console.log("⚠️ TanStack cache race detected. Hard routing back to target tab viewpoint...");
            await page.goto(`/profile/${targetProfile.username}?tab=posts`);

            await postsTabButton.waitFor({ state: "visible" });
            await postsTabButton.click();
            await expect(page.getByText("Automated Integration Test Post")).toBeVisible({ timeout: 6000 });
        }

        const commentInput = page.locator('textarea[id="comment"]');
        await expect(commentInput).toBeVisible({ timeout: 10000 });
        await commentInput.fill(testCommentPayload);

        const sendButton = page.getByRole('button', { name: "Send comment" });
        await sendButton.click();

        const response = await commentResponsePromise;
        expect(response.status()).toBe(201);

        const jsonBody = await response.json();
        expect(jsonBody.status).toBe("success");

        await expect(commentInput).toHaveValue("");
        const successMessage = page.locator('span:has-text("Comment posted!")');
        await expect(successMessage).toBeVisible();
    });
});