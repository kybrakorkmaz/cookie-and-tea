// tests/comment.spec.js
import { test, expect } from "@playwright/test";
import { registerUserViaApi } from "./auth/register.js";

test.describe("Comment CRUD Operation Suit Test", () => {
    test("should log in newly registered user and create a comment", async ({ page, request }) => {
        const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8001';

        // 1. Setup Auth & Seed Data
        const targetProfile = await registerUserViaApi(request);
        const loginResponse = await request.post(`${backendUrl}/api/v1/auth/login`, {
            data: { identifier: targetProfile.username, password: targetProfile.password }
        });
        const { token } = await loginResponse.json();

        const postResponse = await request.post(`${backendUrl}/api/v1/feed/${targetProfile.username}`, {
            data: { header: "Test Post", content: "Testing...", type: "text" },
            headers: { Authorization: `Bearer ${token}` }
        });
        const { data: post } = await postResponse.json();

        // 2. Auth State Injection
        await page.goto("/");
        await page.evaluate((t) => window.localStorage.setItem("token", t), token);

        // 3. Navigate directly to the profile tab
        // Use 'domcontentloaded' instead of 'load' to prevent hanging on secondary API calls
        await page.goto(`/profile/${targetProfile.username}?tab=posts`, { waitUntil: 'domcontentloaded' });

        // 4. Atomic Interaction: Wait for the post to appear, then interact
        // This is more reliable than waiting for the entire page network to settle
        const postLocator = page.getByText("Test Post");
        await postLocator.waitFor({ state: "visible", timeout: 15000 });

        const commentInput = page.locator('textarea[id="comment"]');
        const sendButton = page.getByRole('button', { name: "Send comment" });

        // Ensure the input exists before we trigger the action
        await expect(commentInput).toBeVisible();

        // Atomic action
        const [commentResponse] = await Promise.all([
            page.waitForResponse(res =>
                res.url().includes(`/posts/${post.id}/comment`) && res.status() === 201
            ),
            commentInput.fill("Very beautiful work, good job!"),
            sendButton.click()
        ]);

        // 5. Assertions
        expect(commentResponse.ok()).toBeTruthy();
        await expect(page.locator('span:has-text("Comment posted!")')).toBeVisible();
    });
});