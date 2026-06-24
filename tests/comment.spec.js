import {test, expect} from "@playwright/test";
test.describe("Comment CRUD Operation Suit Test", () => {
    // Force this file to bypass the global pre-authenticated state if creating a custom user,
    // OR keep it if using a globally seeded user.
    test.use({ storageState: 'playwright/.auth/user.json' });

    // If "test_user_6708" does not exist in your DB seeds, these must be updated
    // to credentials that genuinely exist in your PostgreSQL test instance.
    const mockUsername = "test_user_6708";
    const mockPostId = 335;
    const testCommentPayload = "Very beautiful work, good job!";

    test.beforeEach(async ({page, context})=>{
        await context.setExtraHTTPHeaders({
            'x-test-bypass': 'secret-test-key'
        });

        page.on("console", msg =>{
            if(msg.type() === "error") console.log(`Browser Error: ${msg.text()}`);
        });

        page.on("requestfailed", request =>{
            console.log(`Network Failure. ${request.url()} || Error: ${request.failure()?.errorText}`)
        });
    });

    test("should create a comment", async ({page}) =>{
        // 1. Setup the Network API response spy BEFORE triggering the UI interaction
        const commentResponsePromise = page.waitForResponse(response =>
        response.url()
            .includes(`/api/v1/profile/${mockUsername}/posts/${mockPostId}/comment`)
            && response.request().method() === "POST"
        );
        // 2. Navigate to your target profile page matching your routing structure
        await page.goto(`/profile/${mockUsername}`);

        // 3. Locate the comment box text area using accessible aria role selectors
        const commentInput = page.locator('textarea[id="comment"]');

        // 4. Ensure it's fully visible and focusable, then fill it with data strings
        await expect(commentInput).toBeVisible();
        await commentInput.fill(testCommentPayload);

        // 5. Click the submit send button to trigger the network mutation dispatch
        const sendButton = page.locator('button:has(svg)'); // Targets your GrSend container layout
        await sendButton.click();

        // 6. Await the server network resolution hook from step 1
        const response = commentResponsePromise;

        // 7. Assert that your backend application responded with a successful status
        expect(response.status()).toBe(201);

        // 8. Unpack JSON body output to verify transactional integrity
        const jsonBody = await response.json();
        expect(jsonBody.status).toBe("success");

        // 9. Assert frontend UI changes (Check that input cleared and success notice appeared)
        await expect(commentInput).toHaveValue("");

        const successMessage = page.locator('span:has-text("Comment posted!")');
        await expect(successMessage).toBeVisible();
    })
})