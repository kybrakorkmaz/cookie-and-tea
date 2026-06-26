import { test, expect } from "@playwright/test";
import { registerUserViaApi } from "./auth/register.js";

test.describe("Comment CRUD Operation Suit Test", () => {
    const testCommentPayload = "Very beautiful work, good job!";

    test.beforeEach(async ({ page, context }) => {
        await context.setExtraHTTPHeaders({
            'x-test-bypass': process.env.BYPASS_SECRET || 'test-dev-bypass-key-123!'
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
        if (loginResponseBody.token) {
            await context.addInitScript((token) => {
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

        await page.goto(`/profile/${targetProfile.username}?tab=posts`);

        const postsTabButton = page.getByRole('button', { name: /posts/i });
        if (await postsTabButton.isVisible()) {
            await postsTabButton.click();
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