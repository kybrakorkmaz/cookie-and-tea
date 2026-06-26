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

        // 1. Dynamically register a brand new user account
        const targetProfile = await registerUserViaApi(request);

        // 2.  Headless Login: Exchange the new credentials for a fresh session token/cookie
        const loginResponse = await request.post(`${backendUrl}/api/v1/auth/login`, {
            data: {
                identifier: targetProfile.username,
                password: targetProfile.password || "test-dev-bypass-key-123!"
            }
        });
        expect(loginResponse.status()).toBe(200);

        // 3. Inject cookies/tokens into the active browser context so the UI recognizes the logged-in state
        const loginResponseBody = await loginResponse.json();
        if (loginResponseBody.token) {
            await context.addInitScript((token) => {
                window.localStorage.setItem("token", token);
            }, loginResponseBody.token);
        }

        // 4. Headless Seeding via Feed Router: Create the post under this user's account
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

        // 5. Setup the network spy watching the specific comment endpoint
        const commentResponsePromise = page.waitForResponse(response =>
            response.url().includes(`/api/v1/profile/${targetProfile.username}/posts/${dynamicPostId}/comment`)
            && response.request().method() === "POST"
        );

        // 6. 🎯 FIX: Corrected query parameter syntax format (?tab=posts instead of /tab?=posts)
        await page.goto(`/profile/${targetProfile.username}?tab=posts`);

        // 🎯 FIX: Explicitly target and click the Posts tab button to force the conditional tab layout to mount
        const postsTabButton = page.getByRole('button', { name: /posts/i });
        if (await postsTabButton.isVisible()) {
            await postsTabButton.click();
        }

        // 7. Select, focus, and fill out the text input area inside the <PostCard />
        const commentInput = page.locator('textarea[id="comment"]');
        await expect(commentInput).toBeVisible({ timeout: 10000 });
        await commentInput.fill(testCommentPayload);

        // 8. Submit the comment mutation layout
        //  Changed from generic 'button:has(svg)' to strict accessible role-and-name identifier
        const sendButton = page.getByRole('button', { name: "Send comment" });
        await sendButton.click();

        // 9. Await and verify network execution confirmation
        const response = await commentResponsePromise;
        expect(response.status()).toBe(201);

        const jsonBody = await response.json();
        expect(jsonBody.status).toBe("success");

        // 10. Assert local view updates are cleared down cleanly
        await expect(commentInput).toHaveValue("");
        const successMessage = page.locator('span:has-text("Comment posted!")');
        await expect(successMessage).toBeVisible();
    });
});